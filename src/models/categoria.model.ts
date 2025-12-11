import type { Id } from './comunes.model';

export interface Categoria {
  id: Id;
  nombre: string;
  descripcion?: string;
  estado: 'ACTIVO' | 'INACTIVO';
  fechaRegistro: string;
}
