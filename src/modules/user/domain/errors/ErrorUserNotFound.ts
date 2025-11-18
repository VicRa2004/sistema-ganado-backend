import { ErrorNotFound } from "@/core/shared/domain/errors/ErrorNotFound";

export class ErrorUserNotFound extends ErrorNotFound {
  constructor() {
    super("User not found");
  }
}
