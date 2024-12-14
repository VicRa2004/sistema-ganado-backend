import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/db";
import { Iron as IronType } from "../types"; // Ajusta la ruta de types.d.ts
import { User } from "./User";

// Define los atributos opcionales para Iron al crearlo
interface IronCreationAttributes extends Optional<IronType, "id_iron"> {}

export class Iron
   extends Model<IronType, IronCreationAttributes>
   implements IronType
{
   public id_iron!: number;
   public image!: string;
   public id_user!: number;

   public readonly createdAt?: Date;
   public readonly updatedAt?: Date;
}

Iron.init(
   {
      id_iron: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true,
      },
      image: {
         type: DataTypes.STRING,
         allowNull: false, // La imagen no debe ser nula
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
      modelName: "irons",
      timestamps: true, // Activa timestamps si son necesarios
   }
);

// Establece las relaciones
User.hasMany(Iron, {
   foreignKey: "id_user", // Clave foránea en Iron
   sourceKey: "id_user", // Clave primaria en Owner
});

Iron.belongsTo(User, {
   foreignKey: "id_user", // Clave foránea en Iron
   targetKey: "id_user", // Clave primaria en Owner
});
