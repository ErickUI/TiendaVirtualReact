import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Usuario } from '../../../models/usuario.model';
import { obtenerClientes, eliminarCliente } from '../services/cliente.service';

function ClienteListPage() {
    const [clientes, setClientes] = useState<Usuario[]>([]);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const cargar = async () => {
        setCargando(true);
        setError(null);
        try {
            const data = await obtenerClientes();
            setClientes(data);
        } catch {
            setError('No se pudo cargar la lista de clientes');
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        void cargar();
    }, []);

    const manejarEliminar = async (id: number | string) => {
        if (!window.confirm('¿Eliminar cliente?')) return;
        try {
            await eliminarCliente(id);
            await cargar();
        } catch {
            alert('No se pudo eliminar el cliente');
        }
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 className="mb-0">Clientes</h3>
                <button
                    className="btn btn-primary btn-sm"
                    onClick={() => navigate('/panel/clientes/nuevo')}
                >
                    Nuevo cliente
                </button>
            </div>

            {cargando && <p>Cargando...</p>}
            {error && <div className="alert alert-danger">{error}</div>}

            {!cargando && !error && clientes.length === 0 && (
                <p className="text-muted">No hay clientes registrados.</p>
            )}

            {!cargando && !error && clientes.length > 0 && (
                <div className="table-responsive">
                    <table className="table table-sm table-striped align-middle">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombres</th>
                                <th>Correo</th>
                                <th>Teléfono</th>
                                <th>Estado</th>
                                <th style={{ width: 140 }}>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clientes.map((c) => (
                                <tr key={c.id}>
                                    <td>{c.id}</td>
                                    <td>{c.nombres} {c.apellidos}</td>
                                    <td>{c.correo}</td>
                                    <td>{c.telefono}</td>
                                    <td>{c.activo ? 'ACTIVO' : 'INACTIVO'}</td>
                                    <td>
                                        <div className="btn-group btn-group-sm">
                                            <button
                                                className="btn btn-outline-secondary"
                                                onClick={() => navigate(`/panel/clientes/${c.id}/editar`)}
                                            >
                                                Editar
                                            </button>
                                            <button
                                                className="btn btn-outline-danger"
                                                onClick={() => manejarEliminar(c.id)}
                                            >
                                                Eliminar
                                            </button>
                                        </div>
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

export default ClienteListPage;
