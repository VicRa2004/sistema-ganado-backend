import { EmailOptions } from "./EmailOptions";

export interface EmailService {
  sendEmail(options: EmailOptions): Promise<void>;
}
