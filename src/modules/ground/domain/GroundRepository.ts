import { Pagination } from "@/core/shared/domain/Pagination";
import { Ground } from "./Ground";

export interface GroundFilters {
  page: number;
  limit: number;
  idUser: number;
}

export interface GroundRepository {
  find(filters: GroundFilters): Promise<Pagination<Ground>>;
  findById(id: number, idUser: number): Promise<Ground | null>;

  create(ground: Ground): Promise<Ground>;
  update(ground: Ground): Promise<Ground>;

  delete(id: number): Promise<void>;
}
