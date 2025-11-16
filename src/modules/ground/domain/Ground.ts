import { AggregateRoot } from "@/modules/shared/domain/AggregateRoot";
import { DateValue } from "@/modules/shared/domain/value-objects/DateValue";
import { Id } from "@/modules/shared/domain/value-objects/Id";
import { NumberValue } from "@/modules/shared/domain/value-objects/NumberValue";
import { StringValue } from "@/modules/shared/domain/value-objects/StringValue";

interface GroundProps {
  id?: number;
  name: string;
  image: string;
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

  //public static create(props: GroundProps) {
  //  return new Ground(
  //    new Id(props.id),
  //  );
  //}
}
