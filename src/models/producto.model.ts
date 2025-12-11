import type { Id } from './comunes.model';
import type { Categoria } from './categoria.model';

export interface Producto {
  id: Id;
  nombre: string;
  descripcion?: string;
  precio: number;
  stock: number;
  sku?: string;
  imagenUrl?: string;
  categoriaId: Id;
  categoria?: Categoria; 
  estado: 'ACTIVO' | 'INACTIVO';
  fechaRegistro: string;
}
