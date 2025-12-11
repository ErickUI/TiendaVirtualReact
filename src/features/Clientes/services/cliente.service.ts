import { httpClient } from "../../../core/api/httpClient";
import { endpoints } from "../../../core/api/endpoints";
import type { Usuario } from "../../../models/usuario.model";

export async function obtenerClientes(): Promise<Usuario[]> {
  const resp = await httpClient.get<Usuario[]>(endpoints.usuarios, {
    params: { rol: "CLIENTE" },
  });
  return resp.data;
}

export async function obtenerClientePorId(
  id: number | string
): Promise<Usuario> {
  const resp = await httpClient.get<Usuario>(`${endpoints.usuarios}/${id}`);
  return resp.data;
}

export async function crearCliente(
  data: Omit<Usuario, "id" | "fechaRegistro" | "rol">
): Promise<Usuario> {
  const nuevo: Usuario = {
    ...data,
    rol: "CLIENTE",
    activo: true,
    fechaRegistro: new Date().toISOString(),
    id: crypto.randomUUID?.() ?? Date.now().toString(),
  };
  const resp = await httpClient.post<Usuario>(endpoints.usuarios, nuevo);
  return resp.data;
}

export async function actualizarCliente(
  id: number | string,
  data: Partial<Usuario>
): Promise<Usuario> {
  const resp = await httpClient.patch<Usuario>(
    `${endpoints.usuarios}/${id}`,
    data
  );
  return resp.data;
}

export async function eliminarCliente(id: number | string): Promise<void> {
  await httpClient.delete(`${endpoints.usuarios}/${id}`);
}
