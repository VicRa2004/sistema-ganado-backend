import { ErrorGroundNotFound } from "../domain/errors/ErrorGroundNotFound";
import { GroundRepository } from "../domain/GroundRepository";

export class GroundDelete {
  constructor(private repository: GroundRepository) {}

  async run(id: number, idUser: number) {
    const ground = await this.repository.findById(id, idUser);

    if (!ground) {
      throw new ErrorGroundNotFound();
    }

    await this.repository.delete(id);
  }
}
