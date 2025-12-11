import { httpClient } from '../../../core/api/httpClient';
import { endpoints } from '../../../core/api/endpoints';
import type { Producto } from '../../../models/producto.model';

export async function obtenerProductos(): Promise<Producto[]> {
  const respuesta = await httpClient.get<Producto[]>(endpoints.productos);
  return respuesta.data;
}

export async function obtenerProductoPorId(id: number | string): Promise<Producto> {
  const respuesta = await httpClient.get<Producto>(`${endpoints.productos}/${id}`);
  return respuesta.data;
}

export async function crearProducto(producto: Omit<Producto, 'id' | 'fechaRegistro'>): Promise<Producto> {
  const nuevo = {
    ...producto,
    fechaRegistro: new Date().toISOString(),
  };
  const respuesta = await httpClient.post<Producto>(endpoints.productos, nuevo);
  return respuesta.data;
}

export async function actualizarProducto(
  id: number | string,
  producto: Partial<Producto>
): Promise<Producto> {
  const respuesta = await httpClient.patch<Producto>(`${endpoints.productos}/${id}`, producto);
  return respuesta.data;
}

export async function eliminarProducto(id: number | string): Promise<void> {
  await httpClient.delete(`${endpoints.productos}/${id}`);
}
