import { Iron } from "../domain/Iron";
import { IronRepository } from "../domain/IronRepository";
import { IronCreateDTO } from "./dto/IronCreateDTO";
import { IronMapper } from "./mappers/IronMapper";

export class IronCreate {
  constructor(private repository: IronRepository) {}

  async run(data: IronCreateDTO) {
    const item = Iron.create(data);

    const newIron = await this.repository.create(item);

    return IronMapper.toDTO(newIron);
  }
}
