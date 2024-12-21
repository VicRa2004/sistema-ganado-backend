import { ironService } from "../services/iron.service";
import { handleError } from "../utils/handleErrors";
import { getPage, getParamID } from "../utils/convertNumber";
import { verifyUser } from "../utils/verifyUser";
import { uploadImage } from "../services/upload.service";
import { ErrorController } from "../utils/errors";
import type { Request, Response } from "express";
import type { reqQueryGet, reqParamId } from "../types";
import type { IronBodyType } from "@schemas/iron.schema";

const getAllIrons = async (
   req: Request<unknown, unknown, unknown, reqQueryGet>,
   res: Response
) => {
   try {
      const page = getPage(req.query.page);
      const idUser = verifyUser(req.user?.id);

      const { irons, maxPages } = await ironService.ironGetAll({
         page,
         idUser,
      });

      return void res.status(200).json({
         maxPages,
         data: irons,
         status: 200,
      });
   } catch (error) {
      handleError(error, req, res);
   }
};

const getOneIron = async (req: Request<reqParamId>, res: Response) => {
   try {
      const idIron = getParamID(req.params.id);
      const idUser = verifyUser(req.user?.id);

      const iron = await ironService.ironGetOne({ idIron, idUser });

      return void res.status(200).json({
         data: iron,
         status: 200,
      });
   } catch (error) {
      handleError(error, req, res);
   }
};

const createIron = async (
   req: Request<unknown, unknown, IronBodyType>,
   res: Response
) => {
   try {
      const imageFile = req.file;
      const idUser = verifyUser(req.user?.id);
      const name = req.body.name;

      // Quiza si sea mejor que la imagen del fierro sea obligatiora,
      // por la falta de otros campos

      if (!imageFile) {
         throw new ErrorController({
            message: "The image is required",
            statusCode: 400,
         });
      }

      const imageUrl = await uploadImage(imageFile);

      const newIron = await ironService.ironCreate({
         idUser,
         image: imageUrl,
         name,
      });

      return void res.status(201).json({
         data: newIron,
         status: 201,
      });
   } catch (error) {
      handleError(error, req, res);
   }
};

const updateIron = async (
   req: Request<reqParamId, unknown, IronBodyType>,
   res: Response
) => {
   try {
      const idIron = getParamID(req.params.id);
      const idUser = verifyUser(req.user?.id);
      const imageFile = req.file;
      const name = req.body.name;

      const { image } = await ironService.ironGetOne({ idIron, idUser });

      let imageUrl = image;
      if (imageFile) {
         imageUrl = await uploadImage(imageFile);
      }

      const newIron = await ironService.ironUpdate({
         idIron,
         idUser,
         image: imageUrl,
         name,
      });

      return void res.status(200).json({
         data: newIron,
         satus: 200,
      });
   } catch (error) {
      handleError(error, req, res);
   }
};

const deleteIron = async (req: Request<reqParamId>, res: Response) => {
   try {
      const idIron = getParamID(req.params.id);
      const idUser = verifyUser(req.user?.id);

      await ironService.ironDelete({ idIron, idUser });

      return void res.status(200).json({
         message: "Iron delete success",
         status: 200,
      });
   } catch (error) {
      handleError(error, req, res);
   }
};

export const ironController = {
   getAllIrons,
   getOneIron,
   createIron,
   updateIron,
   deleteIron,
};
