import { CattleRepository } from "../domain/CattleRepository";
import { ErrorCattleNotFound } from "../domain/errors/ErrorCattleNotFound";
import { CattleUpdateDTO } from "./dtos/CattleUpdateDTO";
import { CattleMapper } from "./mappers/CattleMapper";

export class CattleUpdate {
  constructor(private repository: CattleRepository) {}

  async run(data: CattleUpdateDTO) {
    const cattle = await this.repository.findById(data.id, data.idUser);

    if (!cattle) {
      throw new ErrorCattleNotFound();
    }

    if (data.description) {
      cattle.setDescripcion(data.description);
    }

    if (data.gender) {
      cattle.setGender(data.gender);
    }

    if (data.registrationNumber) {
      cattle.setRegistrationNumber(data.registrationNumber);
    }

    if (data.lotNumber) {
      cattle.setLotNumber(data.lotNumber);
    }

    if (data.color) {
      cattle.setColor(data.color);
    }

    if (data.birthdate) {
      cattle.setBirthdate(data.birthdate);
    }

    if (data.observations) {
      cattle.setObservations(data.observations);
    }

    if (data.image) {
      cattle.setImage(data.image);
    }

    if (data.reasonForWithdrawal) {
      cattle.setReasonForWithdrawal(data.reasonForWithdrawal);
    }

    if (data.status !== undefined) {
      cattle.setStatus(data.status);
    }

    if (data.idFather !== undefined) {
      cattle.setIdFather(data.idFather);
    }

    if (data.idMother !== undefined) {
      cattle.setIdMother(data.idMother);
    }

    if (data.idIron !== undefined) {
      cattle.setIdIron(data.idIron);
    }

    if (data.idRace) {
      cattle.setIdRace(data.idRace);
    }

    if (data.idGround !== undefined) {
      cattle.setIdGround(data.idGround);
    }

    const updatedCattle = await this.repository.update(cattle);

    return CattleMapper.toDTO(updatedCattle);
  }
}
