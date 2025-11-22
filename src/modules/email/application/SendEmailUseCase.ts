import { EmailService } from "../domain/EmailService";
import { EmailOptions } from "../domain/EmailOptions";

export class SendEmailUseCase {
  constructor(private readonly emailService: EmailService) {}

  async execute(options: EmailOptions): Promise<void> {
    return this.emailService.sendEmail(options);
  }
}
