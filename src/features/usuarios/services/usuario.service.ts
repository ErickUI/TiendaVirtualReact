import type { Usuario } from '../../../models/usuario.model';
import type { Id } from '../../../models/comunes.model';
import { httpClient } from '../../../core/api/httpClient';
import { endpoints } from '../../../core/api/endpoints';

export async function actualizarPerfilUsuario(
  id: Id,
  datos: Partial<Usuario>
): Promise<Usuario> {
  const resp = await httpClient.patch<Usuario>(
    `${endpoints.usuarios}/${id}`,
    datos
  );
  return resp.data;
}
