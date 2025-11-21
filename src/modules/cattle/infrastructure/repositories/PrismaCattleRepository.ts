import { Pagination } from "@/core/shared/domain/Pagination";
import { Cattle } from "../../domain/Cattle";
import { CattleFilters, CattleRepository } from "../../domain/CattleRepository";
import { prisma } from "@/core/config/prisma";
import { Gender } from "../../domain/Gender";

export class PrismaCattleRepository implements CattleRepository {
  async find(filters: CattleFilters): Promise<Pagination<Cattle>> {
    const { limit, page, idUser, gender, idRace, status } = filters;

    const totalItems = await prisma.cattle.count({
      where: { id_user: idUser, gender, id_race: idRace, status },
    });

    const items = await prisma.cattle.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: { id_user: idUser, gender, id_race: idRace, status },
    });

    const totalPages = Math.ceil(totalItems / limit);

    return {
      currentPage: page,
      totalItems,
      limit,
      totalPages,
      items: items.map((item) =>
        Cattle.create({
          id: item.id,
          description: item.description,
          observations: item.observations,
          gender: item.gender as Gender,
          birthdate: item.birthdate,
          color: item.color,
          lotNumber: item.lotNumber,
          registrationNumber: item.registrationNumber,
          reasonForWithdrawal: item.reason_for_withdrawal ?? undefined,
          status: item.status === 1,
          image: item.image,
          idFather: item.father ?? undefined,
          idMother: item.mother ?? undefined,
          idRace: item.id_race,
          idUser: item.id_user,
          idGround: item.id_ground ?? undefined,
          idIron: item.id_iron ?? undefined,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        })
      ),
    };
  }
}
