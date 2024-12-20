import "express";

declare module "express" {
   interface UserPayload {
      id: number;
      email: string;
   }

   interface Request {
      user?: UserPayload; // Adjunta el payload del token JWT
   }
}

// Types de los modelos

type rol = "admin" | "user";

// Aqui se puede agregar si esta confirmado
// o no para confirmar el correo
export interface User {
   id_user: number;
   fullname: string;
   password: string;
   username: string;
   email: string;
   rol: rol;
}

// Terreno
export interface Ground {
   id_ground: number;
   name: string;
   image: string;
   id_user: number;
}

// Raza
export interface Race {
   id_race: number;
   name: string;
   description: string;
   image: string;
}

// Fierro
export interface Iron {
   id_iron: number;
   image: string;
   id_user: number;
}

// Ganados
export interface Cattle {
   id_cattle: number;
   description: string;
   father?: number;
   mother?: number;
   gender: "male" | "female";
   registrationNumber: string; // Arete Numero grande
   lotNumber: string; // Arete numero pequeño
   color: string;
   birthdate: Date;
   observations?: string;
   image: string;
   reason_for_withdrawal?: string; // Motivo de baja
   id_iron: number;
   id_race: number;
   id_user: number;
}

export interface CattleCreate extends Omit<CattleType, "id_cattle"> {}

// Registro de crias
export interface BreedingRegistry {
   id_registry: number;
   last_time: Date;
   id_cattle: number;
}

// Ganado - Campo
export interface CattleGround {
   id_cg: number;
   id_cattle: number;
   id_ground: number;
}

// Tipos de dato adicionales

// Types Controllers
export type reqQueryGet = {
   page?: string;
};

export type reqParamId = {
   id: string;
};
