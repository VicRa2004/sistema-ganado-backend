import { CattleRepository } from "../../domain/CattleRepository";
import { ErrorCattleNotFound } from "../../domain/errors/ErrorCattleNotFound";
import { CattleMapper } from "../mappers/CattleMapper";

export class CattleGetOne {
  constructor(private repository: CattleRepository) {}

  async run(id: number, idUser?: number) {
    const item = await this.repository.findById(id, idUser);

    if (!item) {
      throw new ErrorCattleNotFound();
    }

    return CattleMapper.toDTO(item);
  }
}
