import { IronFilters, IronRepository } from "../../domain/IronRepository";
import { IronMapper } from "../mappers/IronMapper";

export class IronGetAll {
  constructor(private repository: IronRepository) {}

  async run(filters: IronFilters) {
    const data = await this.repository.find(filters);

    return {
      ...data,
      items: data.items.map((item) => IronMapper.toDTO(item)),
    };
  }
}
