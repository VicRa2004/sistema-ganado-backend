import { RaceRepository } from "../../domain/RaceRepository";
import { RaceMapper } from "../mappers/RaceMapper";

export class RaceGetAll {
  constructor(private repository: RaceRepository) {}

  async run() {
    const data = await this.repository.find();

    return {
      items: data.map((item) => RaceMapper.toDTO(item)),
    };
  }
}
