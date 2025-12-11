import { httpClient } from '../../../core/api/httpClient';
import { endpoints } from '../../../core/api/endpoints';
import type { Producto } from '../../../models/producto.model';
import type { Usuario } from '../../../models/usuario.model';
import type { Pedido } from '../../../models/pedido.model';

export interface ResumenDashboard {
  totalProductos: number;
  totalClientes: number;
  totalPedidos: number;
  totalPedidosHoy: number;
  ventasHoy: number;
  ventasPorMes: { mes: string; total: number }[];
}

export async function obtenerResumenDashboard(): Promise<ResumenDashboard> {
  const [prodResp, cliResp, pedResp] = await Promise.all([
    httpClient.get<Producto[]>(endpoints.productos),
    httpClient.get<Usuario[]>(endpoints.usuarios, { params: { rol: 'CLIENTE' } }),
    httpClient.get<Pedido[]>(endpoints.pedidos),
  ]);

  const hoy = new Date().toISOString().substring(0, 10);

  const pedidosHoy = pedResp.data.filter(p => p.fechaPedido.startsWith(hoy));
  const ventasHoy = pedidosHoy.reduce((acc, p) => acc + p.total, 0);

  // Agrupar ventas por mes (simple)
  const mapaMes: Record<string, number> = {};
  for (const p of pedResp.data) {
    const fecha = new Date(p.fechaPedido);
    const key = `${fecha.getFullYear()}-${(fecha.getMonth() + 1).toString().padStart(2, '0')}`;
    mapaMes[key] = (mapaMes[key] ?? 0) + p.total;
  }

  const ventasPorMes = Object.entries(mapaMes)
    .sort(([a], [b]) => (a < b ? -1 : 1))
    .map(([mes, total]) => ({ mes, total }));

  return {
    totalProductos: prodResp.data.length,
    totalClientes: cliResp.data.length,
    totalPedidos: pedResp.data.length,
    totalPedidosHoy: pedidosHoy.length,
    ventasHoy,
    ventasPorMes,
  };
}
