import { Race } from "../models/Race";
import { ErrorController } from "../utils/errors";

interface RaceGetAllData {
   page: number;
}

export const raceGetAll = async ({ page }: RaceGetAllData) => {
   const limitPages = 10;

   const races = await Race.findAll({
      limit: limitPages,
      offset: limitPages * (page - 1),
   });

   const countGrounds = await Race.count();

   const maxPages = Math.ceil(countGrounds / limitPages);

   return { races, maxPages };
};

interface RaceGetOneIdData {
   idRace: number;
}

export const raceGetOneId = async ({ idRace }: RaceGetOneIdData) => {
   const race = await Race.findOne({ where: { id_race: idRace } });

   if (!race) {
      throw new ErrorController({
         message: "Race not found",
         statusCode: 404,
      });
   }

   return race;
};

interface RaceCreateData {
   name: string;
   description: string;
   image: string;
}

export const raceCreate = async ({
   name,
   description,
   image,
}: RaceCreateData) => {
   const newRace = await Race.create({
      name,
      description,
      image,
   });

   return newRace;
};

interface RaceUpdateData extends RaceCreateData {
   idRace: number;
}

export const raceUpdate = async ({
   idRace,
   name,
   description,
   image,
}: RaceUpdateData) => {
   await Race.update(
      { id_race: idRace, name, description, image },
      { where: { id_race: idRace } }
   );

   return {
      id_race: idRace,
      name,
      description,
      image,
   };
};

interface RaceDeleteData {
   idRace: number;
}

export const raceDelete = async ({ idRace }: RaceDeleteData) => {
   const race = await raceGetOneId({ idRace });

   race.destroy();
};
