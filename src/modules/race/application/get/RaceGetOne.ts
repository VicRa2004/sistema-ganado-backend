import { ErrorRaceNotFound } from "../../domain/errors/ErrorRaceNotFound";
import { RaceRepository } from "../../domain/RaceRepository";
import { RaceMapper } from "../mappers/RaceMapper";

export class RaceGetOne {
  constructor(private repository: RaceRepository) {}

  async run(id: number) {
    const item = await this.repository.findById(id);

    if (!item) {
      throw new ErrorRaceNotFound();
    }

    return RaceMapper.toDTO(item);
  }
}
