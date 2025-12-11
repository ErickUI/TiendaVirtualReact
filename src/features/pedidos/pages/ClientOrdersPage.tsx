import { useEffect, useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import type { Pedido } from '../../../models/pedido.model';
import { obtenerPedidosPorUsuario } from '../services/pedido.service';

function ClientOrdersPage() {
    const { usuarioActual } = useAuth();
    const [pedidos, setPedidos] = useState<Pedido[]>([]);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const cargar = async () => {
            if (!usuarioActual) return;
            setCargando(true);
            setError(null);
            try {
                const data = await obtenerPedidosPorUsuario(usuarioActual.id);
                setPedidos(data);
            } catch {
                setError('No se pudieron cargar tus pedidos');
            } finally {
                setCargando(false);
            }
        };
        void cargar();
    }, [usuarioActual]);

    if (!usuarioActual) return null;

    return (
        <div>
            <h3 className="mb-3">Mis pedidos</h3>

            {cargando && <p>Cargando...</p>}
            {error && <div className="alert alert-danger">{error}</div>}

            {pedidos.length === 0 && !cargando && !error && (
                <p className="text-muted">Aún no has realizado pedidos.</p>
            )}

            <div className="row g-3">
                {pedidos.map((p) => (
                    <div key={p.id} className="col-md-6">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <div className="d-flex justify-content-between mb-1">
                                    <div className="fw-semibold">{p.codigo}</div>
                                    <span className="badge bg-secondary-subtle text-secondary">
                                        {p.estado}
                                    </span>
                                </div>
                                <div className="small text-muted mb-1">
                                    {new Date(p.fechaPedido).toLocaleString()}
                                </div>
                                <div className="fw-bold">
                                    Total: S/ {p.total.toFixed(2)}
                                </div>
                                <div className="small mt-2">
                                    Envío: {p.direccionEnvioResumen}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ClientOrdersPage;
