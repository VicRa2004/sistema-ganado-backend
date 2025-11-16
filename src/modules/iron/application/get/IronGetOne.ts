import { ErrorIronNotFound } from "../../domain/errors/ErrorIronNotFound";
import { IronRepository } from "../../domain/IronRepository";
import { IronMapper } from "../mappers/IronMapper";

export class IronGetOne {
  constructor(private repository: IronRepository) {}

  async run(id: number, idUser: number) {
    const item = await this.repository.findById(id, idUser);

    if (!item) {
      throw new ErrorIronNotFound();
    }

    return IronMapper.toDTO(item);
  }
}
