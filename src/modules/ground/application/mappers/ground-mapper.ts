import { Ground } from "../../domain/Ground";
import { GroundDTO } from "../dtos/GroundDTO";

export class GroundMapper {
  static toDTO(ground: Ground): GroundDTO {
    return {
      id: ground.getId(),
      createdAt: ground.getCreatedAt(),
      updatedAt: ground.getUpdatedAt(),
    };
  }
}
