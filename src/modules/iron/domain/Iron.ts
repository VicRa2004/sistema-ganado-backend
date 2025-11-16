import { AggregateRoot } from "@/modules/shared/domain/AggregateRoot";
import { DateValue } from "@/modules/shared/domain/value-objects/DateValue";
import { Id } from "@/modules/shared/domain/value-objects/Id";
import { StringValue } from "@/modules/shared/domain/value-objects/StringValue";

interface IronProps {
  id?: number;
  name: string;
  image: string;
  idUser: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Iron extends AggregateRoot {
  private constructor(
    id: Id,
    private name: StringValue,
    private image: StringValue,
    private idUser: Id,
    createdAt: DateValue,
    updatedAt: DateValue
  ) {
    super(id, createdAt, updatedAt);
  }

  static create(props: IronProps) {
    return new Iron(
      Id.create(props.id),
      StringValue.create(props.name),
      StringValue.create(props.image),
      Id.create(props.idUser),
      DateValue.create(props.createdAt),
      DateValue.create(props.updatedAt)
    );
  }

  getName() {
    return this.name.getValue();
  }

  getImage() {
    return this.image.getRawValue();
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
