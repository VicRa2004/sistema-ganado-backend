import { Request, Response } from "express";
import { raceGetAll } from "../services/race.service";
import { handleError } from "../utils/handleErrors";

export const getAllRace = async (req: Request, res: Response) => {
   try {
      //await raceGetAll({});
   } catch (error) {
      handleError(error, req, res);
   }
};

export const getOneRace = () => {};

export const createRace = () => {};

export const updateRace = () => {};

export const deleteRace = () => {};
