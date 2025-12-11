// src/features/auth/types/auth.d.ts
import type { Id, RolSistema } from '../../../models/comunes.model';

export interface CredencialesLogin {
  correo: string;
  password: string;
}

export interface UsuarioSesion {
  id: Id;
  nombres: string;
  apellidos: string;
  correo: string;
  telefono?: string;
  rol: RolSistema;
}
