// src/features/catalogo/components/ProductList.tsx
import { useNavigate } from 'react-router-dom';
import type { Producto } from '../../../models/producto.model';

interface ProductListProps {
  productos: Producto[];
  onAdd: (producto: Producto) => void;
  mostrarVer?: boolean;
}

function ProductList({ productos, onAdd, mostrarVer = true }: ProductListProps) {
  const navigate = useNavigate();

  const irADetalle = (id: string | number) => {
    navigate(`/catalogo/${id}`);
  };

  return (
    <div className="row g-3">
      {productos.map((p) => {
        const precioNumber = Number(p.precio ?? 0);

        return (
          <div key={p.id} className="col-12 col-sm-6 col-lg-3">
            <div className="card h-100 shadow-sm product-card">
              <div className="ratio ratio-4x3">
                <img
                  src={p.imagenUrl}
                  alt={p.nombre}
                  className="card-img-top object-fit-cover"
                />
              </div>

              <div className="card-body d-flex flex-column">
                <h6 className="card-title text-truncate mb-1">{p.nombre}</h6>
                <p className="card-text text-muted small mb-2">
                  General
                </p>

                <div className="mb-2">
                  <span className="fw-semibold text-primary">
                    S/ {precioNumber.toFixed(2)}
                  </span>
                </div>

                <div className="mt-auto d-flex justify-content-between align-items-center gap-2">
                  <button
                    type="button"
                    className="btn btn-primary btn-sm flex-grow-1"
                    onClick={() => onAdd(p)}
                  >
                    Agregar
                  </button>

                  {mostrarVer && (
                    <button
                      type="button"
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => irADetalle(p.id)}
                    >
                      Ver
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ProductList;
