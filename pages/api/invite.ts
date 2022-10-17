import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/database/prisma";

type Data = {
  profileLink: string;
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
  const { profileLink } = req.body;

  if (!profileLink) {
    return res.status(400).json({ error: "Faltando o profileLink" });
  }

  if (
    !profileLink.startsWith("https://www.instagram.com/") &&
    !profileLink.startsWith("https://instagram.com/")
  ) {
    return res
      .status(400)
      .json({ error: "Parece que você não digitou seu link do seu Instagram" });
  }

  const inviteExists = await prisma.invite.findUnique({
    where: {
      profileLink,
    },
  });

  if (inviteExists) {
    return res.status(200).json(inviteExists);
  }

  const inviteCreated = await prisma.invite.create({
    data: {
      profileLink,
    },
  });

  return res.status(201).json(inviteCreated);
};
