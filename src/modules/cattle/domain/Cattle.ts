import { AggregateRoot } from "@/core/shared/domain/AggregateRoot";
import { DateValue } from "@/core/shared/domain/value-objects/DateValue";
import { Id } from "@/core/shared/domain/value-objects/Id";
import { StringValue } from "@/core/shared/domain/value-objects/StringValue";
import { RegistrationNumber } from "./value-object/RegistrationNumber";
import { LotNumber } from "./value-object/LotNumber";
import { Status } from "./value-object/Status";
import { Gender } from "./Gender";

export class Cattle extends AggregateRoot {
  private constructor(
    id: Id,
    private descripcion: StringValue,
    private idFather: Id,
    private idMother: Id,
    private gender: Gender,
    private registrationNumber: RegistrationNumber,
    private lotNumber: LotNumber,
    private color: StringValue,
    private birthdate: DateValue,
    private observations: StringValue,
    private image: StringValue,
    private reasonForWithdrawal: StringValue,
    private status: Status,
    private idIron: Id,
    private idRace: Id,
    private idUser: Id,
    private idGround: Id,
    createdAt: DateValue,
    updatedAt: DateValue
  ) {
    super(id, createdAt, updatedAt);
  }

  getDescripcion() {
    this.descripcion.getValue();
  }

  setDescripcion(descripcion: string) {
    this.descripcion = StringValue.create(descripcion);
  }
}
