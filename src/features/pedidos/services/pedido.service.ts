import { httpClient } from '../../../core/api/httpClient';
import { endpoints } from '../../../core/api/endpoints';
import type { Pedido, PedidoDetalle } from '../../../models/pedido.model';
import type { ItemCarrito } from '../../carrito/context/CartContext';

export async function obtenerPedidos(): Promise<Pedido[]> {
  const resp = await httpClient.get<Pedido[]>(endpoints.pedidos, {
    params: { _expand: 'usuario' },
  });
  return resp.data;
}

export async function obtenerPedidoPorId(id: number | string): Promise<Pedido> {
  const resp = await httpClient.get<Pedido>(`${endpoints.pedidos}/${id}`, {
    params: { _embed: 'pedidoDetalles', _expand: 'usuario' },
  });
  return resp.data;
}

export async function actualizarEstadoPedido(
  id: number | string,
  estado: string
): Promise<Pedido> {
  const resp = await httpClient.patch<Pedido>(`${endpoints.pedidos}/${id}`, {
    estado,
  });
  return resp.data;
}

export async function obtenerPedidosPorUsuario(
  usuarioId: number | string
): Promise<Pedido[]> {
  const resp = await httpClient.get<Pedido[]>(endpoints.pedidos, {
    params: { usuarioId }
  });
  return resp.data;
}


export async function crearPedidoDesdeCarrito(
  usuarioId: number | string,
  direccionEnvioResumen: string,
  metodoPago: string,
  items: ItemCarrito[]
): Promise<Pedido> {
  const total = items.reduce(
    (acc, i) => acc + i.producto.precio * i.cantidad,
    0
  );

  const pedidoId = Date.now();

  const detalles: PedidoDetalle[] = items.map((i, index) => ({
    id: pedidoId + index,
    pedidoId,
    productoId: i.producto.id,
    cantidad: i.cantidad,
    precioUnitario: i.producto.precio,
    subtotal: i.producto.precio * i.cantidad,
  }));

  const nuevoPedido: Pedido = {
    id: pedidoId,
    codigo: `PED-${new Date().getFullYear()}-${Math.floor(Math.random() * 9000 + 1000)}`,
    usuarioId,
    fechaPedido: new Date().toISOString(),
    estado: 'PENDIENTE',
    total,
    direccionEnvioResumen,
    metodoPago,
    detalles,
  };

  const resp = await httpClient.post<Pedido>(endpoints.pedidos, nuevoPedido);
  return resp.data;
}