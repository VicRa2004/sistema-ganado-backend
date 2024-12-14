import { Request, Response } from "express";
import { OwnerBodyType } from "../schemas/owner.schema";
import { handleError } from "../utils/handleErrors";
import { ErrorSesion } from "../utils/errors";
import {
   ownerGetAll,
   ownerGetOneId,
   ownerCreate,
   ownerUpdate,
   ownerDelete,
} from "../services/owner.service";
import { reqQueryGet, reqParamsId } from "../types";

export const getOwners = async (
   req: Request<unknown, unknown, unknown, reqQueryGet>,
   res: Response
) => {
   try {
      const id_user = req.user?.id;
      const page = (req.query.page && parseInt(req.query.page)) || 1;

      // Verificar que el ID del usuario exista
      if (!id_user) {
         throw new ErrorSesion();
      }

      const idUser = parseInt(id_user);

      const { maxPages, owners } = await ownerGetAll({ page, idUser });

      // Enviar la respuesta
      res.status(200).json({
         currentPage: page,
         maxPages,
         data: owners,
         statusCode: 200,
      });
   } catch (error) {
      handleError(error, req, res);
   }
};

export const getOneOwner = async (req: Request<reqParamsId>, res: Response) => {
   try {
      const id_owner = parseInt(req.params.id);
      const id_user = req.user?.id;

      if (!id_user) {
         throw new ErrorSesion();
      }

      const idUser = parseInt(id_user);

      const owner = await ownerGetOneId({ idUser, idOwner: id_owner });

      // Devolvemos el propietario si todo esta bien
      res.status(200).json({
         data: owner,
         statusCode: 200,
      });
   } catch (error) {
      handleError(error, req, res);
   }
};

export const createOwner = async (
   req: Request<unknown, unknown, OwnerBodyType>,
   res: Response
) => {
   try {
      const { name } = req.body;
      const id_user = req.user?.id;

      if (!id_user) {
         throw new ErrorSesion();
      }

      const idUser = parseInt(id_user);

      const newOwner = await ownerCreate({ idUser, name });

      res.status(201).json({
         data: newOwner,
         statusCode: 201,
      });
   } catch (error) {
      handleError(error, req, res);
   }
};

export const updateOwner = async (
   req: Request<reqParamsId, unknown, OwnerBodyType>,
   res: Response
) => {
   try {
      const id_owner = parseInt(req.params.id);
      const { name } = req.body;
      const id_user = req.user?.id;

      if (!id_user) {
         throw new ErrorSesion();
      }

      const idUser = parseInt(id_user);

      const newData = await ownerUpdate({ idOwner: id_owner, idUser, name });

      res.status(200).json({
         data: newData,
         statusCode: 200,
      });
   } catch (error) {
      handleError(error, req, res);
   }
};

export const deleteOwner = async (req: Request<reqParamsId>, res: Response) => {
   try {
      const id_user = req.user?.id;
      const idOwner = parseInt(req.params.id);

      if (!id_user) {
         throw new ErrorSesion();
      }

      const idUser = parseInt(id_user);

      await ownerDelete({ idUser, idOwner });

      res.status(200).json({
         data: {
            massage: "Owner deleted successfully",
         },
         statusCode: 200,
      });
   } catch (error) {
      handleError(error, req, res);
   }
};
