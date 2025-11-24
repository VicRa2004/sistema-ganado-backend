import { prisma } from "@/core/config/prisma";
import { Race } from "../../domain/Race";
import { RaceRepository } from "../../domain/RaceRepository";

export class PrismaRaceRepository implements RaceRepository {
  async find(): Promise<Race[]> {
    const items = await prisma.race.findMany();

    return items.map((item) =>
      Race.create({
        id: item.id,
        name: item.name,
        description: item.description,
        image: item.image ?? undefined,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      })
    );
  }

  async findById(id: number): Promise<Race | null> {
    const item = await prisma.race.findUnique({
      where: { id },
    });

    if (!item) return null;

    return Race.create({
      id: item.id,
      name: item.name,
      description: item.description,
      image: item.image ?? undefined,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    });
  }

  async create(race: Race): Promise<Race> {
    const item = await prisma.race.create({
      data: {
        name: race.getName(),
        description: race.getDescription(),
        image: race.getImage(),
      },
    });

    return Race.create({
      id: item.id,
      name: item.name,
      description: item.description,
      image: item.image ?? undefined,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    });
  }

  async update(race: Race): Promise<Race> {
    const item = await prisma.race.update({
      data: {
        name: race.getName(),
        description: race.getDescription(),
        image: race.getImage(),
      },
      where: {
        id: race.getId(),
      },
    });

    return Race.create({
      id: item.id,
      name: item.name,
      description: item.description,
      image: item.image ?? undefined,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    });
  }

  async delete(id: number) {
    await prisma.race.delete({
      where: { id },
    });
  }
}
