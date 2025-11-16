export class LotNumber {
  private value: string;

  private constructor(value: string) {
    this.value = value;
  }

  static create(value: string) {
    return new LotNumber(value);
  }

  getValue() {
    return this.value;
  }
}
