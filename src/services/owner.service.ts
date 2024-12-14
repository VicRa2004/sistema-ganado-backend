import { Owner } from "../models/Owner";
import { ErrorController } from "../utils/errors";

interface OwnerGetAllData {
   page: number;
   idUser: number;
}

export const ownerGetAll = async ({ page, idUser }: OwnerGetAllData) => {
   const limitPages = 10;

   const owners = await Owner.findAll({
      limit: limitPages,
      offset: limitPages * (page - 1),
      where: {
         id_user: idUser,
      },
   });

   const countOwner = await Owner.count({
      where: { id_user: idUser },
   });

   const maxPages = Math.ceil(countOwner / limitPages);

   return { owners, maxPages };
};

interface ownerGetOneIdData {
   idUser: number;
   idOwner: number;
}

export const ownerGetOneId = async ({ idOwner, idUser }: ownerGetOneIdData) => {
   const owner = await Owner.findOne({
      where: {
         id_user: idUser,
         id_owner: idOwner,
      },
   });

   // Le decimos que no existe el propietario que intenta acceder
   if (!owner) {
      throw new ErrorController({
         message: "Owner not found",
         statusCode: 404,
      });
   }

   return owner;
};

export const ownerCreate = async ({
   name,
   idUser,
}: {
   name: string;
   idUser: number;
}) => {
   const newOwner = await Owner.create({
      id_user: idUser,
      name,
   });

   return newOwner;
};

export const ownerUpdate = async ({
   name,
   idUser,
   idOwner,
}: {
   name: string;
   idUser: number;
   idOwner: number;
}) => {
   // Regresa la cantidad de filas afectadas, no nos sirve
   await Owner.update(
      { name },
      { where: { id_user: idUser, id_owner: idOwner } }
   );

   return {
      id_user: idUser,
      id_owner: idOwner,
      name,
   };
};

export const ownerDelete = async ({
   idUser,
   idOwner,
}: {
   idUser: number;
   idOwner: number;
}) => {
   const owner = await ownerGetOneId({ idOwner, idUser });

   await owner.destroy();
};
