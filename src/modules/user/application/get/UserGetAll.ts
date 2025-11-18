import { UserFilters, UserRepository } from "../../domain/UserRepository";
import { UserMapper } from "../mappers/UserMapper";

export class UserGetAll {
  constructor(private repository: UserRepository) {}

  async run(filters: UserFilters) {
    const data = await this.repository.find(filters);

    return {
      ...data,
      items: data.items.map((item) => UserMapper.toDTO(item)),
    };
  }
}
