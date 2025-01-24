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

export const cattleController = { getCattles };
