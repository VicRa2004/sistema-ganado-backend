import { ErrorInvalidData } from "@/core/shared/domain/errors/ErrorInvalidData";

export class ErrorImageRequired extends ErrorInvalidData {
  constructor() {
    super("Image is required");
  }
}
