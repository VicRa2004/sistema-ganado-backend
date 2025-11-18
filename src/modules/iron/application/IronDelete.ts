import { IronRepository } from "../domain/IronRepository";

export class IronDelete {
  constructor(private repository: IronRepository) {}

  async run(id: number) {
    await this.repository.delete(id);
  }
}
