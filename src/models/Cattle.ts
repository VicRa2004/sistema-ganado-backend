import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import { Iron } from "./Iron";
import { Race } from "./Race";
import { User } from "./User";
import type { Cattle as CattleType, CattleCreate } from "../types";

export class Cattle
   extends Model<CattleType, CattleCreate>
   implements CattleType
{
   public id_cattle!: string;
   public description!: string;
   public father!: number;
   public mother!: number;
   public gender!: "male" | "female";
   public registrationNumber: string;
   public lotNumber: string;
   public color!: string;
   public birthdate!: Date;
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
      registrationNumber: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      lotNumber: {
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
      timestamps: true,
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
