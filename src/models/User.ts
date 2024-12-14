import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/db";
import { User as UserType, rol } from "../types"; // Asegúrate de ajustar la ruta de types.d.ts

// Define un tipo para la entrada opcional de atributos al crear un usuario
interface UserCreationAttributes extends Optional<UserType, "id_user"> {}

// Extiende el modelo de Sequelize con tus tipos
export class User
   extends Model<UserType, UserCreationAttributes>
   implements UserType
{
   public id_user!: number;
   public fullname!: string;
   public password!: string;
   public username!: string;
   public email!: string;
   public rol!: rol;
}

// Define el modelo usando Sequelize
User.init(
   {
      id_user: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true,
      },
      fullname: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      password: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      username: {
         type: DataTypes.STRING,
         allowNull: false,
         unique: true,
      },
      email: {
         type: DataTypes.STRING,
         allowNull: false,
         unique: true,
      },
      rol: {
         type: DataTypes.ENUM("admin", "user"), // Restringe valores al tipo "rol"
         allowNull: false,
      },
   },
   {
      sequelize,
      modelName: "users",
      timestamps: false, // Opcional: desactiva timestamps si no los usas
   }
);
