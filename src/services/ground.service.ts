import { ErrorController } from "../utils/errors";
import { Ground } from "../models/Ground";

interface OwnerGetAllData {
   page: number;
   idUser: number;
}

export const groundGetAll = async ({ idUser, page }: OwnerGetAllData) => {
   const limitPages = 10;

   const grounds = await Ground.findAll({
      limit: limitPages,
      offset: limitPages * (page - 1),
      where: {
         id_user: idUser,
      },
   });

   const countGrounds = await Ground.count({
      where: { id_user: idUser },
   });

   const maxPages = Math.ceil(countGrounds / limitPages);

   return { grounds, maxPages };
};

interface groundGetOneIdData {
   idGround: number;
   idUser: number;
}
export const groundGetOneId = async ({
   idGround,
   idUser,
}: groundGetOneIdData) => {
   const ground = await Ground.findOne({
      where: { id_ground: idGround, id_user: idUser },
   });

   if (!ground) {
      throw new ErrorController({
         message: "Ground not found",
         statusCode: 404,
      });
   }

   return ground;
};

interface groundCreateData {
   idUser: number;
   name: string;
   image: string;
}

export const groundCreate = async ({
   idUser,
   name,
   image,
}: groundCreateData) => {
   const newGround = await Ground.create({ name, image, id_user: idUser });

   return newGround;
};

interface groundUpdateData extends groundCreateData {
   idGround: number;
}
export const groundUpdate = async ({
   idGround,
   name,
   image,
   idUser,
}: groundUpdateData) => {
   await Ground.update(
      {
         id_user: idUser,
         name,
         image,
      },
      {
         where: {
            id_ground: idGround,
         },
      }
   );

   return {
      id_ground: idGround,
      name,
      image,
      id_user: idUser,
   };
};

export const groundDelete = async ({
   idGround,
   idUser,
}: {
   idGround: number;
   idUser: number;
}) => {
   const ground = await groundGetOneId({ idGround, idUser });

   await ground.destroy();
};
