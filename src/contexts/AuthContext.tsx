import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { CredencialesLogin, UsuarioSesion } from '../models/auth.model';
import {
  iniciarSesion,
  cerrarSesion,
  obtenerUsuarioSesion,
} from '../features/auth/services/auth.service';

interface AuthContextProps {
  usuarioActual: UsuarioSesion | null;
  estaAutenticado: boolean;
  cargandoAuth: boolean;
  login: (credenciales: CredencialesLogin) => Promise<void>;
  logout: () => void;
  actualizarSesion: (datos: Partial<UsuarioSesion>) => void;
}

export const AuthContext = createContext<AuthContextProps>({
  usuarioActual: null,
  estaAutenticado: false,
  cargandoAuth: false,
  async login(_credenciales: CredencialesLogin) {},
  logout() {},
  actualizarSesion() {},
});

interface AuthProviderProps {
  children: ReactNode;
}

const AUTH_STORAGE_KEY = 'mitienda-auth';

export function AuthProvider({ children }: AuthProviderProps) {
  const [usuarioActual, setUsuarioActual] = useState<UsuarioSesion | null>(null);
  const [cargandoAuth, setCargandoAuth] = useState(true);

  useEffect(() => {
    const usuario = obtenerUsuarioSesion();
    if (usuario) {
      setUsuarioActual(usuario);
    }
    setCargandoAuth(false);
  }, []);

  const login = useCallback(async (credenciales: CredencialesLogin) => {
    setCargandoAuth(true);
    try {
      const usuarioSesion = await iniciarSesion(credenciales);
      setUsuarioActual(usuarioSesion);

      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(usuarioSesion));
    } finally {
      setCargandoAuth(false);
    }
  }, []);

  const logout = useCallback(() => {
    cerrarSesion();
    setUsuarioActual(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }, []);

  const actualizarSesion = useCallback((datos: Partial<UsuarioSesion>) => {
    setUsuarioActual((prev) => {
      if (!prev) return prev;
      const actualizado: UsuarioSesion = { ...prev, ...datos };
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(actualizado));
      return actualizado;
    });
  }, []);

  const value = useMemo(
    () => ({
      usuarioActual,
      estaAutenticado: !!usuarioActual,
      cargandoAuth,
      login,
      logout,
      actualizarSesion,
    }),
    [usuarioActual, cargandoAuth, login, logout, actualizarSesion]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
