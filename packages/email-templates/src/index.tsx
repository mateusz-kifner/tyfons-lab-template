export const name = "email-templates";
import { render } from "@react-email/render";
import nodemailer from "nodemailer";
import { env } from "../env";
import { SignInEmail } from "./signin-email";

export const emailTransporter = nodemailer.createTransport({
  host: env.EMAIL_SERVER_HOST,
  port: Number.parseInt(env.EMAIL_SERVER_PORT ?? 465),
  secure: true,
  auth: {
    user: env.EMAIL_SERVER_USER,
    pass: env.EMAIL_SERVER_PASSWORD,
  },
});

export async function sendSignInEmail(email: string, validationCode: string) {
  const emailHtml = render(
    <SignInEmail validationCode={validationCode} email={encodeURI(email)} />,
  );
  await emailTransporter.sendMail({
    from: env.EMAIL_FROM,
    to: email,
    subject: "Sign in to Tyfons Lab",
    html: emailHtml,
  });
}

export { SignInEmail };
