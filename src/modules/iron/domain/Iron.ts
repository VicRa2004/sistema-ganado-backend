import { AggregateRoot } from "@/modules/shared/domain/AggregateRoot";
import { DateValue } from "@/modules/shared/domain/value-objects/DateValue";
import { Id } from "@/modules/shared/domain/value-objects/Id";
import { StringValue } from "@/modules/shared/domain/value-objects/StringValue";

export class Iron extends AggregateRoot {
  constructor(
    id: Id,
    private name: StringValue,
    private image: StringValue,
    private idUser: Id,
    createdAt: DateValue,
    updatedAt: DateValue
  ) {
    super(id, createdAt, updatedAt);
  }

  getName() {
    return this.name.getValue();
  }

  getImage() {
    return this.image.getValue();
  }

  getIdUser() {
    return this.idUser.getValue();
  }

  setName(name: string) {
    this.name = StringValue.create(name);
  }

  setImage(image: string) {
    this.image = StringValue.create(image);
  }
}
