import { ImageUploader } from "@/modules/images/domain/ImageUploader";
import { CattleRepository } from "../domain/CattleRepository";
import { ErrorCattleNotFound } from "../domain/errors/ErrorCattleNotFound";

export class CattleDelete {
  constructor(
    private repository: CattleRepository,
    private imgUploader: ImageUploader
  ) {}

  async run(id: number) {
    const cattle = await this.repository.findById(id);

    if (!cattle) {
      throw new ErrorCattleNotFound();
    }

    const image = cattle.getImage();

    if (image) {
      await this.imgUploader.deleteByUrl(image);
    }

    await this.repository.delete(id);
  }
}
