import { Request, Response } from "express";
import {
  raceGetAll,
  raceGetOneId,
  raceCreate,
  raceUpdate,
  raceDelete,
} from "../services/race.service";
import { uploadImage } from "../services/upload.service";
import { handleError } from "../utils/handleErrors";
import { reqQueryGet, reqParamId } from "../types";
import { getPage, getParamID } from "../utils/convertNumber";
import { RaceBodyType } from "../schemas/race.schema";

export const getAllRace = async (
  req: Request<unknown, unknown, unknown, reqQueryGet>,
  res: Response
) => {
  try {
    const page = getPage(req.query.page);

    const { races, maxPages } = await raceGetAll({ page });

    res.status(200).json({
      data: races,
      maxPages,
      status: 200,
    });
  } catch (error) {
    handleError(error, req, res);
  }
};

export const getOneRace = async (req: Request<reqParamId>, res: Response) => {
  try {
    const idRace = getParamID(req.params.id);

    const race = await raceGetOneId({ idRace });

    res.status(200).json({
      data: race,
      status: 200,
    });
  } catch (error) {
    handleError(error, req, res);
  }
};

export const createRace = async (
  req: Request<unknown, unknown, RaceBodyType>,
  res: Response
) => {
  try {
    const imageFile = req.file;
    const { name, description } = req.body;

    let imageUrl = "";
    if (imageFile) {
      imageUrl = await uploadImage(imageFile);
    }

    const newRace = await raceCreate({ name, description, image: imageUrl });

    res.status(200).json({
      data: newRace,
      status: 200,
    });
  } catch (error) {
    handleError(error, req, res);
  }
};

export const updateRace = async (
  req: Request<reqParamId, unknown, RaceBodyType>,
  res: Response
) => {
  try {
    const imageFile = req.file;
    const { name, description } = req.body;
    const idRace = getParamID(req.params.id);

    const { image } = await raceGetOneId({ idRace });

    let imageUrl = image;
    if (imageFile) {
      imageUrl = await uploadImage(imageFile);
    }

    const newRace = await raceUpdate({
      idRace,
      name,
      description,
      image: imageUrl,
    });

    res.status(200).json({
      data: newRace,
      status: 200,
    });
  } catch (error) {
    handleError(error, req, res);
  }
};

export const deleteRace = async (req: Request<reqParamId>, res: Response) => {
  try {
    const id = getParamID(req.params.id);

    await raceDelete({ idRace: id });

    res.status(200).json({
      status: 200,
      message: "Race delete",
    });
  } catch (error) {
    handleError(error, req, res);
  }
};
