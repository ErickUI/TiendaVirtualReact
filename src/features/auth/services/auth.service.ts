import { httpClient } from '../../../core/api/httpClient';
import { endpoints } from '../../../core/api/endpoints';
import type { CredencialesLogin, UsuarioSesion } from '../../../models/auth.model';
import type { Usuario } from '../../../models/usuario.model';


export async function iniciarSesion(
  credenciales: CredencialesLogin
): Promise<UsuarioSesion> {
  // Mediante el json server buscamos el usuarios  por el correo y la contrasena
  const respuesta = await httpClient.get<Usuario[]>(`${endpoints.usuarios}`, {
    params: {
      correo: credenciales.correo,
      password: credenciales.password,
      activo: true,
    },
  });

  if (!respuesta.data || respuesta.data.length === 0) {
    throw new Error('Usuario o contraseña incorrectos');
  }

  const usuario = respuesta.data[0];

  const usuarioSesion: UsuarioSesion = {
    id: usuario.id,
    nombres: usuario.nombres,
    apellidos: usuario.apellidos,
    correo: usuario.correo,
    rol: usuario.rol,
    telefono: usuario.telefono,
    token: `fake-token-${usuario.id}`,
  };

  // Guardamos en localStorage
  localStorage.setItem('usuario-sesion', JSON.stringify(usuarioSesion));
  localStorage.setItem('token-demo', usuarioSesion.token ?? '');

  return usuarioSesion;
}

export function cerrarSesion() {
  localStorage.removeItem('usuario-sesion');
  localStorage.removeItem('token-demo');
}

export function obtenerUsuarioSesion(): UsuarioSesion | null {
  const raw = localStorage.getItem('usuario-sesion');
  if (!raw) return null;
  try {
    return JSON.parse(raw) as UsuarioSesion;
  } catch {
    return null;
  }
}
