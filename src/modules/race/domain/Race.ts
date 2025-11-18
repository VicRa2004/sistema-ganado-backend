import { AggregateRoot } from "@/core/shared/domain/AggregateRoot";
import { DateValue } from "@/core/shared/domain/value-objects/DateValue";
import { Id } from "@/core/shared/domain/value-objects/Id";
import { StringValue } from "@/core/shared/domain/value-objects/StringValue";

interface RaceProps {
  id?: number;
  name: string;
  description: string;
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Race extends AggregateRoot {
  private constructor(
    id: Id,
    private name: StringValue,
    private description: StringValue,
    private image: StringValue,
    createdAt: DateValue,
    updatedAt: DateValue
  ) {
    super(id, createdAt, updatedAt);
  }

  static create(props: RaceProps) {
    return new Race(
      Id.create(props.id),
      StringValue.create(props.name),
      StringValue.create(props.description),
      StringValue.create(props.image),
      DateValue.create(props.createdAt),
      DateValue.create(props.updatedAt)
    );
  }

  getName() {
    return this.name.getValue();
  }

  getDescription() {
    return this.description.getValue();
  }

  getImage() {
    return this.image.getRawValue();
  }

  setName(name: string) {
    this.name = StringValue.create(name);
  }

  setDescription(description: string) {
    this.description = StringValue.create(description);
  }

  setImage(image: string) {
    this.image = StringValue.create(image);
  }
}
