import nodemailer, { Transporter } from "nodemailer";
import { EmailService } from "../domain/EmailService";
import { EmailOptions } from "../domain/EmailOptions";
import { ErrorEmail } from "../domain/errors/ErrorEmail";
import { vars } from "@/core/config/env";

export class NodemailerEmailService implements EmailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: vars.emailUser,
        pass: vars.emailPass,
      },
    });
  }

  async sendEmail({ to, subject, html }: EmailOptions): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: `"GanaderoPro" <${vars.emailUser}>`,
        to,
        subject,
        html,
      });
    } catch {
      throw new ErrorEmail();
    }
  }
}
