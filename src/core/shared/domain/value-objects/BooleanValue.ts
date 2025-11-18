export class BooleanValue {
  private constructor(private value: boolean) {}

  static create(value: boolean) {
    return new BooleanValue(value);
  }

  getValue() {
    return this.value;
  }
}
