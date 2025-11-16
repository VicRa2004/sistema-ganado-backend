export class Status {
  private value: number;

  private constructor(value: number) {
    this.value = value;
  }

  static create(value: number) {
    return new Status(value);
  }

  getValue() {
    return this.value;
  }
}
