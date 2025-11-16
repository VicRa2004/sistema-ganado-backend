export class NumberValue {
  private readonly value: number | undefined;

  constructor(id?: number) {
    this.value = id;
    this.ensureIsValid();
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
