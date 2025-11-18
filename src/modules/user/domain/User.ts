import { AggregateRoot } from "@/core/shared/domain/AggregateRoot";
import { BooleanValue } from "@/core/shared/domain/value-objects/BooleanValue";
import { DateValue } from "@/core/shared/domain/value-objects/DateValue";
import { Id } from "@/core/shared/domain/value-objects/Id";
import { StringValue } from "@/core/shared/domain/value-objects/StringValue";
import { UserRol } from "./UserRol";
import { Email } from "./value-objects/Email";

interface UserProps {
  id?: number;
  fullName: string;
  userName: string;
  password: string;
  email: string;
  rol: UserRol;
  emailConfirm: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export class User extends AggregateRoot {
  private constructor(
    id: Id,
    private fullName: StringValue,
    private userName: StringValue,
    private password: StringValue,
    private email: Email,
    private rol: UserRol,
    private emailConfirm: BooleanValue,
    createdAt: DateValue,
    updatedAt: DateValue
  ) {
    super(id, createdAt, updatedAt);
  }

  static create(props: UserProps) {
    return new User(
      Id.create(props.id),
      StringValue.create(props.fullName),
      StringValue.create(props.userName),
      StringValue.create(props.password),
      Email.create(props.email),
      props.rol,
      BooleanValue.create(props.emailConfirm),
      DateValue.create(props.createdAt),
      DateValue.create(props.updatedAt)
    );
  }

  getFullName() {
    return this.fullName.getValue();
  }

  getUserName() {
    return this.userName.getValue();
  }

  getPassword() {
    return this.password.getValue();
  }

  getEmail() {
    return this.email.getValue();
  }

  getRol() {
    return this.rol;
  }

  isEmailConfirm() {
    return this.emailConfirm.getValue();
  }

  setFullName(fullName: string) {
    this.fullName = StringValue.create(fullName);
  }

  setPassword(password: string) {
    this.password = StringValue.create(password);
  }

  setEmailConfirm(confirmEmail: boolean) {
    this.emailConfirm = BooleanValue.create(confirmEmail);
  }
}
