// src/features/products/pages/ProductListPage.tsx
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { Producto } from '../../../models/producto.model';
import {
    obtenerProductos,
    eliminarProducto,
} from '../services/product.service';

function ProductListPage() {
    const [productos, setProductos] = useState<Producto[]>([]);
    const [cargando, setCargando] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const cargarDatos = async () => {
        setCargando(true);
        setError(null);
        try {
            const data = await obtenerProductos();
            setProductos(data);
        } catch {
            setError('No se pudo cargar la lista de productos');
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        void cargarDatos();
    }, []);

    const manejarEliminar = async (id: number | string) => {
        const confirmar = window.confirm(
            '¿Seguro que deseas eliminar este producto?'
        );
        if (!confirmar) return;

        try {
            await eliminarProducto(id);
            await cargarDatos();
        } catch {
            alert('No se pudo eliminar el producto');
        }
    };

    const manejarEditar = (id: number | string) => {
        navigate(`/panel/productos/${id}/editar`);
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 className="mb-0">Productos</h3>
                <Link to="/panel/productos/nuevo" className="btn btn-primary btn-sm">
                    Nuevo producto
                </Link>
            </div>

            <div className="table-panel">
                <div className="table-panel-header">
                    {cargando && (
                        <p className="text-muted mb-0">Cargando productos...</p>
                    )}
                    {error && (
                        <div className="alert alert-danger mb-2">{error}</div>
                    )}
                </div>
                <div className="table-panel-body">
                    {!cargando && !error && productos.length === 0 && (
                        <p className="text-muted mb-0">No hay productos registrados.</p>
                    )}

                    {!cargando && !error && productos.length > 0 && (
                        <div className="table-responsive">
                            <table className="table table-sm table-hover align-middle">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nombre</th>
                                        <th>Categoría</th>
                                        <th className="text-end">Precio</th>
                                        <th className="text-end">Stock</th>
                                        <th>Estado</th>
                                        <th style={{ width: 150 }}>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productos.map((p) => {
                                        const precioNumber = Number(p.precio ?? 0);

                                        return (
                                            <tr key={p.id}>
                                                <td>{p.id}</td>
                                                <td>{p.nombre}</td>
                                                <td>{p.categoriaId}</td>
                                                <td className="text-end">
                                                    S/ {precioNumber.toFixed(2)}
                                                </td>
                                                <td className="text-end">{p.stock}</td>
                                                <td>
                                                    <span
                                                        className={`badge ${p.estado === 'ACTIVO'
                                                                ? 'bg-success-subtle text-success'
                                                                : 'bg-secondary-subtle text-secondary'
                                                            }`}
                                                    >
                                                        {p.estado}
                                                    </span>
                                                </td>
                                                <td>
                                                    <div className="btn-group btn-group-sm">
                                                        <button
                                                            type="button"
                                                            className="btn btn-outline-secondary"
                                                            onClick={() => manejarEditar(p.id)}
                                                        >
                                                            Editar
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="btn btn-outline-danger"
                                                            onClick={() => manejarEliminar(p.id)}
                                                        >
                                                            Eliminar
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProductListPage;
