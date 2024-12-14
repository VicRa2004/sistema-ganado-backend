import { Request, Response } from "express";
import { ErrorSesion } from "../utils/errors";
import { uploadImage } from "../services/upload.service";
import { handleError } from "../utils/handleErrors";
import { groundGetAll, groundCreate } from "../services/ground.service";
import { GroundBodyType } from "../schemas/ground.schema";
import { reqQueryGet } from "../types";

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
         statusCode: 200,
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
         statusCode: 201,
      });
   } catch (error) {
      handleError(error, req, res);
   }
};
