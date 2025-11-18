import { AggregateRoot } from "@/core/shared/domain/AggregateRoot";
import { DateValue } from "@/core/shared/domain/value-objects/DateValue";
import { Id } from "@/core/shared/domain/value-objects/Id";
import { NumberValue } from "@/core/shared/domain/value-objects/NumberValue";
import { StringValue } from "@/core/shared/domain/value-objects/StringValue";

interface GroundProps {
  id?: number;
  name: string;
  image?: string;
  width: number;
  length: number;
  address: string;
  notes: string;
  idUser: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Ground extends AggregateRoot {
  private constructor(
    id: Id,
    private name: StringValue,
    private image: StringValue,
    private width: NumberValue,
    private length: NumberValue,
    private address: StringValue,
    private notes: StringValue,
    private idUser: Id,
    createdAt: DateValue,
    updatedAt: DateValue
  ) {
    super(id, createdAt, updatedAt);
  }

  public static create(props: GroundProps) {
    return new Ground(
      Id.create(props.id),
      StringValue.create(props.name),
      StringValue.create(props.image),
      NumberValue.create(props.width),
      NumberValue.create(props.length),
      StringValue.create(props.address),
      StringValue.create(props.notes),
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

  getWidth() {
    return this.width.getValue();
  }

  getLength() {
    return this.length.getValue();
  }

  getAddress() {
    return this.address.getValue();
  }

  getNotes() {
    return this.notes.getValue();
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

  setWidth(width: number) {
    this.width = NumberValue.create(width);
  }

  setLength(length: number) {
    this.length = NumberValue.create(length);
  }

  setAddress(address: string) {
    this.address = StringValue.create(address);
  }

  setNotes(notes: string) {
    this.notes = StringValue.create(notes);
  }
}
