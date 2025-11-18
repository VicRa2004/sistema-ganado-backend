import { ErrorNotFound } from "@/modules/shared/domain/errors/ErrorNotFound";

export class ErrorRaceNotFound extends ErrorNotFound {
  constructor() {
    super("Race not found");
  }
}
