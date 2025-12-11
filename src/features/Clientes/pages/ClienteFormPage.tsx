import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import type { Usuario } from '../../../models/usuario.model';
import {
    crearCliente,
    obtenerClientePorId,
    actualizarCliente,
} from '../services/cliente.service';

type FormCliente = {
    nombres: string;
    apellidos: string;
    correo: string;
    telefono?: string;
    activo: boolean;
};

function ClienteFormPage() {
    const { id } = useParams<{ id: string }>();
    const esEdicion = Boolean(id);
    const navigate = useNavigate();
    const [cargando, setCargando] = useState(false);
    const [errorCarga, setErrorCarga] = useState<string | null>(null);

    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormCliente>({
        defaultValues: { nombres: '', apellidos: '', correo: '', telefono: '', activo: true },
    });

    useEffect(() => {
        const cargar = async () => {
            if (!id) return;
            setCargando(true);
            setErrorCarga(null);
            try {
                const cliente = await obtenerClientePorId(id);
                const valores: FormCliente = {
                    nombres: cliente.nombres,
                    apellidos: cliente.apellidos,
                    correo: cliente.correo,
                    telefono: cliente.telefono,
                    activo: cliente.activo,
                };
                reset(valores);
            } catch {
                setErrorCarga('No se pudo cargar el cliente');
            } finally {
                setCargando(false);
            }
        };
        void cargar();
    }, [id, reset]);

    const onSubmit = async (data: FormCliente) => {
        try {
            if (esEdicion && id) {
                await actualizarCliente(id, data as Partial<Usuario>);
            } else {
                await crearCliente(data as any);
            }
            navigate('/panel/clientes');
        } catch {
            alert('Error al guardar el cliente');
        }
    };

    return (
        <div>
            <h3 className="mb-3">{esEdicion ? 'Editar cliente' : 'Nuevo cliente'}</h3>

            {cargando && <p>Cargando...</p>}
            {errorCarga && <div className="alert alert-danger">{errorCarga}</div>}

            {!cargando && (
                <form className="row g-3" onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="col-md-6">
                        <label className="form-label">Nombres</label>
                        <input
                            className={`form-control ${errors.nombres ? 'is-invalid' : ''}`}
                            {...register('nombres', { required: 'Obligatorio' })}
                        />
                        {errors.nombres && <div className="invalid-feedback">{errors.nombres.message}</div>}
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Apellidos</label>
                        <input
                            className={`form-control ${errors.apellidos ? 'is-invalid' : ''}`}
                            {...register('apellidos', { required: 'Obligatorio' })}
                        />
                        {errors.apellidos && <div className="invalid-feedback">{errors.apellidos.message}</div>}
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Correo</label>
                        <input
                            type="email"
                            className={`form-control ${errors.correo ? 'is-invalid' : ''}`}
                            {...register('correo', { required: 'Obligatorio' })}
                        />
                        {errors.correo && <div className="invalid-feedback">{errors.correo.message}</div>}
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Teléfono</label>
                        <input className="form-control" {...register('telefono')} />
                    </div>
                    <div className="col-12">
                        <div className="form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="activo"
                                {...register('activo')}
                            />
                            <label htmlFor="activo" className="form-check-label">Activo</label>
                        </div>
                    </div>
                    <div className="col-12 d-flex justify-content-between mt-3">
                        <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={() => navigate('/panel/clientes')}
                        >
                            Cancelar
                        </button>
                        <button type="submit" className="btn btn-primary">
                            Guardar
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}

export default ClienteFormPage;
