import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/db";
import { Ground as GroundType } from "../types"; // Ajusta la ruta
import { User } from "./User";

interface GroundCreationAttributes extends Optional<GroundType, "id_ground"> {}

export class Ground
   extends Model<GroundType, GroundCreationAttributes>
   implements GroundType
{
   public id_ground!: number;
   public name!: string;
   public image!: string;
   public width!: number;
   public length!: number;
   public address!: string;
   public notes: string;
   public id_user!: number;

   public readonly createdAt?: Date;
   public readonly updatedAt?: Date;
}

Ground.init(
   {
      id_ground: {
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
      image: {
         type: DataTypes.STRING,
      },
      width: {
         type: DataTypes.FLOAT,
         allowNull: true,
      },
      length: {
         type: DataTypes.FLOAT,
         allowNull: true,
      },
      address: {
         type: DataTypes.STRING,
         allowNull: true,
      },
      notes: {
         type: DataTypes.STRING,
         allowNull: true,
      },
      id_user: {
         type: DataTypes.INTEGER,
         allowNull: false, // No debe ser nulo
         references: {
            model: User, // Relación con el modelo Owner
            key: "id_user",
         },
      },
   },
   {
      sequelize,
      modelName: "grounds",
      timestamps: true, // Activa timestamps si son necesarios
   }
);

// Establece las relaciones
User.hasMany(Ground, {
   foreignKey: "id_user", // Clave foránea en Ground
   sourceKey: "id_user", // Clave primaria en Owner
});

Ground.belongsTo(User, {
   foreignKey: "id_user", // Clave foránea en Ground
   targetKey: "id_user", // Clave primaria en Owner
});

/**
 * medidas
 * ubicacion
 * vecinos o colindantes
 */
