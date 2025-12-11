const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3001';

export const endpoints = {
  baseUrl: API_BASE_URL,
  productos: `${API_BASE_URL}/productos`,
  categorias: `${API_BASE_URL}/categorias`,
  usuarios: `${API_BASE_URL}/usuarios`,
  empleados: `${API_BASE_URL}/empleados`,
  pedidos: `${API_BASE_URL}/pedidos`,
  pedidoDetalles: `${API_BASE_URL}/pedidoDetalles`,
};