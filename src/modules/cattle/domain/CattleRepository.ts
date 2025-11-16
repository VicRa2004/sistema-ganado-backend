import { Pagination } from "@/modules/shared/domain/Pagination";
import { Gender } from "./Gender";
import { Cattle } from "./Cattle";

export interface CattleFilters {
  page: number;
  limit: number;
  gender?: Gender;
  status?: number;
  idRace?: number;
  idUser?: number;
}

export interface CattleRepository {
  find(filters: CattleFilters): Promise<Pagination<Cattle>>;
  findById(id: number): Promise<Cattle | null>;

  create(cattle: Cattle): Promise<Cattle>;
  update(cattle: Cattle): Promise<Cattle>;

  delete(id: number): Promise<void>;
}
