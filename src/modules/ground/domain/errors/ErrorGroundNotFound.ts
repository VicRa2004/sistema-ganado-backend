import { ErrorNotFound } from "@/core/shared/domain/errors/ErrorNotFound";

export class ErrorGroundNotFound extends ErrorNotFound {
  constructor() {
    super("Ground not found");
  }
}
