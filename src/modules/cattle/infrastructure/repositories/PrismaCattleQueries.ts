import { Pagination } from "@/core/shared/domain/Pagination";
import { Gender } from "../../domain/Gender";
import {
  CattleQueries,
  CattleQuery,
  CattleQueryFilters,
} from "@/modules/cattle/application/queries/CattleQueries"; // Ajusta la ruta
import { prisma } from "@/core/config/prisma";
import { Prisma } from "@/generated/prisma/client";
import { ErrorCattleNotFound } from "../../domain/errors/ErrorCattleNotFound";

export class PrismaCattleQueries implements CattleQueries {
  async getAll(filters: CattleQueryFilters): Promise<Pagination<CattleQuery>> {
    const { page, limit, gender, status, idRace, idUser, idGround } = filters;

    // 1. Construir cláusula Where
    const where: Prisma.CattleWhereInput = {
      // Mapeo directo
      ...(idRace && { id_race: idRace }),
      ...(idUser && { id_user: idUser }),
      ...(idGround && { id_ground: idGround }),
      // Mapeo de Enum/String
      ...(gender && { gender: String(gender) }),
      // Mapeo de Boolean a Int (asumiendo 1 = true, 0 = false)
      ...(status !== undefined && { status: status ? 1 : 0 }),
      fatherInt: filters.idFather,
      motherInt: filters.idMother,
    };

    // 2. Ejecutar consultas en paralelo (conteo y búsqueda)
    const [total, cattles] = await Promise.all([
      prisma.cattle.count({ where }),
      prisma.cattle.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        include: {
          race: true,
          iron: true,
          ground: true,
          fatherInfo: true,
          motherInfo: true,
        },
      }),
    ]);

    // 3. Mapear resultados al dominio
    const data = cattles.map(this.mapToCattleQuery);

    // 4. Retornar paginación
    // Asumiendo que tu clase Pagination acepta (data, total, page, limit)
    // Si es una interfaz simple, ajusta el retorno.
    return {
      items: data,
      total,
      page,
      limit,
      lastPage: Math.ceil(total / limit),
    } as unknown as Pagination<CattleQuery>;
    // Nota: El cast 'as unknown' es por si tu clase Pagination tiene métodos específicos
  }

  async getOne(id: number, idUser?: number): Promise<CattleQuery> {
    const cattle = await prisma.cattle.findUnique({
      where: { id, id_user: idUser },
      include: {
        race: true,
        iron: true,
        ground: true,
        fatherInfo: true,
        motherInfo: true,
      },
    });

    if (!cattle) {
      throw new ErrorCattleNotFound();
    }

    return this.mapToCattleQuery(cattle);
  }

  /**
   * Helper privado para mapear de Prisma (BD) a la Interfaz (Dominio)
   */
  private mapToCattleQuery(
    // Utilizamos un tipo inferido de Prisma que incluye las relaciones
    item: Prisma.CattleGetPayload<{
      include: {
        race: true;
        iron: true;
        ground: true;
        fatherInfo: true;
        motherInfo: true;
      };
    }>,
  ): CattleQuery {
    return {
      id: item.id,
      description: item.description,
      gender: item.gender as Gender, // Casteo al Enum de dominio
      registrationNumber: item.registrationNumber,
      lotNumber: item.lotNumber,
      color: item.color,
      birthdate: item.birthdate,
      observations: item.observations,
      image: item.image || undefined,
      reasonForWithdrawal: item.reason_for_withdrawal || undefined,

      // Mapeo de Int (0/1) a Boolean
      status: item.status === 1,

      // Relaciones IDs
      idFather: item.fatherInt || undefined,
      idMother: item.fatherInt || undefined,
      idIron: item.id_iron || undefined,
      idRace: item.id_race,
      idUser: item.id_user,
      idGround: item.id_ground || undefined,

      // Objetos anidados
      race: {
        name: item.race.name,
      },
      iron: item.iron
        ? {
            name: item.iron.name,
            image: item.iron.image,
          }
        : undefined,
      ground: item.ground
        ? {
            name: item.ground.name,
            image: item.ground.image || undefined,
          }
        : undefined,

      father: item.fatherInfo
        ? {
            lotNumber: item.fatherInfo.lotNumber,
            registrationNumber: item.fatherInfo.registrationNumber,
            status: item.fatherInfo.status === 1,
            image: item.fatherInfo.image ?? undefined,
          }
        : undefined,
      mother: item.motherInfo
        ? {
            lotNumber: item.motherInfo.lotNumber,
            registrationNumber: item.motherInfo.registrationNumber,
            status: item.motherInfo.status === 1,
            image: item.motherInfo.image ?? undefined,
          }
        : undefined,

      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    };
  }
}
