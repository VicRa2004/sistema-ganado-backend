import { Gender } from "../../domain/Gender";

export interface CattleDTO {
  id: number;
  description: string;
  gender: Gender;
  registrationNumber: string;
  lotNumber: string;
  color: string;
  birthdate: Date;
  observations: string;
  image?: string;
  reasonForWithdrawal?: string;
  status: boolean;
  idFather?: number;
  idMother?: number;
  idIron?: number;
  idRace: number;
  idUser: number;
  idGround?: number;
  createdAt: Date;
  updatedAt: Date;
}
