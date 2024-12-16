import { Request, Response } from "express";
import { raceGetAll, raceGetOneId } from "../services/race.service";
import { handleError } from "../utils/handleErrors";
import { reqQueryGet, reqParamId } from "../types";
import { getPage, getParamID } from "../utils/convertNumber";

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

export const createRace = () => {};

export const updateRace = () => {};

export const deleteRace = () => {};
