import { Pagination } from "@/core/shared/domain/Pagination";
import { User } from "./User";
import { UserRol } from "./UserRol";

export interface UserFilters {
  page: number;
  limit: number;
  email?: string;
  rol?: UserRol;
}

export interface UserRepository {
  find(filters: UserFilters): Promise<Pagination<User>>;
  findById(id: number): Promise<User | null>;

  create(user: User): Promise<User>;
  update(user: User): Promise<User>;

  delete(id: number): Promise<void>;
}
