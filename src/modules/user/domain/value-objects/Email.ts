import { ErrorInvalidUser } from "../errors/ErrorInvalidUser";

export class Email {
  private constructor(private value: string) {}

  static create(value: string) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(value)) {
      throw new ErrorInvalidUser("Invalid email format");
    }
    return new Email(value.toLowerCase());
  }

  getValue() {
    return this.value;
  }
}
