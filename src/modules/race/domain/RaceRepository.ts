import { Pagination } from "@/modules/shared/domain/Pagination";
import { Race } from "./Race";

export interface RaceFilters {
  page: number;
  limit: number;
}

export interface RaceRepository {
  find(filters: RaceFilters): Promise<Pagination<Race>>;
  findById(id: number): Promise<Race | null>;

  create(race: Race): Promise<Race>;
  update(race: Race): Promise<Race>;

  delete(id: number): Promise<void>;
}
