import { Request, Response } from "express";
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
import { getPage, getParamID } from "../utils/convertNumber";
import { verifyUser } from "../utils/verifyUser";

export const getGrounds = async (
   req: Request<unknown, unknown, unknown, reqQueryGet>,
   res: Response
) => {
   try {
      const page = getPage(req.query.page);

      const idUser = verifyUser(req.user?.id);

      const { grounds, maxPages } = await groundGetAll({
         idUser,
         page,
      });

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
      const id = getParamID(req.params.id);

      const idUser = verifyUser(req.user?.id);

      const ground = await groundGetOneId({ idGround: id, idUser });

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
      const { name, address, length, width, notes } = req.body;
      const id_user = verifyUser(req.user?.id);

      let imageUrl = "";
      if (imageFile) {
         imageUrl = await uploadImage(imageFile);
      }

      const newGround = await groundCreate({
         id_user,
         image: imageUrl,
         name,
         address,
         length,
         width,
         notes,
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
      const id = getParamID(req.params.id);
      const imageFile = req.file;
      const { name, address, length, width, notes } = req.body;
      const idUser = verifyUser(req.user?.id);

      const { image } = await groundGetOneId({ idGround: id, idUser });

      let imageUrl = image;

      // Hace falta poder eliminar una imagen de claudflare

      if (imageFile) {
         imageUrl = await uploadImage(imageFile);
      }

      const newGround = await groundUpdate({
         id_ground: id,
         id_user: idUser,
         name,
         address,
         length,
         width,
         image: imageUrl,
         notes,
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
      const id = getParamID(req.params.id);
      const idUser = verifyUser(req.user?.id);

      await groundDelete({ idGround: id, idUser });

      res.status(200).json({
         status: 200,
         message: "Ground delete",
      });
   } catch (error) {
      handleError(error, req, res);
   }
};
