import { Ground } from "../../domain/Ground";
import { GroundDTO } from "../dtos/GroundDTO";

export class GroundMapper {
  static toDTO(ground: Ground): GroundDTO {
    return {
      id: ground.getId(),
      name: ground.getName(),
      image: ground.getImage(),
      width: ground.getWidth(),
      length: ground.getLength(),
      address: ground.getAddress(),
      notes: ground.getNotes(),
      idUser: ground.getIdUser(),
      createdAt: ground.getCreatedAt(),
      updatedAt: ground.getUpdatedAt(),
    };
  }
}
