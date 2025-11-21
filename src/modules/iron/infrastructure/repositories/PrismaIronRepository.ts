import { Pagination } from "@/core/shared/domain/Pagination";
import { Iron } from "../../domain/Iron";
import { IronFilters, IronRepository } from "../../domain/IronRepository";
import { prisma } from "@/core/config/prisma";

export class PrismaIronRepository implements IronRepository {
  async find(filters: IronFilters): Promise<Pagination<Iron>> {
    const { limit, page, idUser } = filters;

    const totalItems = await prisma.iron.count({
      where: { id_user: idUser },
    });

    const items = await prisma.iron.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: { id_user: idUser },
    });

    const totalPages = Math.ceil(totalItems / limit);

    return {
      currentPage: page,
      totalItems,
      limit,
      totalPages,
      items: items.map((item) => {
        return Iron.create({
          id: item.id,
          name: item.name,
          image: item.image,
          idUser: item.id_user,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        });
      }),
    };
  }

  async findById(id: number, idUser?: number): Promise<Iron | null> {
    const item = await prisma.iron.findUnique({
      where: {
        id,
        id_user: idUser,
      },
    });

    if (!item) return null;

    return Iron.create({
      id: item.id,
      name: item.name,
      image: item.image,
      idUser: item.id_user,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    });
  }

  async create(iron: Iron): Promise<Iron> {
    const item = await prisma.iron.create({
      data: {
        name: iron.getName(),
        image: iron.getImage(),
        id_user: iron.getIdUser(),
      },
    });

    return Iron.create({
      id: item.id,
      name: item.name,
      image: item.image,
      idUser: item.id_user,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    });
  }

  async update(iron: Iron): Promise<Iron> {
    const item = await prisma.iron.update({
      data: {
        name: iron.getName(),
        image: iron.getImage(),
      },
      where: {
        id: iron.getId(),
      },
    });

    return Iron.create({
      id: item.id,
      name: item.name,
      image: item.image,
      idUser: item.id_user,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    });
  }

  async delete(id: number): Promise<void> {
    await prisma.iron.delete({
      where: { id },
    });
  }
}
