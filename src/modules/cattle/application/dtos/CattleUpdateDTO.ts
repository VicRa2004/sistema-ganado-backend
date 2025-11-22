import { Gender } from "../../domain/Gender";

export interface CattleUpdateDTO {
  id: number;
  idUser?: number; // para que solo podamos actualizar si tiene un usuario
  description?: string;
  gender?: Gender;
  registrationNumber?: string;
  lotNumber?: string;
  color?: string;
  birthdate?: Date;
  observations?: string;
  image?: string;
  reasonForWithdrawal?: string;
  status?: boolean;
  idFather?: number;
  idMother?: number;
  idIron?: number;
  idRace: number;
  idGround?: number;
}
