import { Cattle } from "../domain/Cattle";
import { CattleRepository } from "../domain/CattleRepository";
import { CattleCreateDTO } from "./dtos/CattleCreateDTO";
import { CattleMapper } from "./mappers/CattleMapper";

export class CattleCreate {
  constructor(private repository: CattleRepository) {}

  async run(data: CattleCreateDTO) {
    const item = Cattle.create(data);

    const cattleCreated = await this.repository.create(item);

    return CattleMapper.toDTO(cattleCreated);
  }
}
