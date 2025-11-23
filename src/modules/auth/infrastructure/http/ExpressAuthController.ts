import { container } from "@/core/container";
import { NextFunction, Request, Response } from "express";
import { loginSchema } from "../schema/loginSchema";
import { responseController } from "@/core/shared/infrastructure/response.controller";
import { registerSchema } from "../schema/registerSchema";
import { UserRol } from "@/modules/user/domain/UserRol";
import { vars } from "@config/vars";

export class ExpressAuthController {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { body } = loginSchema.parse(req);

      const data = await container.auth.login.run(body);

      responseController({
        res,
        data: data ?? undefined,
      });
    } catch (error) {
      next(error);
    }
  }

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { body } = registerSchema.parse(req);

      const data = await container.auth.register.run({
        ...body,
        rol: UserRol.USER, // User por defecto
      });

      const token = container.user.generateToken.run(data.id, data.email);

      const confirmationLink = `${vars.frontendUrl}/verify-email/${token}`;

      const html = `
         <h1>Confirma tu email</h1>
         <p>Haz clic en el siguiente enlace para confirmar tu correo electrónico:</p>
         <a href="${confirmationLink}">Confirmar Email</a>
      `;

      await container.email.send.run({
        html,
        subject: "Confirma tu email",
        to: data.email,
      });

      responseController({
        res,
        data,
      });
    } catch (error) {
      next(error);
    }
  }
}
