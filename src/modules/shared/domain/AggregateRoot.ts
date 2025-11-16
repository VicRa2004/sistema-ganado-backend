import { DateValue } from "./value-objects/DateValue";
import { Id } from "./value-objects/Id";

export abstract class AggregateRoot {
  protected constructor(
    private id: Id,
    private createdAt: DateValue,
    private updatedAt: DateValue
  ) {}
}
