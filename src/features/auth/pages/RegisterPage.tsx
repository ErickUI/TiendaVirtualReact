import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import type { Usuario } from '../../../models/usuario.model';
import { httpClient } from '../../../core/api/httpClient';
import { endpoints } from '../../../core/api/endpoints';

type FormRegistro = {
  nombres: string;
  apellidos: string;
  correo: string;
  telefono?: string;
  password: string;
};

function RegisterPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormRegistro>();
  const navigate = useNavigate();

  const onSubmit = async (data: FormRegistro) => {
    const nuevoUsuario: Omit<Usuario, 'id' | 'fechaRegistro' | 'rol'> & {
      password: string;
    } = {
      nombres: data.nombres,
      apellidos: data.apellidos,
      correo: data.correo,
      telefono: data.telefono,
      activo: true,
      password: data.password,
    };

    try {
      await httpClient.post(endpoints.usuarios, {
        ...nuevoUsuario,
        rol: 'CLIENTE',
        fechaRegistro: new Date().toISOString(),
      });

      alert('Registro exitoso. Ahora puedes iniciar sesión.');
      navigate('/login');
    } catch (err) {
      alert('No se pudo registrar el usuario');
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center">
      <div className="row w-100 justify-content-center">
        <div className="col-sm-10 col-md-6 col-lg-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h3 className="card-title mb-4 text-center">Registro de cliente</h3>

              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="mb-3">
                  <label className="form-label">Nombres</label>
                  <input
                    className={`form-control ${errors.nombres ? 'is-invalid' : ''}`}
                    {...register('nombres', { required: 'Obligatorio' })}
                  />
                  {errors.nombres && (
                    <div className="invalid-feedback">{errors.nombres.message}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">Apellidos</label>
                  <input
                    className={`form-control ${errors.apellidos ? 'is-invalid' : ''}`}
                    {...register('apellidos', { required: 'Obligatorio' })}
                  />
                  {errors.apellidos && (
                    <div className="invalid-feedback">{errors.apellidos.message}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">Correo</label>
                  <input
                    type="email"
                    className={`form-control ${errors.correo ? 'is-invalid' : ''}`}
                    {...register('correo', { required: 'Obligatorio' })}
                  />
                  {errors.correo && (
                    <div className="invalid-feedback">{errors.correo.message}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">Teléfono</label>
                  <input className="form-control" {...register('telefono')} />
                </div>

                <div className="mb-3">
                  <label className="form-label">Contraseña</label>
                  <input
                    type="password"
                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                    {...register('password', { required: 'Obligatorio', minLength: { value: 4, message: 'Mínimo 4 caracteres' } })}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password.message}</div>
                  )}
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    Registrarme
                  </button>
                </div>
              </form>

              <div className="mt-3 text-center">
                <small>
                  ¿Ya tienes cuenta? <Link to="/login">Ingresa aquí</Link>
                </small>
              </div>
            </div>
          </div>

          <div className="mt-3 text-center">
            <Link to="/">Volver a la tienda</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
