import type { ResumenDashboard } from '../services/dashboard.service';

interface Props {
  resumen: ResumenDashboard;
}

function DashboardStatsPanel({ resumen }: Props) {
  return (
    <div className="row g-3 mb-4">
      <div className="col-md-3">
        <div className="card shadow-sm">
          <div className="card-body">
            <div className="small text-muted">Productos</div>
            <div className="h4 mb-0">{resumen.totalProductos}</div>
          </div>
        </div>
      </div>
      <div className="col-md-3">
        <div className="card shadow-sm">
          <div className="card-body">
            <div className="small text-muted">Clientes</div>
            <div className="h4 mb-0">{resumen.totalClientes}</div>
          </div>
        </div>
      </div>
      <div className="col-md-3">
        <div className="card shadow-sm">
          <div className="card-body">
            <div className="small text-muted">Pedidos (hoy)</div>
            <div className="h4 mb-0">{resumen.totalPedidosHoy}</div>
          </div>
        </div>
      </div>
      <div className="col-md-3">
        <div className="card shadow-sm">
          <div className="card-body">
            <div className="small text-muted">Ventas hoy</div>
            <div className="h4 mb-0">S/ {resumen.ventasHoy.toFixed(2)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardStatsPanel;
