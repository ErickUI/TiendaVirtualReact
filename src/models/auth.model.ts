import type { RolSistema } from './comunes.model';
import type { Id } from './comunes.model';

export interface CredencialesLogin {
  correo: string;
  password: string;
}

export interface UsuarioSesion {
  id: Id;
  nombres: string;
  apellidos: string;
  correo: string;
  rol: RolSistema;
  token?: string; 
  telefono?: string;
}
