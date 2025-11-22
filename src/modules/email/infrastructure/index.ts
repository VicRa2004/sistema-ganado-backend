import { NodemailerEmailService } from "./NodemailerEmailService";
import { SendEmailUseCase } from "../application/SendEmailUseCase";

const emailService = new NodemailerEmailService();
export const sendEmailUseCase = new SendEmailUseCase(emailService);
