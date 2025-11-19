import { Cattle } from "../../domain/Cattle";
import { CattleDTO } from "../dtos/CattleDTO";

export class CattleMapper {
  static toDTO(cattle: Cattle): CattleDTO {
    return {
      id: cattle.getId(),
      description: cattle.getDescripcion(),
      gender: cattle.getGender(),
      registrationNumber: cattle.getRegistrationNumber(),
      lotNumber: cattle.getLotNumber(),
      color: cattle.getColor(),
      birthdate: cattle.getBirthdate(),
      observations: cattle.getObservations(),
      image: cattle.getImage(),
      reasonForWithdrawal: cattle.getReasonForWithdrawal(),
      status: cattle.getStatus(),
      idFather: cattle.getIdFather(),
      idMother: cattle.getIdMother(),
      idIron: cattle.getIdMother(),
      idRace: cattle.getIdRace(),
      idUser: cattle.getIdUser(),
      idGround: cattle.getIdGround(),
      createdAt: cattle.getCreatedAt(),
      updatedAt: cattle.getUpdatedAt(),
    };
  }
}
