import { ErrorNotFound } from "@/modules/shared/domain/errors/ErrorNotFound";

export class ErrorIronNotFound extends ErrorNotFound {
  constructor() {
    super("Iron not found");
  }
}
