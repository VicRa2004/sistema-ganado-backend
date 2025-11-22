import { CattleRepository } from "../domain/CattleRepository";

export class CattleDelete {
  constructor(private repository: CattleRepository) {}

  async run(id: number) {
    await this.repository.delete(id);
  }
}
