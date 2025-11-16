export class NumberValue {
  private readonly value: number | undefined;

  private constructor(number?: number) {
    this.value = number;
    this.ensureIsValid();
  }

  static create(number?: number) {
    return new NumberValue(number);
  }

  private ensureIsValid() {
    if (!this.value) return;

    if (typeof this.value !== "number") {
      throw new Error("Number no exists");
    }
  }

  public getValue(): number {
    if (!this.value) {
      throw new Error("Number no exists");
    }
    return this.value;
  }

  public getRawValue() {
    return this.value;
  }
}
