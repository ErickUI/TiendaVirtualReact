import type { Id, EstadoPedido } from './comunes.model';
import type { Usuario } from './usuario.model';
import type { Producto } from './producto.model';

export interface PedidoDetalle {
  id: Id;
  pedidoId: number | string;
  productoId: Id;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
  producto?: Producto;
}

export interface Pedido {
  id: Id;
  codigo: string;
  usuarioId: Id;
  fechaPedido: string;
  estado: EstadoPedido;
  total: number;
  direccionEnvioResumen: string;
  observaciones?: string;
  detalles?: PedidoDetalle[];
  
  metodoPago: string;
  usuario?: Usuario;
}