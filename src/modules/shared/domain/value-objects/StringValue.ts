export class StringValue {
  private readonly value?: string;

  private constructor(value?: string) {
    this.value = value;
    this.ensureIsValid();
  }

  static create(value?: string) {
    return new StringValue(value);
  }

  private ensureIsValid() {
    if (this.value === undefined || this.value === null) return;

    if (typeof this.value !== "string") {
      throw new Error(`Invalid string value: ${this.value}`);
    }
  }

  public getValue() {
    if (!this.value) {
      throw new Error("Id no exits");
    }

    return this.value;
  }

  public exists(): boolean {
    return this.value !== undefined && this.value !== null;
  }

  public toString(): string | undefined {
    return this.value;
  }

  public equals(other: StringValue): boolean {
    return this.value === other.toString();
  }
}
