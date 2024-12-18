import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/db";
import { Cattle as CattleType } from "../types"; // Ajusta la ruta de types.d.ts
import { Iron } from "./Iron";
import { Race } from "./Race";
import { User } from "./User";

// Define los atributos opcionales para Cattle al crearlo
interface CattleCreationAttributes extends Optional<CattleType, "id_cattle"> {}

export class Cattle
   extends Model<CattleType, CattleCreationAttributes>
   implements CattleType
{
   public id_cattle!: string;
   public description!: string;
   public father!: number;
   public mother!: number;
   public gender!: string;
   public earring_1!: string;
   public earring_2!: string;
   public color!: string;
   public birthdate!: Date;
   public registration_number!: number;
   public observations!: string;
   public image!: string;
   public reason_for_withdrawal!: string;
   public id_iron!: number;
   public id_race!: number;
   public id_user!: number;

   public readonly createdAt?: Date;
   public readonly updatedAt?: Date;
}

Cattle.init(
   {
      id_cattle: {
         type: DataTypes.STRING,
         primaryKey: true,
      },
      description: {
         type: DataTypes.TEXT,
         allowNull: false,
      },
      father: {
         type: DataTypes.INTEGER,
         allowNull: true, // Puede no estar disponible
      },
      mother: {
         type: DataTypes.INTEGER,
         allowNull: true, // Puede no estar disponible
      },
      gender: {
         type: DataTypes.STRING,
         allowNull: false,
         validate: {
            isIn: [["male", "female"]], // Validación para género
         },
      },
      earring_1: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      earring_2: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      color: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      birthdate: {
         type: DataTypes.DATE,
         allowNull: false,
      },
      registration_number: {
         // No se lo que sea
         type: DataTypes.INTEGER,
         allowNull: false,
         unique: true,
      },
      observations: {
         type: DataTypes.TEXT,
         allowNull: true,
      },
      image: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      reason_for_withdrawal: {
         type: DataTypes.STRING,
         allowNull: true, // Opcional, se llena solo si está dado de baja
      },
      id_iron: {
         type: DataTypes.INTEGER,
         allowNull: false,
         references: {
            model: Iron,
            key: "id_iron",
         },
      },
      id_race: {
         type: DataTypes.INTEGER,
         allowNull: false,
         references: {
            model: Race,
            key: "id_race",
         },
      },
      id_user: {
         type: DataTypes.INTEGER,
         allowNull: false,
         references: {
            model: User,
            key: "id_user",
         },
      },
   },
   {
      sequelize,
      modelName: "cattle",
      timestamps: true, // Incluye createdAt y updatedAt
   }
);

// Relaciones
Iron.hasMany(Cattle, {
   foreignKey: "id_iron",
   sourceKey: "id_iron",
});

Cattle.belongsTo(Iron, {
   foreignKey: "id_iron",
   targetKey: "id_iron",
});

Race.hasMany(Cattle, {
   foreignKey: "id_race",
   sourceKey: "id_race",
});

Cattle.belongsTo(Race, {
   foreignKey: "id_race",
   targetKey: "id_race",
});

User.hasMany(Cattle, {
   foreignKey: "id_user",
   sourceKey: "id_user",
});

Cattle.belongsTo(User, {
   foreignKey: "id_user",
   targetKey: "id_user",
});
