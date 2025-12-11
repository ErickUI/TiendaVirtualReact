import { useForm } from 'react-hook-form';
import { useCarrito } from '../hooks/useCarrito';
import { useAuth } from '../../../hooks/useAuth';
import { crearPedidoDesdeCarrito } from '../../pedidos/services/pedido.service';
import { useNavigate } from 'react-router-dom';

type FormPago = {
    nombreCompleto: string;
    direccion: string;
    ciudad: string;
    referencia?: string;
    numeroTarjeta: string;
    vencimiento: string;
    cvv: string;
};

function CheckoutPage() {
    const { items, vaciar } = useCarrito();
    const { usuarioActual } = useAuth();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<FormPago>();

    const total = items.reduce(
        (acc, item) => acc + item.producto.precio * item.cantidad,
        0
    );

    if (!usuarioActual) return <p>Debes iniciar sesión.</p>;
    if (items.length === 0) return <p>No tienes productos en el carrito.</p>;

    const onSubmit = async (data: FormPago) => {
        const direccionResumen = `${data.direccion}, ${data.ciudad} (${data.referencia ?? 'sin referencia'})`;
        try {
            await crearPedidoDesdeCarrito(
                usuarioActual.id,
                direccionResumen,
                'TARJETA',
                items
            );
            vaciar();
            alert('Tu pedido ha sido generado correctamente.');
            navigate('/panel/mis-pedidos');
        } catch {
            alert('Ocurrió un error al procesar el pedido');
        }
    };

    return (
        <div className="container py-4">
            <h3 className="mb-3">Confirmación de pedido</h3>

            <div className="row g-4">
                <div className="col-md-5">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5>Resumen del pedido</h5>
                            <ul className="list-unstyled small mt-3">
                                {items.map((i) => (
                                    <li key={i.producto.id} className="d-flex justify-content-between mb-1">
                                        <span>{i.producto.nombre} x {i.cantidad}</span>
                                        <span>S/ {(i.producto.precio * i.cantidad).toFixed(2)}</span>
                                    </li>
                                ))}
                            </ul>
                            <hr />
                            <div className="d-flex justify-content-between fw-semibold">
                                <span>Total</span>
                                <span>S/ {total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-7">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5>Datos de envío y pago</h5>

                            <form className="row g-3 mt-2" onSubmit={handleSubmit(onSubmit)} noValidate>
                                <div className="col-12">
                                    <label className="form-label">Nombre completo</label>
                                    <input
                                        className={`form-control ${errors.nombreCompleto ? 'is-invalid' : ''}`}
                                        {...register('nombreCompleto', { required: 'Obligatorio' })}
                                    />
                                    {errors.nombreCompleto && (
                                        <div className="invalid-feedback">{errors.nombreCompleto.message}</div>
                                    )}
                                </div>
                                <div className="col-12">
                                    <label className="form-label">Dirección</label>
                                    <input
                                        className={`form-control ${errors.direccion ? 'is-invalid' : ''}`}
                                        {...register('direccion', { required: 'Obligatorio' })}
                                    />
                                    {errors.direccion && (
                                        <div className="invalid-feedback">{errors.direccion.message}</div>
                                    )}
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Ciudad</label>
                                    <input
                                        className={`form-control ${errors.ciudad ? 'is-invalid' : ''}`}
                                        {...register('ciudad', { required: 'Obligatorio' })}
                                    />
                                    {errors.ciudad && (
                                        <div className="invalid-feedback">{errors.ciudad.message}</div>
                                    )}
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Referencia (opcional)</label>
                                    <input
                                        className="form-control"
                                        {...register('referencia')}
                                    />
                                </div>

                                <div className="col-12">
                                    <label className="form-label">Número de tarjeta</label>
                                    <input
                                        className={`form-control ${errors.numeroTarjeta ? 'is-invalid' : ''}`}
                                        {...register('numeroTarjeta', { required: 'Obligatorio' })}
                                    />
                                    {errors.numeroTarjeta && (
                                        <div className="invalid-feedback">{errors.numeroTarjeta.message}</div>
                                    )}
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Vencimiento (MM/AA)</label>
                                    <input
                                        className={`form-control ${errors.vencimiento ? 'is-invalid' : ''}`}
                                        {...register('vencimiento', { required: 'Obligatorio' })}
                                    />
                                    {errors.vencimiento && (
                                        <div className="invalid-feedback">{errors.vencimiento.message}</div>
                                    )}
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">CVV</label>
                                    <input
                                        className={`form-control ${errors.cvv ? 'is-invalid' : ''}`}
                                        {...register('cvv', { required: 'Obligatorio' })}
                                    />
                                    {errors.cvv && (
                                        <div className="invalid-feedback">{errors.cvv.message}</div>
                                    )}
                                </div>

                                <div className="col-12 d-flex justify-content-end mt-2">
                                    <button type="submit" className="btn btn-primary">
                                        Pagar y generar pedido
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CheckoutPage;
