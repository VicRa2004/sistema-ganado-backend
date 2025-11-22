import "express";
import { UserRol } from "./modules/user/domain/UserRol";

declare module "express" {
  interface UserPayload {
    id: number;
    email: string;
    rol: UserRol;
  }

  interface Request {
    user?: UserPayload; // Adjunta el payload del token JWT
  }
}

// Agregar la tabla venta ganado

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
  email_confirm: boolean;
}

export interface UserCreate
  extends Optional<User, "id_user" | "email_confirm"> {}

// Terreno
export interface Ground {
  id_ground: number;
  name: string;
  notes?: string;
  length: number;
  width: number;
  address?: string;
  image: string;
  id_user: number;
}

export interface GroundCreate extends Omit<Ground, "id_ground"> {}

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
  name: string;
  image: string;
  id_user: number;
}

// Ganados
export interface Cattle {
  id_cattle: number;
  description: string;
  father?: number | null;
  mother?: number | null;
  gender: "male" | "female";
  registrationNumber: string; // Arete Numero grande
  lotNumber: string; // Arete numero pequeño
  color: string;
  birthdate: Date;
  observations?: string;
  image: string;
  reason_for_withdrawal?: string; // Motivo de baja
  status: number; // 1 Activo, 0 Inactivo
  id_iron: number;
  id_race: number;
  id_user: number;
  id_ground: number;
}

export interface CattleCreate extends Omit<Cattle, "id_cattle"> {}

/**
 * Aqui hay algo raro, creo que debe de ir un id_mother y un id_son
 * para saber cual fue la cria que tuvo, ademas de quitar la ultima vez que eso se
 * sabra un una relacion de traer el ultimo ganado que tuvo
 */

// Registro de crias
export interface BreedingRegistry {
  id_registry: number;
  last_time: Date;
  id_cattle: number;
}

export interface BreedingRegistryCreate
  extends Omit<BreedingRegistry, "id_registry"> {}

// Ganado - Campo
export interface CattleGround {
  id_cg: number;
  id_cattle: number;
  id_ground: number;
}

export interface CattleGroundCreate extends Omit<CattleGround, "id_cg"> {}

// Ganado Venta

export interface CattleSale {
  id_sale: number; // Identificador único de la venta
  id_cattle: number; // Referencia al ganado vendido
  weight_sold: number; // Kilos de ganado vendidos
  price_per_kg: number; // Precio por kilo
  sale_date: Date; // Fecha de la venta
}

// Tipos de dato adicionales

// Types Controllers
export type reqQueryGet = {
  page?: string;
};

export type reqParamId = {
  id: string;
};
