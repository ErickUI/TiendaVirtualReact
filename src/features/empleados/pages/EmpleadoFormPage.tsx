import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
// Asegúrate de tener este modelo o usa 'any' temporalmente si no lo has creado
import {
    crearEmpleado,
    obtenerEmpleadoPorId,
    actualizarEmpleado,
} from '../services/empleado.service';

type FormEmpleado = {
    nombres: string;
    apellidos: string;
    documentoIdentidad: string; // Nuevo campo
    correoCorporativo: string;  // Nuevo campo
    cargo: string;              // Nuevo campo
    telefono?: string;
    activo: boolean;
};

function EmpleadoFormPage() {
    const { id } = useParams<{ id: string }>();
    const esEdicion = Boolean(id);
    const navigate = useNavigate();
    const [cargando, setCargando] = useState(false);
    const [errorCarga, setErrorCarga] = useState<string | null>(null);

    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormEmpleado>({
        defaultValues: {
            nombres: '',
            apellidos: '',
            documentoIdentidad: '',
            correoCorporativo: '',
            cargo: '',
            telefono: '',
            activo: true
        },
    });

    useEffect(() => {
        const cargar = async () => {
            if (!id) return;
            setCargando(true);
            setErrorCarga(null);
            try {
                const empleado = await obtenerEmpleadoPorId(id);
                // Mapeamos los datos que vienen del backend al formulario
                const valores: FormEmpleado = {
                    nombres: empleado.nombres,
                    apellidos: empleado.apellidos,
                    documentoIdentidad: empleado.documentoIdentidad,
                    correoCorporativo: empleado.correoCorporativo,
                    cargo: empleado.cargo,
                    telefono: empleado.telefono,
                    activo: empleado.activo,
                };
                reset(valores);
            } catch {
                setErrorCarga('No se pudo cargar el empleado');
            } finally {
                setCargando(false);
            }
        };
        void cargar();
    }, [id, reset]);

    const onSubmit = async (data: FormEmpleado) => {
        try {
            if (esEdicion && id) {
                await actualizarEmpleado(id, data as any);
            } else {
                await crearEmpleado(data as any);
            }
            navigate('/panel/empleados');
        } catch {
            alert('Error al guardar el empleado');
        }
    };

    return (
        <div>
            <h3 className="mb-3">{esEdicion ? 'Editar empleado' : 'Nuevo empleado'}</h3>

            {cargando && <p>Cargando...</p>}
            {errorCarga && <div className="alert alert-danger">{errorCarga}</div>}

            {!cargando && (
                <form className="row g-3" onSubmit={handleSubmit(onSubmit)} noValidate>
                    {/* Documento de Identidad */}
                    <div className="col-md-4">
                        <label className="form-label">Doc. Identidad</label>
                        <input
                            className={`form-control ${errors.documentoIdentidad ? 'is-invalid' : ''}`}
                            {...register('documentoIdentidad', { required: 'Obligatorio' })}
                        />
                        {errors.documentoIdentidad && <div className="invalid-feedback">{errors.documentoIdentidad.message}</div>}
                    </div>

                    {/* Nombres */}
                    <div className="col-md-4">
                        <label className="form-label">Nombres</label>
                        <input
                            className={`form-control ${errors.nombres ? 'is-invalid' : ''}`}
                            {...register('nombres', { required: 'Obligatorio' })}
                        />
                        {errors.nombres && <div className="invalid-feedback">{errors.nombres.message}</div>}
                    </div>

                    {/* Apellidos */}
                    <div className="col-md-4">
                        <label className="form-label">Apellidos</label>
                        <input
                            className={`form-control ${errors.apellidos ? 'is-invalid' : ''}`}
                            {...register('apellidos', { required: 'Obligatorio' })}
                        />
                        {errors.apellidos && <div className="invalid-feedback">{errors.apellidos.message}</div>}
                    </div>

                    {/* Correo Corporativo */}
                    <div className="col-md-6">
                        <label className="form-label">Correo Corporativo</label>
                        <input
                            type="email"
                            className={`form-control ${errors.correoCorporativo ? 'is-invalid' : ''}`}
                            {...register('correoCorporativo', {
                                required: 'Obligatorio',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: 'Correo inválido'
                                }
                            })}
                        />
                        {errors.correoCorporativo && <div className="invalid-feedback">{errors.correoCorporativo.message}</div>}
                    </div>

                    {/* Cargo */}
                    <div className="col-md-6">
                        <label className="form-label">Cargo</label>
                        <select
                            className={`form-select ${errors.cargo ? 'is-invalid' : ''}`}
                            {...register('cargo', { required: 'Seleccione un cargo' })}
                        >
                            <option value="">Seleccione...</option>
                            <option value="VENDEDOR">Vendedor</option>
                            <option value="ALMACENERO">Almacenero</option>
                            <option value="GERENTE">Gerente</option>
                            <option value="ADMINISTRADOR">Administrador</option>
                        </select>
                        {errors.cargo && <div className="invalid-feedback">{errors.cargo.message}</div>}
                    </div>

                    {/* Teléfono */}
                    <div className="col-md-6">
                        <label className="form-label">Teléfono</label>
                        <input className="form-control" {...register('telefono')} />
                    </div>

                    {/* Checkbox Activo */}
                    <div className="col-12">
                        <div className="form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="activo"
                                {...register('activo')}
                            />
                            <label htmlFor="activo" className="form-check-label">Empleado Activo</label>
                        </div>
                    </div>

                    {/* Botones */}
                    <div className="col-12 d-flex justify-content-between mt-3">
                        <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={() => navigate('/panel/empleados')}
                        >
                            Cancelar
                        </button>
                        <button type="submit" className="btn btn-primary">
                            Guardar Empleado
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}

export default EmpleadoFormPage;