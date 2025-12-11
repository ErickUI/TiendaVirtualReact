// src/features/empleados/pages/EmpleadoListPage.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Asegúrate de tener este modelo definido, o cámbialo a 'any' si aún no lo tienes
import type { Empleado } from '../../../models/empleado.model';
import { obtenerEmpleados, eliminarEmpleado } from '../services/empleado.service';

function EmpleadoListPage() {
    const [empleados, setEmpleados] = useState<Empleado[]>([]);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const cargar = async () => {
        setCargando(true);
        setError(null);
        try {
            const data = await obtenerEmpleados();
            setEmpleados(data);
        } catch {
            setError('No se pudo cargar la lista de empleados');
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        void cargar();
    }, []);

    const manejarEliminar = async (id: number | string) => {
        if (!window.confirm('¿Estás seguro de eliminar este empleado?')) return;
        try {
            await eliminarEmpleado(id);
            await cargar();
        } catch {
            alert('No se pudo eliminar el empleado');
        }
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 className="mb-0">Gestión de Empleados</h3>
                <button
                    className="btn btn-primary btn-sm"
                    onClick={() => navigate('/panel/empleados/nuevo')}
                >
                    Nuevo empleado
                </button>
            </div>

            {cargando && <p>Cargando...</p>}
            {error && <div className="alert alert-danger">{error}</div>}

            {!cargando && !error && empleados.length === 0 && (
                <p className="text-muted">No hay empleados registrados.</p>
            )}

            {!cargando && !error && empleados.length > 0 && (
                <div className="table-responsive">
                    <table className="table table-sm table-striped align-middle">
                        <thead>
                            <tr>
                                <th>Doc. Identidad</th>
                                <th>Nombres</th>
                                <th>Cargo</th>
                                <th>Correo Corporativo</th>
                                <th>Estado</th>
                                <th style={{ width: 140 }}>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {empleados.map((emp) => (
                                <tr key={emp.id}>
                                    <td>{emp.documentoIdentidad}</td>
                                    <td>{emp.nombres} {emp.apellidos}</td>
                                    <td>
                                        {/* Badge opcional para resaltar el cargo */}
                                        <span className="badge bg-light text-dark border">
                                            {emp.cargo}
                                        </span>
                                    </td>
                                    <td>{emp.correoCorporativo}</td>
                                    <td>{emp.activo ? 'ACTIVO' : 'INACTIVO'}</td>
                                    <td>
                                        <div className="btn-group btn-group-sm">
                                            <button
                                                className="btn btn-outline-secondary"
                                                onClick={() => navigate(`/panel/empleados/${emp.id}/editar`)}
                                            >
                                                Editar
                                            </button>
                                            <button
                                                className="btn btn-outline-danger"
                                                onClick={() => manejarEliminar(emp.id)}
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

export default EmpleadoListPage;