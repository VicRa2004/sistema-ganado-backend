import { AggregateRoot } from "@/core/shared/domain/AggregateRoot";
import { DateValue } from "@/core/shared/domain/value-objects/DateValue";
import { Id } from "@/core/shared/domain/value-objects/Id";
import { StringValue } from "@/core/shared/domain/value-objects/StringValue";
import { RegistrationNumber } from "./value-object/RegistrationNumber";
import { LotNumber } from "./value-object/LotNumber";
import { Status } from "./value-object/Status";
import { Gender } from "./Gender";

interface CattleProps {
  id?: number;
  description: string;
  gender: Gender;
  registrationNumber: string;
  lotNumber: string;
  color: string;
  birthdate: Date;
  observations: string;
  image?: string;
  reasonForWithdrawal?: string;
  status: boolean;
  idFather?: number;
  idMother?: number;
  idIron?: number;
  idRace: number;
  idUser: number;
  idGround?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Cattle extends AggregateRoot {
  private constructor(
    id: Id,
    private descripcion: StringValue,
    private gender: Gender,
    private registrationNumber: RegistrationNumber,
    private lotNumber: LotNumber,
    private color: StringValue,
    private birthdate: DateValue,
    private observations: StringValue,
    private image: StringValue,
    private reasonForWithdrawal: StringValue,
    private status: Status,
    private idFather: Id,
    private idMother: Id,
    private idIron: Id,
    private idRace: Id,
    private idUser: Id,
    private idGround: Id,
    createdAt: DateValue,
    updatedAt: DateValue
  ) {
    super(id, createdAt, updatedAt);
  }

  static create(props: CattleProps) {
    return new Cattle(
      Id.create(props.id),
      StringValue.create(props.description),
      props.gender,
      RegistrationNumber.create(props.registrationNumber),
      LotNumber.create(props.lotNumber),
      StringValue.create(props.color),
      DateValue.create(props.birthdate),
      StringValue.create(props.observations),
      StringValue.create(props.image),
      StringValue.create(props.reasonForWithdrawal),
      Status.create(props.status ? 1 : 0),
      Id.create(props.idFather),
      Id.create(props.idMother),
      Id.create(props.idIron),
      Id.create(props.idRace),
      Id.create(props.idUser),
      Id.create(props.idGround),
      DateValue.create(props.createdAt),
      DateValue.create(props.updatedAt)
    );
  }

  getDescripcion() {
    return this.descripcion.getValue();
  }

  getGender() {
    return this.gender;
  }

  getRegistrationNumber() {
    return this.registrationNumber.getValue();
  }

  getLotNumber() {
    return this.lotNumber.getValue();
  }

  getColor() {
    return this.color.getValue();
  }

  getBirthdate() {
    return this.birthdate.getValue();
  }

  getObservations() {
    return this.observations.getValue();
  }

  getImage() {
    return this.image.getRawValue();
  }

  getReasonForWithdrawal() {
    return this.reasonForWithdrawal.getRawValue();
  }

  getStatus() {
    return this.status.getValue() === 1;
  }

  getIdFather() {
    return this.idFather.getRawValue();
  }

  getIdMother() {
    return this.idMother.getRawValue();
  }

  getIdIron() {
    return this.idIron.getRawValue();
  }

  getIdRace() {
    return this.idRace.getValue();
  }

  getIdUser() {
    return this.idUser.getValue();
  }

  getIdGround() {
    return this.idGround.getRawValue();
  }

  setDescripcion(descripcion: string) {
    this.descripcion = StringValue.create(descripcion);
  }

  setGender(gender: Gender) {
    this.gender = gender;
  }

  setRegistrationNumber(registrationNumber: string) {
    this.registrationNumber = RegistrationNumber.create(registrationNumber);
  }

  setLotNumber(lotNumber: string) {
    this.lotNumber = LotNumber.create(lotNumber);
  }

  setColor(color: string) {
    this.color = StringValue.create(color);
  }

  setBirthdate(birthdate: Date) {
    this.birthdate = DateValue.create(birthdate);
  }

  setObservations(observations: string) {
    this.observations = StringValue.create(observations);
  }

  setImage(image: string) {
    this.image = StringValue.create(image);
  }

  setReasonForWithdrawal(value: string) {
    this.reasonForWithdrawal = StringValue.create(value);
  }

  setStatus(status: boolean) {
    const value = status ? 1 : 0;
    this.status = Status.create(value);
  }

  setIdFather(idFather: number) {
    this.idFather = Id.create(idFather);
  }

  setIdMother(idMother: number) {
    this.idMother = Id.create(idMother);
  }

  setIdIron(idIron: number) {
    this.idIron = Id.create(idIron);
  }

  setIdRace(idRace: number) {
    this.idRace = Id.create(idRace);
  }

  setIdGround(idGround: number) {
    this.idGround = Id.create(idGround);
  }
}
