export class StringValue {
  private readonly value?: string;

  constructor(value?: string) {
    this.value = value;
    this.ensureIsValid();
  }

  private ensureIsValid() {
    if (this.value === undefined || this.value === null) return;

    if (typeof this.value !== "string") {
      throw new Error(`Invalid string value: ${this.value}`);
    }

    // Evitar strings vacíos opcionalmente
    // if (this.value.trim().length === 0) {
    //   throw new Error("String cannot be empty");
    // }
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
