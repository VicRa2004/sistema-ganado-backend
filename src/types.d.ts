import "express";

declare module "express" {
   interface UserPayload {
      id: string; // Cambia a `number` si el ID es numérico
      email: string;
   }

   interface Request {
      user?: UserPayload; // Adjunta el payload del token JWT
   }
}

type rol = "admin" | "user";

export interface User {
   id_user: number;
   fullname: string;
   password: string;
   username: string;
   email: string;
   rol: rol;
}

// Propietario
export interface Owner {
   id_owner: number;
   name: string;
   id_user: number;
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
   id_cattle: string;
   description: string;
   father: number;
   mother: number;
   gender: string;
   earring_1: string;
   earring_2: string;
   color: string;
   birthdate: Date;
   registration_number: number;
   observations: string;
   image: string;
   reason_for_withdrawal: string; // Motivo de baja
   id_iron: number;
   id_race: number;
   id_user: number;
}

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

export type reqQueryGet = {
   page?: string;
};

export type reqParamId = {
   id: string;
};
