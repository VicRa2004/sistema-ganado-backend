import { RaceRepository } from "../domain/RaceRepository";

export class RaceDelete {
  constructor(private repository: RaceRepository) {}

  async run(id: number) {
    await this.repository.delete(id);
  }
}
