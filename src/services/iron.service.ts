import { Iron } from "../models/Iron";
import { ErrorController } from "../utils/errors";

interface IronGetAllData {
  page: number;
  idUser: number;
}

const ironGetAll = async ({ idUser, page }: IronGetAllData) => {
  const limitPages = 10;

  const irons = await Iron.findAll({
    limit: limitPages,
    offset: limitPages * (page - 1),
    where: { id_user: idUser },
  });

  const countIrons = await Iron.count({
    where: { id_user: idUser },
  });

  const maxPages = Math.ceil(countIrons / limitPages);

  return { irons, maxPages };
};

interface IronGetOneData {
  idIron: number;
  idUser: number;
}

const ironGetOne = async ({ idIron, idUser }: IronGetOneData) => {
  const iron = await Iron.findOne({
    where: {
      id_iron: idIron,
      id_user: idUser,
    },
  });

  if (!iron) {
    throw new ErrorController({
      message: "Iron not found",
      statusCode: 401,
    });
  }

  return iron;
};

interface IronCreateData {
  idUser: number;
  name: string;
  image: string;
}

const ironCreate = async ({ image, idUser, name }: IronCreateData) => {
  const newIron = await Iron.create({ id_user: idUser, image, name });

  return newIron;
};

interface IronUpdateData extends IronCreateData {
  idIron: number;
}

const ironUpdate = async ({ idIron, image, idUser, name }: IronUpdateData) => {
  await Iron.update(
    { image, name },
    {
      where: {
        id_iron: idIron,
        id_user: idUser,
      },
    }
  );

  return {
    id_iron: idIron,
    id_user: idUser,
    name,
    image,
  };
};

const ironDelete = async ({ idIron, idUser }: IronGetOneData) => {
  const iron = await ironGetOne({ idUser, idIron });

  await iron.destroy();
};

export const ironService = {
  ironGetAll,
  ironGetOne,
  ironCreate,
  ironUpdate,
  ironDelete,
};
