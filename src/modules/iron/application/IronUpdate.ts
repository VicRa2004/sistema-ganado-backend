import { ErrorIronNotFound } from "../domain/errors/ErrorIronNotFound";
import { IronRepository } from "../domain/IronRepository";
import { IronUpdateDTO } from "./dto/IronUpdateDTO";
import { IronMapper } from "./mappers/IronMapper";

export class IronUpdate {
  constructor(private repository: IronRepository) {}

  async run(data: IronUpdateDTO) {
    const iron = await this.repository.findById(data.id, data.idUser);

    if (!iron) {
      throw new ErrorIronNotFound();
    }

    if (data.name) {
      iron.setName(data.name);
    }

    if (data.image) {
      iron.setImage(data.image);
    }

    const ironUpdated = await this.repository.update(iron);

    return IronMapper.toDTO(ironUpdated);
  }
}
