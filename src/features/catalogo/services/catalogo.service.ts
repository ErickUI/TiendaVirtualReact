import { httpClient } from '../../../core/api/httpClient';
import { endpoints } from '../../../core/api/endpoints';
import type { Producto } from '../../../models/producto.model';

export async function obtenerCatalogo(): Promise<Producto[]> {
  const resp = await httpClient.get<Producto[]>(endpoints.productos, {
    params: { estado: 'ACTIVO' },
  });
  return resp.data;
}

export async function obtenerProductoCatalogo(id: number | string): Promise<Producto> {
  const resp = await httpClient.get<Producto>(`${endpoints.productos}/${id}`);
  return resp.data;
}

export async function obtenerCategorias(): Promise<string[]> {
  const resp = await httpClient.get<Producto[]>(endpoints.productos);
  const categorias = Array.from(
    new Set(resp.data.map((p) => p.categoria?.nombre ?? 'General'))
  );
  return categorias;
}
