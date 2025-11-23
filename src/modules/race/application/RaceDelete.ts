import { ImageUploader } from "@/modules/images/domain/ImageUploader";
import { RaceRepository } from "../domain/RaceRepository";
import { ErrorRaceNotFound } from "../domain/errors/ErrorRaceNotFound";

export class RaceDelete {
  constructor(
    private repository: RaceRepository,
    private imgUploader: ImageUploader
  ) {}

  async run(id: number) {
    const race = await this.repository.findById(id);

    if (!race) {
      throw new ErrorRaceNotFound();
    }

    const image = race.getImage();

    if (image) {
      await this.imgUploader.deleteByUrl(image);
    }

    await this.repository.delete(id);
  }
}
