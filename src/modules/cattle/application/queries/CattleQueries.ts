import { Pagination } from "@/core/shared/domain/Pagination";
import { Gender } from "../../domain/Gender";

export interface CattleQuery {
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
  father?: {
    lotNumber: string;
    registrationNumber: string;
    image?: string;
    status: boolean;
  };
  idMother?: number;
  mother?: {
    lotNumber: string;
    registrationNumber: string;
    image?: string;
    status: boolean;
  };
  idIron?: number;
  iron?: {
    name: string;
    image?: string;
  };
  idRace: number;
  race: {
    name: string;
  };
  idUser: number;
  idGround?: number;
  ground?: {
    name: string;
    image?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface CattleQueryFilters {
  page: number;
  limit: number;
  gender?: Gender;
  status?: boolean; // si esta dado de baja o no
  idRace?: number;
  idUser?: number;
  idGround?: number;
}

export interface CattleQueries {
  getAll: (filters: CattleQueryFilters) => Promise<Pagination<CattleQuery>>;
  getOne: (id: number) => Promise<CattleQuery>;
}
