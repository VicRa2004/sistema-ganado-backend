import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/db";
import { CattleGround as CattleGroundType } from "../types"; // Ajusta la ruta de types.d.ts
import { Cattle } from "./Cattle";
import { Ground } from "./Ground";

// Define los atributos opcionales para CattleGround al crearlo
interface CattleGroundCreationAttributes
   extends Optional<CattleGroundType, "id_cg"> {}

export class CattleGround
   extends Model<CattleGroundType, CattleGroundCreationAttributes>
   implements CattleGroundType
{
   public id_cg!: number;
   public id_cattle!: number;
   public id_ground!: number;

   public readonly createdAt?: Date;
   public readonly updatedAt?: Date;
}

CattleGround.init(
   {
      id_cg: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true,
      },
      id_cattle: {
         type: DataTypes.INTEGER,
         allowNull: false,
         references: {
            model: Cattle,
            key: "id_cattle",
         },
      },
      id_ground: {
         type: DataTypes.INTEGER,
         allowNull: false,
         references: {
            model: Ground,
            key: "id_ground",
         },
      },
   },
   {
      sequelize,
      modelName: "cattle_ground",
      timestamps: true, // Incluye createdAt y updatedAt
   }
);

// Relaciones
Cattle.belongsToMany(Ground, {
   through: CattleGround,
   foreignKey: "id_cattle",
   otherKey: "id_ground",
});

Ground.belongsToMany(Cattle, {
   through: CattleGround,
   foreignKey: "id_ground",
   otherKey: "id_cattle",
});
