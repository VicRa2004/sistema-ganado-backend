import { ErrorRaceNotFound } from "../domain/errors/ErrorRaceNotFound";
import { RaceRepository } from "../domain/RaceRepository";
import { RaceUpdateDTO } from "./dtos/RaceUpdateDTO";
import { RaceMapper } from "./mappers/RaceMapper";

export class RaceUpdate {
  constructor(private repository: RaceRepository) {}

  async run(data: RaceUpdateDTO) {
    const race = await this.repository.findById(data.id);

    if (!race) {
      throw new ErrorRaceNotFound();
    }

    if (data.name) {
      race.setName(data.name);
    }

    if (data.description) {
      race.setDescription(data.description);
    }

    if (data.image) {
      race.setImage(data.image);
    }

    const raceUpdated = await this.repository.update(race);

    return RaceMapper.toDTO(raceUpdated);
  }
}
