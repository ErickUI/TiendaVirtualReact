import type { Id, RolSistema } from './comunes.model';

export interface DireccionEnvio {
  id?: Id;
  alias?: string;
  direccionLinea1: string;
  direccionLinea2?: string;
  distrito?: string;
  ciudad: string;
  region?: string;
  pais: string;
  referencia?: string;
}

export interface Usuario {
  id: Id;
  nombres: string;
  apellidos: string;
  correo: string;
  telefono?: string;
  passwordHash?: string;
  rol: RolSistema;
  activo: boolean;
  direcciones?: DireccionEnvio[];
  fechaRegistro: string;
}
