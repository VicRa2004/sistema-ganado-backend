import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/db";
import { BreedingRegistry as BreedingRegistryType } from "../types"; // Ajusta la ruta de types.d.ts
import { Cattle } from "./Cattle";

// Define los atributos opcionales para BreedingRegistry al crearlo
interface BreedingRegistryCreationAttributes
   extends Optional<BreedingRegistryType, "id_registry"> {}

export class BreedingRegistry
   extends Model<BreedingRegistryType, BreedingRegistryCreationAttributes>
   implements BreedingRegistryType
{
   public id_registry!: number;
   public last_time!: Date;
   public id_cattle!: number;
   public readonly createdAt?: Date;
   public readonly updatedAt?: Date;
}

BreedingRegistry.init(
   {
      id_registry: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true,
      },
      last_time: {
         type: DataTypes.DATE,
         allowNull: false,
      },
      id_cattle: {
         type: DataTypes.INTEGER,
         allowNull: false,
         references: {
            model: Cattle,
            key: "id_cattle",
         },
      },
   },
   {
      sequelize,
      modelName: "breeding_registry",
      timestamps: true, // Incluye createdAt y updatedAt
   }
);

// Relaciones
Cattle.hasMany(BreedingRegistry, {
   foreignKey: "id_cattle",
   sourceKey: "id_cattle",
});

BreedingRegistry.belongsTo(Cattle, {
   foreignKey: "id_cattle",
   targetKey: "id_cattle",
});
