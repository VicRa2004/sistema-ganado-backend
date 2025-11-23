import { ImageUploader } from "@/modules/images/domain/ImageUploader";
import { ErrorGroundNotFound } from "../domain/errors/ErrorGroundNotFound";
import { GroundRepository } from "../domain/GroundRepository";

export class GroundDelete {
  constructor(
    private repository: GroundRepository,
    private imgUploader: ImageUploader
  ) {}

  async run(id: number, idUser: number) {
    const ground = await this.repository.findById(id, idUser);

    if (!ground) {
      throw new ErrorGroundNotFound();
    }

    const image = ground.getImage();

    // eliminamos la imagen
    if (image) {
      await this.imgUploader.deleteByUrl(image);
    }

    await this.repository.delete(id);
  }
}
