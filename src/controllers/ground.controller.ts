import { Request, Response } from "express";
import { ErrorSesion } from "../utils/errors";
import { uploadImage } from "../services/upload.service";
import { handleError } from "../utils/handleErrors";
import {
   groundGetAll,
   groundCreate,
   groundGetOneId,
   groundUpdate,
   groundDelete,
} from "../services/ground.service";
import { GroundBodyType } from "../schemas/ground.schema";
import { reqQueryGet, reqParamId } from "../types";

export const getGrounds = async (
   req: Request<unknown, unknown, unknown, reqQueryGet>,
   res: Response
) => {
   try {
      const page = (req.query.page && parseInt(req.query.page)) || 1;

      const id_user = req.user?.id;

      if (!id_user) {
         throw new ErrorSesion();
      }

      const idUser = parseInt(id_user);

      const { grounds, maxPages } = await groundGetAll({ idUser, page });

      res.status(200).json({
         maxPages,
         data: grounds,
         status: 200,
      });
   } catch (error) {
      handleError(error, req, res);
   }
};

export const getOneGround = async (req: Request<reqParamId>, res: Response) => {
   try {
      const id = parseInt(req.params.id);

      const ground = await groundGetOneId({ idGround: id });

      res.status(200).json({
         data: ground,
         status: 200,
      });
   } catch (error) {
      handleError(error, req, res);
   }
};

export const createGround = async (
   req: Request<unknown, unknown, GroundBodyType>,
   res: Response
) => {
   try {
      const imageFile = req.file;
      const { name } = req.body;
      const id_user = req.user?.id;

      if (!id_user) {
         throw new ErrorSesion();
      }

      const idUser = parseInt(id_user);

      let imageUrl = "";
      if (imageFile) {
         imageUrl = await uploadImage(imageFile);
      }

      const newGround = await groundCreate({
         idUser,
         image: imageUrl,
         name,
      });

      res.status(201).json({
         data: newGround,
         status: 201,
      });
   } catch (error) {
      handleError(error, req, res);
   }
};

export const updateGround = async (
   req: Request<reqParamId, unknown, GroundBodyType>,
   res: Response
) => {
   try {
      const id = parseInt(req.params.id);
      const imageFile = req.file;
      const { name } = req.body;
      const id_user = req.user?.id;

      if (!id_user) {
         throw new ErrorSesion();
      }

      const idUser = parseInt(id_user);

      const { image } = await groundGetOneId({ idGround: id });

      let imageUrl = image;

      // Hace falta poder eliminar una imagen de claudflare

      if (imageFile) {
         imageUrl = await uploadImage(imageFile);
      }

      const newGround = await groundUpdate({
         idGround: id,
         idUser,
         name,
         image: imageUrl,
      });

      res.status(200).json({
         data: newGround,
         status: 200,
      });
   } catch (error) {
      handleError(error, req, res);
   }
};

export const deleteGround = async (req: Request<reqParamId>, res: Response) => {
   try {
      const id = parseInt(req.params.id);

      await groundDelete({ idGround: id });

      res.status(200).json({
         status: 200,
         message: "Ground delete",
      });
   } catch (error) {
      handleError(error, req, res);
   }
};
