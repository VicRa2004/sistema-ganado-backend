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

  async findById(id: number): Promise<User | null> {
    const item = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!item) return null;

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
  }

  async findByEmail(email: string): Promise<User | null> {
    const item = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!item) return null;

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
  }

  async create(user: User): Promise<User> {
    const item = await prisma.user.create({
      data: {
        email: user.getEmail(),
        fullname: user.getFullName(),
        password: user.getPassword(),
        rol: user.getRol(),
        username: user.getUserName(),
      },
    });

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
  }

  async update(user: User): Promise<User> {
    const item = await prisma.user.update({
      data: {
        username: user.getUserName(),
        email: user.getEmail(),
        password: user.getPassword(),
        fullname: user.getFullName(),
        email_confirm: user.isEmailConfirm(),
      },
      where: {
        id: user.getId(),
      },
    });

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
  }

  async delete(id: number): Promise<void> {
    await prisma.user.delete({
      where: { id },
    });
  }
}
