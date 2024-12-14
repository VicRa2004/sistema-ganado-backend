import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/db";
import { Race as RaceType } from "../types"; // Ajusta la ruta

// Define los atributos opcionales para Race al crearlo
interface RaceCreationAttributes extends Optional<RaceType, "id_race"> {}

export class Race
   extends Model<RaceType, RaceCreationAttributes>
   implements RaceType
{
   public id_race!: number;
   public name!: string;
   public description!: string;
   public image!: string;

   public readonly createdAt?: Date;
   public readonly updatedAt?: Date;
}

Race.init(
   {
      id_race: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true,
      },
      name: {
         type: DataTypes.STRING,
         allowNull: false,
         validate: {
            len: [2, 255], // Longitud mínima y máxima para el nombre
         },
      },
      description: {
         type: DataTypes.TEXT,
         allowNull: true, // La descripción puede ser opcional
      },
      image: {
         type: DataTypes.STRING,
         allowNull: false, // La imagen no debe ser nula
      },
   },
   {
      sequelize,
      modelName: "races",
      timestamps: true, // Activa timestamps si los necesitas
   }
);
