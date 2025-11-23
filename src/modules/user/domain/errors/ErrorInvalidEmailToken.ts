import { ErrorInvalidData } from "@/core/shared/domain/errors/ErrorInvalidData";

export class ErrorInvalidEmailToken extends ErrorInvalidData {
  constructor() {
    super("Invalid email token");
  }
}
