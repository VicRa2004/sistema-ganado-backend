import { ErrorGroundNotFound } from "../../domain/errors/ErrorGroundNotFound";
import { GroundRepository } from "../../domain/GroundRepository";
import { GroundMapper } from "../mappers/ground-mapper";

export class GroundGetOne {
  constructor(private repository: GroundRepository) {}

  async run(id: number, idUser?: number) {
    const item = await this.repository.findById(id, idUser);

    if (!item) {
      throw new ErrorGroundNotFound();
    }

    return GroundMapper.toDTO(item);
  }
}
