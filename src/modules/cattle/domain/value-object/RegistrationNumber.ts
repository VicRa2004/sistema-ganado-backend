export class RegistrationNumber {
  private value: string;

  private constructor(value: string) {
    this.value = value;
  }

  static create(value: string) {
    return new RegistrationNumber(value);
  }

  getValue() {
    return this.value;
  }
}
