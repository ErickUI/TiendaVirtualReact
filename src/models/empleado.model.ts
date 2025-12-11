import type { Id, RolSistema } from './comunes.model';

export interface Empleado {
  id: Id;
  nombres: string;
  apellidos: string;
  documentoIdentidad: string;
  correoCorporativo: string;
  telefono?: string;
  cargo: string;
  rol: RolSistema;
  activo: boolean;
  fechaIngreso: string;
}
