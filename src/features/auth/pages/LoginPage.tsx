import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import type { CredencialesLogin } from '../../../models/auth.model';
import { useAuth } from '../../../hooks/useAuth';
import { FiLock, FiMail } from 'react-icons/fi';

function LoginPage() {
    const { register, handleSubmit, formState: { errors } } = useForm<CredencialesLogin>();
    const { login, cargandoAuth, usuarioActual } = useAuth();
    const [errorGeneral, setErrorGeneral] = useState<string | null>(null);
    const navigate = useNavigate();

    if (usuarioActual) {
        return <Navigate to="/panel" replace />;
    }

    const onSubmit = async (data: CredencialesLogin) => {
        setErrorGeneral(null);
        try {
            await login(data);
            navigate('/panel', { replace: true });
        } catch (error: any) {
            setErrorGeneral(error.message || 'No se pudo iniciar sesión');
        }
    };

    return (
        <div className="auth-page">
            <div className="d-none d-md-flex col-md-6 col-lg-7 auth-hero p-5 align-items-center">
                <div className="auth-hero-content">
                    <h1 className="mb-3">Bienvenido a TIENDA UTP WEEB</h1>
                    <p className="mb-4 text-sm">
                        Un espacio donde encontraras produdctos tecnologicos modernos a un precio
                        accesible.
                    </p>

                </div>
            </div>

            <div className="col-12 col-md-6 col-lg-5 d-flex align-items-center justify-content-center p-4">
                <div className="auth-card w-100" style={{ maxWidth: 420 }}>
                    <h3 className="mb-3 text-center">Ingreso al sistema</h3>
                    <p className="text-muted small mb-4 text-center">
                        Usa tu correo y contraseña registrados para entrar al panel.
                    </p>

                    {errorGeneral && (
                        <div className="alert alert-danger py-2">{errorGeneral}</div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <div className="mb-3">
                            <label className="form-label">Correo</label>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FiMail />
                                </span>
                                <input
                                    type="email"
                                    className={`form-control ${errors.correo ? 'is-invalid' : ''}`}
                                    placeholder="correo@ejemplo.com"
                                    {...register('correo', {
                                        required: 'El correo es obligatorio',
                                        pattern: {
                                            value: /^\S+@\S+$/i,
                                            message: 'Formato de correo no válido',
                                        },
                                    })}
                                />
                                {errors.correo && (
                                    <div className="invalid-feedback">
                                        {errors.correo.message}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Contraseña</label>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <FiLock />
                                </span>
                                <input
                                    type="password"
                                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                    {...register('password', {
                                        required: 'La contraseña es obligatoria',
                                        minLength: {
                                            value: 4,
                                            message: 'Mínimo 4 caracteres',
                                        },
                                    })}
                                />
                                {errors.password && (
                                    <div className="invalid-feedback">
                                        {errors.password.message}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="d-grid gap-2 mt-3">
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={cargandoAuth}
                            >
                                {cargandoAuth ? 'Ingresando...' : 'Ingresar'}
                            </button>
                        </div>
                    </form>

                    <div className="mt-3 text-center">
                        <small>
                            ¿No tienes cuenta?{' '}
                            <Link to="/registro">Regístrate aquí</Link>
                        </small>
                    </div>

                    <div className="mt-3 text-center">
                        <Link to="/">Volver a la tienda</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
