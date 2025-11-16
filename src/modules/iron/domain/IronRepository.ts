import { Pagination } from "@/modules/shared/domain/Pagination";
import { Iron } from "./Iron";

export interface IronFilters {
  page: number;
  limit: number;
  idUser: number;
}

export interface IronRepository {
  find(filters: IronFilters): Promise<Pagination<Iron>>;
  findById(id: number, idUser: number): Promise<Iron | null>;

  create(iron: Iron): Promise<Iron>;
  update(iron: Iron): Promise<Iron>;

  delete(id: number): Promise<void>;
}
