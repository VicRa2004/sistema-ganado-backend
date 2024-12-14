import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/db";
import { Owner as OwnerType } from "../types"; // Ajusta la ruta
import { User } from "./User";

interface OwnerCreationAttributes extends Optional<OwnerType, "id_owner"> {}

export class Owner
   extends Model<OwnerType, OwnerCreationAttributes>
   implements OwnerType
{
   public id_owner!: number;
   public name!: string;
   public id_user!: number;
   public readonly createdAt?: Date;
   public readonly updatedAt?: Date;
}

Owner.init(
   {
      id_owner: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true,
      },
      name: {
         type: DataTypes.STRING,
         allowNull: false,
         validate: {
            len: [2, 255],
         },
      },
      id_user: {
         type: DataTypes.INTEGER,
         allowNull: false,
         references: {
            model: User, // Relación con el modelo User
            key: "id_user",
         },
      },
   },
   {
      sequelize,
      modelName: "owners",
      timestamps: true, // Activa timestamps si son necesarios
   }
);

// Establece las relaciones
User.hasMany(Owner, {
   foreignKey: "id_user", // Clave foránea en Owner
   sourceKey: "id_user", // Clave primaria en User
});

Owner.belongsTo(User, {
   foreignKey: "id_user", // Clave foránea en Owner
   targetKey: "id_user", // Clave primaria en User
});
