import { ErrorInvalidDate } from "../errors/ErrorInvalidDate";

export class DateValue {
  private readonly value?: Date;

  private constructor(date?: string | Date) {
    this.value = this.parse(date);
    this.ensureIsValid();
  }

  static create(data?: Date | string) {
    return new DateValue(data);
  }

  private parse(date?: string | Date): Date | undefined {
    if (!date) return undefined; // opcional

    if (date instanceof Date) return date;

    const parsed = new Date(date);
    return parsed;
  }

  private ensureIsValid() {
    if (!this.value) return; // permitido si es opcional

    if (isNaN(this.value.getTime())) {
      throw new ErrorInvalidDate();
    }
  }

  public getValue(): Date {
    if (!this.value) {
      throw new ErrorInvalidDate();
    }
    return this.value;
  }
}
