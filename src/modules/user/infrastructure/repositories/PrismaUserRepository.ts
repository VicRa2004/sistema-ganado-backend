import { Pagination } from "@/core/shared/domain/Pagination";
import { User } from "../../domain/User";
import { UserFilters, UserRepository } from "../../domain/UserRepository";
import { prisma } from "@/core/config/prisma";
import { UserRol } from "../../domain/UserRol";

export class PrismaUserRepository implements UserRepository {
  async find(filters: UserFilters): Promise<Pagination<User>> {
    const { limit, page, email } = filters;

    const totalItems = await prisma.user.count({
      where: { email },
    });

    const items = await prisma.user.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: { email },
    });

    const totalPages = Math.ceil(totalItems / limit);

    return {
      currentPage: page,
      totalItems,
      limit,
      totalPages,
      items: items.map((item) => {
        return User.create({
          id: item.id,
          email: item.email,
          fullName: item.fullname,
          userName: item.username,
          password: item.password,
          emailConfirm: item.email_confirm,
          rol: item.rol as UserRol,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        });
      }),
    };
  }
}
