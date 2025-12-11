export type Id = number | string;

export type RolSistema = 'CLIENTE' | 'EMPLEADO' | 'ADMIN';

export type EstadoPedido = 'PENDIENTE' | 'PAGADO' | 'ENVIADO' | 'ENTREGADO' | 'CANCELADO';

export interface ApiRespuesta<T> {
  ok: boolean;
  mensaje?: string;
  datos?: T;
  erroresValidacion?: Record<string, string>;
}

export interface Paginacion<T> {
  items: T[];
  total: number;
  paginaActual: number;
  tamanioPagina: number;
}
