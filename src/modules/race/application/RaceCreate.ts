import { Race } from "../domain/Race";
import { RaceRepository } from "../domain/RaceRepository";
import { RaceCreateDTO } from "./dtos/RaceCreateDTO";
import { RaceMapper } from "./mappers/RaceMapper";

export class RaceCreate {
  constructor(private repository: RaceRepository) {}

  async run(data: RaceCreateDTO) {
    const item = Race.create(data);

    const race = await this.repository.create(item);

    return RaceMapper.toDTO(race);
  }
}
