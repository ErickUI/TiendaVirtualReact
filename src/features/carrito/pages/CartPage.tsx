import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCarrito } from '../hooks/useCarrito';
import { useCatalogo } from '../../catalogo/hooks/useCatalogo';
import SiteFooter from '../../../components/common/SiteFooter';
import type { Producto } from '../../../models/producto.model';

function CartPage() {
  const { items, agregar, eliminar, vaciar } = useCarrito();
  const { productos } = useCatalogo();
  const navigate = useNavigate();

  const total = items.reduce(
    (acc, item) => acc + item.producto.precio * item.cantidad,
    0
  );

  const recomendados: Producto[] = useMemo(
    () =>
      productos
        .filter((p) => !items.some((i) => i.producto.id === p.id))
        .slice(0, 4),
    [productos, items]
  );

  const irACheckout = () => {
    if (items.length === 0) return;
    navigate('/checkout');
  };

  const manejarAgregarRecomendado = (producto: Producto) => {
    agregar(producto);
  };

  const manejarEliminar = (productoId: number | string) => {
    eliminar(productoId);
  };

  return (
    <div className="cart-page">
      <div className="container-xl cart-page-main py-4">
        <div className="row g-3 mb-4">
          <div className="col-md-8">
            <div className="cart-banner-card">
              <div className="cart-banner-icon">
                <span className="cart-banner-cart-icon">🛒</span>
              </div>
              <div>
                <h6 className="mb-1">
                  Agrega productos y consigue envío gratis.
                </h6>
                <p className="mb-0 small text-muted">
                  Para obtener envío gratis, suma productos de la tienda a tu
                  carrito.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="cart-summary-card">
              <h6 className="mb-3">Resumen de compra</h6>

              {items.length === 0 ? (
                <p className="small text-muted mb-3">
                  Aquí verás los importes de tu compra una vez que agregues
                  productos.
                </p>
              ) : (
                <>
                  <div className="d-flex justify-content-between small mb-1">
                    <span>Subtotal</span>
                    <span>S/ {total.toFixed(2)}</span>
                  </div>
                  <div className="d-flex justify-content-between small mb-3">
                    <span>Envío estimado</span>
                    <span>Gratis</span>
                  </div>

                  <hr className="my-2" />

                  <div className="d-flex justify-content-between fw-semibold mb-3">
                    <span>Total</span>
                    <span>S/ {total.toFixed(2)}</span>
                  </div>
                </>
              )}

              <button
                type="button"
                className="btn btn-primary w-100"
                disabled={items.length === 0}
                onClick={irACheckout}
              >
                Confirmar compra
              </button>

              {items.length > 0 && (
                <button
                  type="button"
                  className="btn btn-link w-100 mt-2 small p-0"
                  onClick={vaciar}
                >
                  Vaciar carrito
                </button>
              )}
            </div>
          </div>
        </div>

        {items.length > 0 && (
          <div className="row mb-4">
            <div className="col-12">
              <h5 className="mb-3">Productos en tu carrito</h5>

              <div className="cart-items-list">
                {items.map((item) => (
                  <div
                    key={item.producto.id}
                    className="cart-item-card mb-2"
                  >
                    {item.producto.imagenUrl && (
                      <img
                        src={item.producto.imagenUrl}
                        alt={item.producto.nombre}
                        className="cart-item-img"
                      />
                    )}

                    <div className="cart-item-body">
                      <div className="d-flex justify-content-between">
                        <div>
                          <div className="fw-semibold">
                            {item.producto.nombre}
                          </div>
                          <div className="small text-muted">
                            {item.producto.categoria?.nombre ?? 'General'}
                          </div>
                          <div className="small text-muted">
                            Cantidad: {item.cantidad}
                          </div>
                        </div>
                        <div className="text-end">
                          <div className="fw-semibold text-primary">
                            S/ {(item.producto.precio * item.cantidad).toFixed(2)}
                          </div>
                          <div className="small text-muted">
                            S/ {item.producto.precio.toFixed(2)} c/u
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        className="btn btn-link btn-sm text-danger p-0 mt-1"
                        onClick={() => manejarEliminar(item.producto.id)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="row">
          <div className="col-12">
            <h5 className="mb-3">Productos que te interesaron</h5>

            {recomendados.length === 0 && (
              <p className="text-muted small">
                No hay productos recomendados en este momento.
              </p>
            )}

            {recomendados.length > 0 && (
              <div className="cart-reco-grid">
                {recomendados.map((p) => (
                  <div key={p.id} className="cart-reco-card">
                    {p.imagenUrl && (
                      <img
                        src={p.imagenUrl}
                        alt={p.nombre}
                        className="cart-reco-img"
                      />
                    )}
                    <div className="cart-reco-body">
                      <div className="fw-semibold small mb-1">
                        {p.nombre}
                      </div>
                      <div className="small text-muted mb-2">
                        {(p.descripcion ?? '').slice(0, 70)}
                        {p.descripcion && '...'}
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="fw-semibold text-primary">
                          S/ {p.precio.toFixed(2)}
                        </span>
                        <button
                          type="button"
                          className="btn btn-outline-primary btn-sm"
                          onClick={() => manejarAgregarRecomendado(p)}
                        >
                          Agregar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}

export default CartPage;
