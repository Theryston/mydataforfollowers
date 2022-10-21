import nodemailer from "nodemailer";
import { render as renderTemplate } from "jsx-mail";

// netlify keep dependence:
import "@jsx-mail/components";
import "react";
import "styled-components";

const transport = nodemailer.createTransport({
  host: "smtpout.secureserver.net",
  secure: true,
  secureConnection: false, // TLS requires secureConnection to be false
  tls: {
    ciphers: "SSLv3",
  },
  requireTLS: true,
  port: 465,
  debug: true,
  auth: {
    user: process.env.EMAIL_SENDER_USERNAME,
    pass: process.env.EMAIL_SENDER_PASSWORD,
  },
} as any);

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
    from: `"My Data For Followers" <${process.env.EMAIL_SENDER_USERNAME}>`,
    to: email,
    subject,
    html,
  });

  return messageId;
}
