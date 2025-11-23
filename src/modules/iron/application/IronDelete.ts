import { ImageUploader } from "@/modules/images/domain/ImageUploader";
import { IronRepository } from "../domain/IronRepository";
import { ErrorIronNotFound } from "../domain/errors/ErrorIronNotFound";

export class IronDelete {
  constructor(
    private repository: IronRepository,
    private imgUploader: ImageUploader
  ) {}

  async run(id: number) {
    const iron = await this.repository.findById(id);

    if (!iron) {
      throw new ErrorIronNotFound();
    }

    // eliminamos la imagen
    await this.imgUploader.deleteByUrl(iron.getImage());

    await this.repository.delete(id);
  }
}
