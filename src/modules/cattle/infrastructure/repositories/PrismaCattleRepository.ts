import { Pagination } from "@/core/shared/domain/Pagination";
import { Cattle } from "../../domain/Cattle";
import { CattleFilters, CattleRepository } from "../../domain/CattleRepository";
import { prisma } from "@/core/config/prisma";
import { Gender } from "../../domain/Gender";

export class PrismaCattleRepository implements CattleRepository {
  async find(filters: CattleFilters): Promise<Pagination<Cattle>> {
    const { limit, page, idUser, gender, idRace, status, idGround } = filters;

    const totalItems = await prisma.cattle.count({
      where: {
        id_user: idUser,
        gender,
        id_race: idRace,
        status,
        id_ground: idGround,
      },
    });

    const items = await prisma.cattle.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: {
        id_user: idUser,
        gender,
        id_race: idRace,
        status,
        id_ground: idGround,
      },
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
          image: item.image ?? undefined,
          idFather: item.fatherInt ?? undefined,
          idMother: item.motherInt ?? undefined,
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

  async findById(id: number, idUser?: number): Promise<Cattle | null> {
    const item = await prisma.cattle.findUnique({
      where: {
        id,
        id_user: idUser,
      },
    });

    if (!item) return null;

    return Cattle.create({
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
      image: item.image ?? undefined,
      idFather: item.fatherInt ?? undefined,
      idMother: item.motherInt ?? undefined,
      idRace: item.id_race,
      idUser: item.id_user,
      idGround: item.id_ground ?? undefined,
      idIron: item.id_iron ?? undefined,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    });
  }

  async create(cattle: Cattle): Promise<Cattle> {
    const item = await prisma.cattle.create({
      data: {
        description: cattle.getDescripcion(),
        observations: cattle.getObservations(),
        birthdate: cattle.getBirthdate(),
        color: cattle.getColor(),
        gender: cattle.getGender(),
        image: cattle.getImage(),
        lotNumber: cattle.getLotNumber(),
        registrationNumber: cattle.getRegistrationNumber(),
        reason_for_withdrawal: cattle.getReasonForWithdrawal(),
        fatherInt: cattle.getIdFather(),
        motherInt: cattle.getIdMother(),
        id_ground: cattle.getIdGround(),
        id_race: cattle.getIdRace(),
        id_iron: cattle.getIdUser(),
        id_user: cattle.getIdUser(),
      },
    });

    return Cattle.create({
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
      image: item.image ?? undefined,
      idFather: item.fatherInt ?? undefined,
      idMother: item.motherInt ?? undefined,
      idRace: item.id_race,
      idUser: item.id_user,
      idGround: item.id_ground ?? undefined,
      idIron: item.id_iron ?? undefined,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    });
  }

  async update(cattle: Cattle): Promise<Cattle> {
    const item = await prisma.cattle.update({
      data: {
        description: cattle.getDescripcion(),
        observations: cattle.getObservations(),
        birthdate: cattle.getBirthdate(),
        color: cattle.getColor(),
        gender: cattle.getGender(),
        image: cattle.getImage(),
        lotNumber: cattle.getLotNumber(),
        registrationNumber: cattle.getRegistrationNumber(),
        reason_for_withdrawal: cattle.getReasonForWithdrawal(),
        fatherInt: cattle.getIdFather(),
        motherInt: cattle.getIdMother(),
        id_ground: cattle.getIdGround(),
        id_race: cattle.getIdRace(),
        id_iron: cattle.getIdUser(),
      },
      where: {
        id: cattle.getId(),
      },
    });

    return Cattle.create({
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
      image: item.image ?? undefined,
      idFather: item.fatherInt ?? undefined,
      idMother: item.motherInt ?? undefined,
      idRace: item.id_race,
      idUser: item.id_user,
      idGround: item.id_ground ?? undefined,
      idIron: item.id_iron ?? undefined,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    });
  }

  async delete(id: number): Promise<void> {
    await prisma.cattle.delete({
      where: { id },
    });
  }
}
