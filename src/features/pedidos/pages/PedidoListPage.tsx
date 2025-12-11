import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Pedido } from '../../../models/pedido.model';
import { obtenerPedidos } from '../services/pedido.service';

function PedidoListPage() {
    const [pedidos, setPedidos] = useState<Pedido[]>([]);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const cargar = async () => {
        setCargando(true);
        setError(null);
        try {
            const data = await obtenerPedidos();
            setPedidos(data);
        } catch {
            setError('No se pudo cargar la lista de pedidos');
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        void cargar();
    }, []);

    return (
        <div>
            <h3 className="mb-3">Pedidos</h3>

            {cargando && <p>Cargando...</p>}
            {error && <div className="alert alert-danger">{error}</div>}

            {!cargando && !error && pedidos.length === 0 && (
                <p className="text-muted">No hay pedidos registrados.</p>
            )}

            {!cargando && !error && pedidos.length > 0 && (
                <div className="table-responsive">
                    <table className="table table-sm table-striped align-middle">
                        <thead>
                            <tr>
                                <th>Código</th>
                                <th>Cliente</th>
                                <th>Fecha</th>
                                <th>Estado</th>
                                <th className="text-end">Total</th>
                                <th style={{ width: 120 }}>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pedidos.map((p) => (
                                <tr key={p.id}>
                                    <td>{p.codigo}</td>
                                    <td>{p.usuario?.nombres} {p.usuario?.apellidos}</td>
                                    <td>{new Date(p.fechaPedido).toLocaleString()}</td>
                                    <td>{p.estado}</td>
                                    <td className="text-end">S/ {p.total.toFixed(2)}</td>
                                    <td>
                                        <button
                                            className="btn btn-outline-primary btn-sm"
                                            onClick={() => navigate(`/panel/pedidos/${p.id}`)}
                                        >
                                            Ver detalle
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default PedidoListPage;
