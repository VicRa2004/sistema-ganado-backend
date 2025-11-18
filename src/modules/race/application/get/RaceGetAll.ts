import { RaceFilters, RaceRepository } from "../../domain/RaceRepository";
import { RaceMapper } from "../mappers/RaceMapper";

export class RaceGetAll {
  constructor(private repository: RaceRepository) {}

  async run(filters: RaceFilters) {
    const data = await this.repository.find(filters);

    return {
      ...data,
      items: data.items.map((item) => RaceMapper.toDTO(item)),
    };
  }
}
