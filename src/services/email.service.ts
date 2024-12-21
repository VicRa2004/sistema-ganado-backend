import nodemailer, { Transporter } from "nodemailer";
import { vars } from "@config/vars";
import { ErrorValidateEmail } from "@utils/errors";

const createTransporter = (): Transporter => {
   return nodemailer.createTransport({
      service: "gmail", // Cambia según el proveedor de correo
      auth: {
         user: vars.email_user, // Correo electrónico
         pass: vars.email_pass, // Contraseña o app password
      },
   });
};

const transporter = createTransporter();

interface EmailOptions {
   to: string; // Destinatario
   subject: string; // Asunto
   html: string; // Contenido del correo en formato HTML
}

// Función para enviar correo electrónico
const sendEmail = async ({ to, subject, html }: EmailOptions) => {
   try {
      await transporter.sendMail({
         from: `"YourApp" <${vars.email_user}>`,
         to,
         subject,
         html,
      });
   } catch {
      new ErrorValidateEmail({
         message: "Error al enviar email",
         statusCode: 400,
      });
   }
};

export const emailService = {
   sendEmail,
};
