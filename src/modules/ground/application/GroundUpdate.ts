import { ErrorGroundNotFound } from "../domain/errors/ErrorGroundNotFound";
import { GroundRepository } from "../domain/GroundRepository";
import { GroundUpdateDTO } from "./dtos/GroundUpdateDTO";
import { GroundMapper } from "./mappers/ground-mapper";

export class GroundUpdate {
  constructor(private repository: GroundRepository) {}

  async run(data: GroundUpdateDTO) {
    const ground = await this.repository.findById(data.id, data.idUser);

    if (!ground) {
      throw new ErrorGroundNotFound();
    }

    if (data.name) {
      ground.setName(data.name);
    }

    if (data.image) {
      ground.setImage(data.image);
    }

    if (data.width) {
      ground.setWidth(data.width);
    }

    if (data.length) {
      ground.setLength(data.length);
    }

    if (data.address) {
      ground.setAddress(data.address);
    }

    if (data.notes) {
      ground.setNotes(data.notes);
    }

    const groundUpdated = await this.repository.update(ground);

    return GroundMapper.toDTO(groundUpdated);
  }
}
