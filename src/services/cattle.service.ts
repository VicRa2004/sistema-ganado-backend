import { Cattle } from "../models/Cattle";
import { ErrorController } from "../utils/errors";
import { CattleCreate, Cattle as CattleType } from "../types";

interface CattleGetAllData {
   page: number;
   idUser: number;
}

const cattleGetAll = async ({ page, idUser }: CattleGetAllData) => {
   const limitPages = 10;

   const cattles = await Cattle.findAll({
      limit: limitPages,
      offset: limitPages * (page - 1),
      where: { id_user: idUser },
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
   });

   if (!cattle) {
      throw new ErrorController({
         message: "Iron not found",
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

const cattleDelete = async (cattleData: CattleType) => {
   const cattle = await cattleGetOne({
      idCattle: cattleData.id_cattle,
      idUser: cattleData.id_user,
   });

   cattle.destroy();
};

export const cattleService = {
   cattleGetAll,
   cattleGetOne,
   cattleCreate,
   cattleUpdate,
   cattleDelete,
};
