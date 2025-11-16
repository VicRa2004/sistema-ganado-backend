import { ErrorInvalidID } from "../errors/ErrorInvalidID";

export class Id {
  private readonly value: number | undefined;

  constructor(id?: number) {
    this.value = id;
    this.ensureIsValid();
  }

  private ensureIsValid() {
    // Si viene vacío → permitido (se generará en la DB)
    if (!this.value) return;

    // Si viene un ID, validar que sea string no vacío
    if (typeof this.value !== "number") {
      throw new ErrorInvalidID();
    }
  }

  public exists(): boolean {
    return !!this.value;
  }

  public getValue(): number {
    if (!this.value) {
      throw new ErrorInvalidID();
    }
    return this.value;
  }

  public getRawValue() {
    return this.value;
  }
}
