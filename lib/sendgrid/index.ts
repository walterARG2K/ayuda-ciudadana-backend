import * as sgMail from "@sendgrid/mail";
import { templateNotification } from "./template-1";
import { templateSendCode } from "./template-2";

const API_KEY = process.env.SENDGRID_APIKEY as string;
sgMail.setApiKey(API_KEY);

interface emailSendProps {
  to: string;
  subject: string;
  template: 0 | 1;
  params: { code: number; email: string };
}

export async function sendgridMail({ to, subject, template, params }: emailSendProps) {
  const templates = [templateNotification, templateSendCode];

  try {
    const msg = {
      to,
      from: "daniwortiz003@gmail.com",
      subject,
      html: templates[template]({ ...params }),
    };
    return await sgMail.send(msg);
  } catch (error) {
    console.log(error);
  }
}
