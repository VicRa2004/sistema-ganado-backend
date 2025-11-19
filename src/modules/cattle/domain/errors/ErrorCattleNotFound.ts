import { ErrorNotFound } from "@/core/shared/domain/errors/ErrorNotFound";

export class ErrorCattleNotFound extends ErrorNotFound {
  constructor() {
    super("Error cattle not found");
  }
}
