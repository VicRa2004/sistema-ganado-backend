import { ErrorNotFound } from "@/core/shared/domain/errors/ErrorNotFound";

export class ErrorIronNotFound extends ErrorNotFound {
  constructor() {
    super("Iron not found");
  }
}
