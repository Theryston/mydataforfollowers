import nodemailer from "nodemailer";
import { render as renderTemplate } from "jsx-mail";

// vercel not ignore this files on serverless function:
import "../../mail/dist/index.js";
import "../../jsx-mail.json";

const transport = nodemailer.createTransport({
  service: process.env.EMAIL_SENDER_SERVICE,
  auth: {
    user: process.env.EMAIL_SENDER_USERNAME,
    pass: process.env.EMAIL_SENDER_PASSWORD,
  },
});

export async function sendEmail({
  templateName,
  email,
  subject,
  variables,
}: {
  templateName: string;
  email: string;
  subject: string;
  variables: any;
}) {
  const html = await renderTemplate(templateName, variables);

  const { messageId } = await transport.sendMail({
    from: process.env.EMAIL_SENDER_USERNAME,
    to: email,
    subject,
    html,
  });

  return messageId;
}
