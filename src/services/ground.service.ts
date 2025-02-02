import { ErrorController } from "../utils/errors";
import { Ground } from "../models/Ground";
import { GroundCreate, Ground as GroundType } from "../types";

interface OwnerGetAllData {
  page: number;
  idUser: number;
}

export const groundGetAll = async ({ idUser, page }: OwnerGetAllData) => {
  const limitPages = 9;

  const grounds = await Ground.findAll({
    limit: limitPages,
    offset: limitPages * (page - 1),
    where: {
      id_user: idUser,
    },
  });

  const countGrounds = await Ground.count({
    where: { id_user: idUser },
  });

  const maxPages = Math.ceil(countGrounds / limitPages);

  return { grounds, maxPages };
};

interface groundGetOneIdData {
  idGround: number;
  idUser: number;
}
export const groundGetOneId = async ({
  idGround,
  idUser,
}: groundGetOneIdData) => {
  const ground = await Ground.findOne({
    where: { id_ground: idGround, id_user: idUser },
  });

  if (!ground) {
    throw new ErrorController({
      message: "Ground not found",
      statusCode: 404,
    });
  }

  return ground;
};

export const groundCreate = async ({
  name,
  image,
  id_user,
  address,
  length,
  width,
  notes,
}: GroundCreate) => {
  const newGround = await Ground.create({
    name,
    image,
    id_user,
    address,
    length,
    width,
    notes,
  });

  return newGround;
};

export const groundUpdate = async ({
  id_ground,
  name,
  image,
  id_user,
  address,
  length,
  notes,
  width,
}: GroundType) => {
  await Ground.update(
    {
      id_user,
      name,
      image,
      address,
      length,
      notes,
      width,
    },
    {
      where: {
        id_ground: id_ground,
      },
    }
  );

  return {
    id_ground,
    name,
    image,
    id_user,
  };
};

export const groundDelete = async ({
  idGround,
  idUser,
}: {
  idGround: number;
  idUser: number;
}) => {
  const ground = await groundGetOneId({ idGround, idUser });

  await ground.destroy();
};
