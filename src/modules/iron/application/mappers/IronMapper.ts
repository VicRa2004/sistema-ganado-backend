import { Iron } from "../../domain/Iron";
import { IronDTO } from "../dto/IronDTO";

export class IronMapper {
  static toDTO(iron: Iron): IronDTO {
    return {
      id: iron.getId(),
      name: iron.getName(),
      image: iron.getImage(),
      idUser: iron.getIdUser(),
      createdAt: iron.getCreatedAt(),
      updatedAt: iron.getUpdatedAt(),
    };
  }
}
