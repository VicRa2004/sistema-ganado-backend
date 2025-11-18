import { ErrorInvalidData } from "@/core/shared/domain/errors/ErrorInvalidData";

export class ErrorInvalidUser extends ErrorInvalidData {
  constructor(message: string) {
    super(message);
  }
}
