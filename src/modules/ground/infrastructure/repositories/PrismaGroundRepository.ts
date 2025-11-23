import { Pagination } from "@/core/shared/domain/Pagination";
import { Ground } from "../../domain/Ground";
import { GroundFilters, GroundRepository } from "../../domain/GroundRepository";
import { prisma } from "@/core/config/prisma";

export class PrismaGroundRepository implements GroundRepository {
  async find(filters: GroundFilters): Promise<Pagination<Ground>> {
    const { limit, page, idUser } = filters;

    const totalItems = await prisma.ground.count({
      where: {
        id_user: idUser,
      },
    });

    const items = await prisma.ground.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: {
        id_user: idUser,
      },
    });

    const totalPages = Math.ceil(totalItems / limit);

    return {
      currentPage: page,
      totalItems,
      limit,
      totalPages,
      items: items.map((item) => {
        return Ground.create({
          id: item.id,
          name: item.name,
          image: item.image ?? undefined,
          address: item.address,
          length: item.length,
          width: item.width,
          notes: item.notes,
          idUser: item.id_user,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        });
      }),
    };
  }

  async findById(id: number, idUser?: number): Promise<Ground | null> {
    const item = await prisma.ground.findFirst({
      where: {
        id,
        id_user: idUser,
      },
    });

    if (!item) {
      return null;
    }

    return Ground.create({
      id: item.id,
      name: item.name,
      image: item.image ?? undefined,
      address: item.address,
      length: item.length,
      width: item.width,
      notes: item.notes,
      idUser: item.id_user,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    });
  }

  async create(ground: Ground): Promise<Ground> {
    const groundCreated = await prisma.ground.create({
      data: {
        name: ground.getName(),
        address: ground.getAddress(),
        length: ground.getLength(),
        width: ground.getWidth(),
        notes: ground.getNotes(),
        id_user: ground.getIdUser(),
        image: ground.getImage(),
      },
    });

    return Ground.create({
      id: groundCreated.id,
      name: groundCreated.name,
      image: groundCreated.image ?? undefined,
      address: groundCreated.address,
      length: groundCreated.length,
      width: groundCreated.width,
      notes: groundCreated.notes,
      idUser: groundCreated.id_user,
      createdAt: groundCreated.createdAt,
      updatedAt: groundCreated.updatedAt,
    });
  }

  async update(ground: Ground): Promise<Ground> {
    const groundUpdated = await prisma.ground.update({
      data: {
        name: ground.getName(),
        image: ground.getImage(),
        address: ground.getAddress(),
        length: ground.getLength(),
        width: ground.getWidth(),
        notes: ground.getNotes(),
      },
      where: {
        id: ground.getId(),
      },
    });

    return Ground.create({
      id: groundUpdated.id,
      name: groundUpdated.name,
      image: groundUpdated.image ?? undefined,
      address: groundUpdated.address,
      length: groundUpdated.length,
      width: groundUpdated.width,
      notes: groundUpdated.notes,
      idUser: groundUpdated.id_user,
      createdAt: groundUpdated.createdAt,
      updatedAt: groundUpdated.updatedAt,
    });
  }

  async delete(id: number): Promise<void> {
    await prisma.ground.delete({ where: { id } });
  }
}
