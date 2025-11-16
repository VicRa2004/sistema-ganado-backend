import { Ground } from "../domain/Ground";
import { GroundRepository } from "../domain/GroundRepository";
import { GroundCreateDTO } from "./dtos/GroundCreateDTO";
import { GroundMapper } from "./mappers/ground-mapper";

export class GroundCreate {
  constructor(private repository: GroundRepository) {}

  async run(data: GroundCreateDTO) {
    const item = Ground.create(data);

    const newGround = await this.repository.create(item);

    return GroundMapper.toDTO(newGround);
  }
}
