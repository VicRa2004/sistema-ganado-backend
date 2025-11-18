import { ErrorNotFound } from "@/core/shared/domain/errors/ErrorNotFound";

export class ErrorRaceNotFound extends ErrorNotFound {
  constructor() {
    super("Race not found");
  }
}
