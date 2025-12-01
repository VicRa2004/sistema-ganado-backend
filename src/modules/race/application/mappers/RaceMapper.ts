import { Race } from "../../domain/Race";
import { RaceDTO } from "../dtos/RaceDTO";

export class RaceMapper {
  static toDTO(race: Race): RaceDTO {
    return {
      id: race.getId(),
      name: race.getName(),
      description: race.getDescription(),
      image: race.getImage(),
      createdAt: race.getCreatedAt(),
      updatedAt: race.getUpdatedAt(),
    };
  }
}
