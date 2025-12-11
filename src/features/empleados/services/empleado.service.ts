import { httpClient } from "../../../core/api/httpClient";
import { endpoints } from "../../../core/api/endpoints";
import type { Empleado } from "../../../models/empleado.model";

export async function obtenerEmpleados(): Promise<Empleado[]> {
  const resp = await httpClient.get<Empleado[]>(endpoints.empleados);
  return resp.data;
}

export async function obtenerEmpleadoPorId(
  id: number | string
): Promise<Empleado> {
  const resp = await httpClient.get<Empleado>(`${endpoints.empleados}/${id}`);
  return resp.data;
}

export async function crearEmpleado(
  data: Omit<Empleado, "id">
): Promise<Empleado> {
  const nuevo: Empleado = {
    ...data,
    id: crypto.randomUUID?.() ?? Date.now().toString(),
  };
  const resp = await httpClient.post<Empleado>(endpoints.empleados, nuevo);
  return resp.data;
}

export async function actualizarEmpleado(
  id: number | string,
  data: Partial<Empleado>
): Promise<Empleado> {
  const resp = await httpClient.patch<Empleado>(
    `${endpoints.empleados}/${id}`,
    data
  );
  return resp.data;
}

export async function eliminarEmpleado(id: number | string): Promise<void> {
  await httpClient.delete(`${endpoints.empleados}/${id}`);
}
