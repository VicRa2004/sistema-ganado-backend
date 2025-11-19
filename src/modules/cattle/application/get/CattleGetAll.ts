import { CattleFilters, CattleRepository } from "../../domain/CattleRepository";
import { CattleMapper } from "../mappers/CattleMapper";

export class CattleGetAll {
  constructor(private repository: CattleRepository) {}

  async run(filters: CattleFilters) {
    const data = await this.repository.find(filters);

    return {
      ...data,
      items: data.items.map((item) => CattleMapper.toDTO(item)),
    };
  }
}
