import { ErrorNotFound } from "@/modules/shared/domain/errors/ErrorNotFound";

export class ErrorGroundNotFound extends ErrorNotFound {
  constructor() {
    super("Ground not found");
  }
}
