import { Request, Response } from "express";
import { uploadImage } from "../services/upload.service";
import { handleError } from "../utils/handleErrors";
import { cattleService } from "@services/cattle.service";
import { CattleBodyType } from "@schemas/cattle.schema";
import { reqQueryGet, reqParamId } from "../types";
import { getPage, getParamID } from "@utils/convertNumber";
import { verifyUser } from "@utils/verifyUser";

const getCattles = async (
  req: Request<unknown, unknown, unknown, reqQueryGet>,
  res: Response
) => {
  try {
    const page = getPage(req.query.page);

    const idUser = verifyUser(req.user?.id);

    const { cattles, maxPages } = await cattleService.cattleGetAll({
      idUser,
      page,
    });

    res.status(200).json({
      maxPages,
      data: cattles,
      status: 200,
    });
  } catch (error) {
    handleError(error, req, res);
  }
};

const getOneCattle = async (req: Request<reqParamId>, res: Response) => {
  try {
    const idCattle = getParamID(req.params.id);
    const idUser = verifyUser(req.user?.id);

    const cattle = await cattleService.cattleGetOne({ idCattle, idUser });

    res.status(200).json({
      data: cattle,
      status: 200,
    });
  } catch (error) {
    handleError(error, req, res);
  }
};

const createCattle = async (
  req: Request<unknown, unknown, CattleBodyType>,
  res: Response
) => {
  try {
    const imageFile = req.file;
    const cattle = req.body;

    const idUser = verifyUser(req.user?.id);

    let imageUrl = "";
    if (imageFile) {
      imageUrl = await uploadImage(imageFile);
    }

    const newCattle = await cattleService.cattleCreate({
      ...cattle,
      image: imageUrl,
      id_user: idUser,
    });

    res.status(201).json({
      data: newCattle,
      status: 201,
    });
  } catch (error) {
    handleError(error, req, res);
  }
};

const updateCattle = async (
  req: Request<reqParamId, unknown, CattleBodyType>,
  res: Response
) => {
  try {
    const imageFile = req.file;
    const cattle = req.body;
    const idCattle = getParamID(req.params.id);

    const idUser = verifyUser(req.user?.id);

    const { image } = await cattleService.cattleGetOne({ idCattle, idUser });

    let imageUrl = image;
    if (imageFile) {
      imageUrl = await uploadImage(imageFile);
    }

    const status = cattle.status ? 1 : 0;

    const updatedCattle = await cattleService.cattleUpdate({
      ...cattle,
      image: imageUrl,
      status,
      id_cattle: idCattle,
    });

    res.status(200).json({
      data: updatedCattle,
      status: 200,
    });
  } catch (error) {
    handleError(error, req, res);
  }
};

const deleteCattle = async (req: Request<reqParamId>, res: Response) => {
  try {
    const idCattle = getParamID(req.params.id);
    const idUser = verifyUser(req.user?.id);

    await cattleService.cattleDelete({ id_cattle: idCattle, id_user: idUser });

    res.status(200).json({
      status: 200,
    });
  } catch (error) {
    handleError(error, req, res);
  }
}

export const cattleController = { getCattles, getOneCattle, createCattle, updateCattle, deleteCattle };
