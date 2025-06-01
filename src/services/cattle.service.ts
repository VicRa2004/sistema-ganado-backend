import { Cattle } from "../models/Cattle";
import { ErrorController } from "../utils/errors";
import { CattleCreate, Cattle as CattleType } from "../types";
import { Iron } from "@models/Iron";
import { Race } from "@models/Race";
import { Ground } from "@models/Ground";

interface CattleGetAllData {
  page: number;
  idUser: number;
  gender?: string;
  id_iron?: number;
  id_race?: number;
  status?: number;
}

const cattleGetAll = async ({
  page,
  idUser,
  gender,
  id_iron,
  id_race,
  status,
}: CattleGetAllData) => {
  const limitPages = 9;

  const filteredQuery = Object.fromEntries(
    Object.entries({
      id_user: idUser,
      gender,
      id_iron,
      id_race,
      status,
    }).filter(([_, value]) => value !== undefined)
  );

  const cattles = await Cattle.findAll({
    limit: limitPages,
    offset: limitPages * (page - 1),
    where: filteredQuery,
    include: [
      { model: Iron },
      { model: Race },
      { model: Ground },
    ],
  });

  const countCattles = await Cattle.count({
    where: { id_user: idUser },
  });

  const maxPages = Math.ceil(countCattles / limitPages);

  return { cattles, maxPages };
};

interface CattleGetOneData {
  idCattle: number;
  idUser: number;
}

const cattleGetOne = async ({ idCattle, idUser }: CattleGetOneData) => {
  const cattle = await Cattle.findOne({
    where: {
      id_cattle: idCattle,
      id_user: idUser,
    },
    include: [
      { model: Iron },
      { model: Race },
      { model: Ground },
    ],
  });

  if (!cattle) {
    throw new ErrorController({
      message: "Cattle not found",
      statusCode: 401,
    });
  }

  return cattle;
};

const cattleCreate = async (cattleData: CattleCreate) => {
  const cattle = await Cattle.create(cattleData);

  return cattle;
};

const cattleUpdate = async (cattleData: CattleType) => {
  await Cattle.update(cattleData, {
    where: {
      id_cattle: cattleData.id_cattle,
      id_user: cattleData.id_user,
    },
  });

  return cattleData;
};

const cattleDelete = async ({
  id_cattle,
  id_user,
}: {
  id_cattle: number;
  id_user: number;
}) => {
  const cattle = await cattleGetOne({
    idCattle: id_cattle,
    idUser: id_user,
  });

  cattle.destroy();
};

/**
 * Trae todo los ganados que tengan una misma madre
 */
const cattleGetAllByParent = async ({
  idCattle,
  idUser,
  page,
}: {
  idCattle: number;
  idUser: number;
  page: number;
}) => {
  const limitPages = 9;

  // recordar agregar paginación
  const cattles = await Cattle.findAll({
    limit: limitPages,
    offset: limitPages * (page - 1),
    where: {
      id_user: idUser,
      mother: idCattle, // Todos los ganados que tengan como madre
    },
  });

  const countCattles = await Cattle.count({
    where: { id_user: idUser },
  });

  const maxPages = Math.ceil(countCattles / limitPages);

  return { cattles, maxPages };
};

const cattleGetAllByGround = async ({
  idGround,
  idUser,
  page,
}: {
  idGround: number;
  idUser: number;
  page: number;
}) => {
  const limitPages = 9;

  // recordar agregar paginación
  const cattles = await Cattle.findAll({
    limit: limitPages,
    offset: limitPages * (page - 1),
    where: {
      id_user: idUser,
      id_ground: idGround, // Todos los ganados que tengan como madre
    },
  });

  const countCattles = await Cattle.count({
    where: { id_user: idUser },
  });

  const maxPages = Math.ceil(countCattles / limitPages);

  return { cattles, maxPages };
};

export const cattleService = {
  cattleGetAll,
  cattleGetOne,
  cattleCreate,
  cattleUpdate,
  cattleDelete,
  cattleGetAllByParent,
  cattleGetAllByGround,
};
