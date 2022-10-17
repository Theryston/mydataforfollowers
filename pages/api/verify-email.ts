import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/database/prisma";
import { requestFollows } from "../../lib/services/requestFollow";

type Data = {
  code: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    handlerPost(req, res);
  }
}

const handlerPost = async (req: NextApiRequest, res: NextApiResponse) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ error: "Faltando o código" });
  }

  const codeVerification = await prisma.codeVerification.findUnique({
    where: {
      code,
    },
  });

  if (!codeVerification) {
    return res.status(400).json({ error: "Código inválido" });
  }

  const email = await prisma.email.findUnique({
    where: {
      id: codeVerification.emailId,
    },
  });

  if (!email) {
    return res.status(400).json({ error: "Email não encontrado" });
  }

  await prisma.email.update({
    where: {
      id: email.id,
    },
    data: {
      isVerified: true,
    },
  });

  await prisma.codeVerification.delete({
    where: {
      id: codeVerification.id,
    },
  });

  try {
    await requestFollows({ profileLink: email.profileLink });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao solicitar seguidores" });
  }

  if (email.inviteId) {
    const invite = await prisma.invite.findUnique({
      where: {
        id: email.inviteId,
      },
    });

    if (!invite) {
      return res.status(400).json({ error: "Convite não encontrado" });
    }

    try {
      await requestFollows({ profileLink: invite.profileLink });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "Erro ao solicitar seguidores para quem convidou" });
    }
  }

  return res.status(200).json({
    message:
      "Email verificado com sucesso. Aguarde alguns minutos para receber os seguidores",
  });
};
