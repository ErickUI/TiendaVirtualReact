import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { Pedido } from '../../../models/pedido.model';
import { obtenerPedidoPorId, actualizarEstadoPedido } from '../services/pedido.service';

const ESTADOS = ['PENDIENTE', 'PAGADO', 'ENVIADO', 'ENTREGADO', 'CANCELADO'] as const;

function PedidoDetailPage() {
    const { id } = useParams<{ id: string }>();
    const [pedido, setPedido] = useState<Pedido | null>(null);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [cambiando, setCambiando] = useState(false);

    const cargar = async () => {
        if (!id) return;
        setCargando(true);
        setError(null);
        try {
            const data = await obtenerPedidoPorId(id);
            setPedido(data);
        } catch {
            setError('No se pudo cargar el pedido');
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        void cargar();
    }, [id]);

    const cambiarEstado = async (estado: string) => {
        if (!id) return;
        setCambiando(true);
        try {
            const actualizado = await actualizarEstadoPedido(id, estado);
            setPedido(actualizado);
        } catch {
            alert('No se pudo actualizar el estado');
        } finally {
            setCambiando(false);
        }
    };

    if (cargando) return <p>Cargando pedido...</p>;
    if (error) return <div className="alert alert-danger">{error}</div>;
    if (!pedido) return <p>No se encontró el pedido.</p>;

    const total = pedido.detalles?.reduce((acc, det) => acc + det.subtotal, 0) ?? pedido.total;

    return (
        <div>
            <h3 className="mb-3">Detalle del pedido {pedido.codigo}</h3>

            <div className="mb-3">
                <strong>Cliente:</strong> {pedido.usuario?.nombres} {pedido.usuario?.apellidos} <br />
                <strong>Fecha:</strong> {new Date(pedido.fechaPedido).toLocaleString()} <br />
                <strong>Estado:</strong> {pedido.estado}
            </div>

            <div className="mb-3">
                <strong>Dirección de envío:</strong> {pedido.direccionEnvioResumen}
            </div>

            <h5>Productos</h5>
            {pedido.detalles && pedido.detalles.length > 0 ? (
                <table className="table table-sm">
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th className="text-end">Cantidad</th>
                            <th className="text-end">Precio</th>
                            <th className="text-end">Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pedido.detalles.map((d) => (
                            <tr key={d.id}>
                                <td>{d.producto?.nombre ?? d.productoId}</td>
                                <td className="text-end">{d.cantidad}</td>
                                <td className="text-end">S/ {d.precioUnitario.toFixed(2)}</td>
                                <td className="text-end">S/ {d.subtotal.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th colSpan={3} className="text-end">Total</th>
                            <th className="text-end">S/ {total.toFixed(2)}</th>
                        </tr>
                    </tfoot>
                </table>
            ) : (
                <p className="text-muted">No hay detalles registrados.</p>
            )}

            <div className="mt-4">
                <h5>Cambiar estado</h5>
                <div className="btn-group btn-group-sm">
                    {ESTADOS.map((estado) => (
                        <button
                            key={estado}
                            type="button"
                            className={`btn btn-outline-primary ${pedido.estado === estado ? 'active' : ''
                                }`}
                            disabled={cambiando}
                            onClick={() => cambiarEstado(estado)}
                        >
                            {estado}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default PedidoDetailPage;
