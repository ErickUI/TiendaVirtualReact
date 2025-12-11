import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import type { Producto } from '../../../models/producto.model';
import {
    crearProducto,
    obtenerProductoPorId,
    actualizarProducto,
} from '../services/product.service';

type FormProducto = {
    nombre: string;
    descripcion?: string;
    precio: number;
    stock: number;
    sku?: string;
    imagenUrl?: string;
    categoriaId: number;
    estado: 'ACTIVO' | 'INACTIVO';
};

function ProductFormPage() {
    const { id } = useParams<{ id: string }>();
    const esEdicion = Boolean(id);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormProducto>({
        defaultValues: {
            nombre: '',
            descripcion: '',
            precio: 0,
            stock: 0,
            sku: '',
            imagenUrl: '',
            categoriaId: 1,
            estado: 'ACTIVO',
        },
    });

    const [cargando, setCargando] = useState<boolean>(false);
    const [guardando, setGuardando] = useState<boolean>(false);
    const [errorCarga, setErrorCarga] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const cargarProducto = async () => {
            if (!id) return;
            setCargando(true);
            setErrorCarga(null);
            try {
                const producto = await obtenerProductoPorId(id);
                const valores: FormProducto = {
                    nombre: producto.nombre,
                    descripcion: producto.descripcion,
                    precio: Number(producto.precio),
                    stock: Number(producto.stock),
                    sku: producto.sku,
                    imagenUrl: producto.imagenUrl,
                    categoriaId: Number(producto.categoriaId),
                    estado: producto.estado,
                };
                reset(valores);
            } catch {
                setErrorCarga('No se pudo cargar el producto');
            } finally {
                setCargando(false);
            }
        };

        void cargarProducto();
    }, [id, reset]);

    const onSubmit = async (data: FormProducto) => {
        setGuardando(true);
        try {
            const payload: Partial<Producto> = {
                nombre: data.nombre,
                descripcion: data.descripcion,
                precio: Number(data.precio),
                stock: Number(data.stock),
                sku: data.sku,
                imagenUrl: data.imagenUrl,
                categoriaId: Number(data.categoriaId),
                estado: data.estado,
            };

            if (esEdicion && id) {
                await actualizarProducto(id, payload);
            } else {
                await crearProducto(payload as Producto);
            }
            navigate('/panel/productos');
        } catch {
            alert('Ocurrió un error al guardar el producto');
        } finally {
            setGuardando(false);
        }
    };

    return (
        <div className="container-fluid">
            <h3 className="mb-3">
                {esEdicion ? 'Editar producto' : 'Nuevo producto'}
            </h3>

            {cargando && <p>Cargando datos...</p>}
            {errorCarga && <div className="alert alert-danger">{errorCarga}</div>}

            {!cargando && (
                <form
                    className="row g-3"
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                >
                    <div className="col-md-6">
                        <label className="form-label">Nombre</label>
                        <input
                            className={`form-control ${errors.nombre ? 'is-invalid' : ''
                                }`}
                            {...register('nombre', {
                                required: 'El nombre es obligatorio',
                            })}
                        />
                        {errors.nombre && (
                            <div className="invalid-feedback">
                                {errors.nombre.message}
                            </div>
                        )}
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">SKU</label>
                        <input className="form-control" {...register('sku')} />
                    </div>

                    <div className="col-12">
                        <label className="form-label">Descripción</label>
                        <textarea
                            className="form-control"
                            rows={3}
                            {...register('descripcion')}
                        />
                    </div>

                    <div className="col-md-4">
                        <label className="form-label">Precio</label>
                        <input
                            type="number"
                            step="0.01"
                            className={`form-control ${errors.precio ? 'is-invalid' : ''
                                }`}
                            {...register('precio', {
                                valueAsNumber: true,
                                required: 'El precio es obligatorio',
                                min: { value: 0, message: 'El precio no puede ser negativo' },
                            })}
                        />
                        {errors.precio && (
                            <div className="invalid-feedback">
                                {errors.precio.message}
                            </div>
                        )}
                    </div>

                    <div className="col-md-4">
                        <label className="form-label">Stock</label>
                        <input
                            type="number"
                            className={`form-control ${errors.stock ? 'is-invalid' : ''
                                }`}
                            {...register('stock', {
                                valueAsNumber: true,
                                required: 'El stock es obligatorio',
                                min: { value: 0, message: 'El stock no puede ser negativo' },
                            })}
                        />
                        {errors.stock && (
                            <div className="invalid-feedback">
                                {errors.stock.message}
                            </div>
                        )}
                    </div>

                    <div className="col-md-4">
                        <label className="form-label">Categoría (id)</label>
                        <input
                            type="number"
                            className="form-control"
                            {...register('categoriaId', { valueAsNumber: true })}
                        />
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Imagen (URL)</label>
                        <input
                            className="form-control"
                            {...register('imagenUrl')}
                        />
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Estado</label>
                        <select className="form-select" {...register('estado')}>
                            <option value="ACTIVO">ACTIVO</option>
                            <option value="INACTIVO">INACTIVO</option>
                        </select>
                    </div>

                    <div className="col-12 d-flex justify-content-between mt-3">
                        <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={() => navigate('/panel/productos')}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={guardando}
                        >
                            {guardando ? 'Guardando...' : 'Guardar'}
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}

export default ProductFormPage;
