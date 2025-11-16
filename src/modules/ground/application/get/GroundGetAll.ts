import { GroundFilters, GroundRepository } from "../../domain/GroundRepository";
import { GroundMapper } from "../mappers/ground-mapper";

export class GroundGetAll {
  constructor(private repository: GroundRepository) {}

  async run(filters: GroundFilters) {
    const data = await this.repository.find(filters);

    return {
      ...data,
      items: data.items.map((item) => GroundMapper.toDTO(item)),
    };
  }
}
