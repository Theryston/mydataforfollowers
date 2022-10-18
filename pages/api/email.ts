import type { NextApiRequest, NextApiResponse } from "next";
import { validateEmail } from "../../util/validateEmail";
import prisma from "../../lib/database/prisma";
import { Prisma } from "@prisma/client";
import { genRanHex } from "../../util/genRanHex";
import { sendEmail } from "../../lib/services/sendEmail";
import fs from "fs";
import path from "path";

type Data = {
  email: string;
  profileLink: string;
  inviteId?: string;
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
  const basePath = path.join(__dirname, "..", "..", "..", "..");
  const entities = await fs.promises.readdir(basePath, {
    withFileTypes: true,
  });
  console.log(entities);

  return res.status(200).json(entities);

  // const { email, profileLink, inviteId } = req.body;

  // if (!email || !profileLink) {
  //   return res.status(400).json({ error: "Faltando o email ou profileLink" });
  // }

  // if (!validateEmail(email)) {
  //   return res.status(400).json({ error: "Insira um email válido" });
  // }

  // if (
  //   !profileLink.startsWith("https://www.instagram.com/") &&
  //   !profileLink.startsWith("https://instagram.com/")
  // ) {
  //   return res
  //     .status(400)
  //     .json({ error: "Parece que você não digitou seu link do seu Instagram" });
  // }

  // const emailExists = await prisma.email.findUnique({
  //   where: {
  //     email,
  //   },
  // });

  // if (emailExists && emailExists.isVerified) {
  //   return res.status(400).json({ error: "Email já cadastrado!" });
  // }

  // const data: Prisma.emailCreateInput = {
  //   profileLink,
  //   email,
  // };

  // if (inviteId) {
  //   const invite = await prisma.invite.findUnique({
  //     where: {
  //       id: inviteId,
  //     },
  //   });

  //   if (!invite) {
  //     return res.status(400).json({ error: "Invite não encontrado" });
  //   }

  //   data.invite = {
  //     connect: {
  //       id: inviteId,
  //     },
  //   };
  // }

  // const emailCreated = await prisma.email.create({
  //   data,
  // });

  // const code = genRanHex(6);

  // await prisma.codeVerification.create({
  //   data: {
  //     code,
  //     expiresAt: new Date(Date.now() + 1000 * 60),
  //     emailId: emailCreated.id,
  //   },
  // });

  // await sendEmail({
  //   templateName: "VerifyEmail",
  //   variables: {
  //     code,
  //   },
  //   email: emailCreated.email,
  //   subject: "Código de verificação de email",
  // });

  // res.status(200).json(emailCreated);
};
