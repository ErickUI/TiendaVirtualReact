import type { Producto } from '../../../models/producto.model';
import { Link } from 'react-router-dom';
import { FiShoppingBag } from 'react-icons/fi';

interface Props {
  producto: Producto;
  onAdd: (p: Producto) => void;
}

function ProductCard({ producto, onAdd }: Props) {
  return (
    <div className="product-card h-100">
      {producto.imagenUrl && (
        <img
          src={producto.imagenUrl}
          className="product-card-img"
        />
      )}
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between mb-1">
          <h6 className="product-card-title mb-0">{producto.nombre}</h6>
          <span className="badge bg-success-subtle text-success border border-success-subtle">
            En stock
          </span>
        </div>

        <div className="product-card-category mb-2">
          {producto.categoria?.nombre ?? 'General'}
        </div>

        <p className="text-muted small flex-grow-1 mb-2">
          {producto.descripcion?.slice(0, 80) ?? ''}{producto.descripcion && '...'}
        </p>

        <div className="d-flex justify-content-between align-items-center mt-2">
          <div className="h5 mb-0 text-primary">
            S/ {producto.precio.toFixed(2)}
          </div>
          <div className="btn-group btn-group-sm">
            <button
              type="button"
              className="btn btn-primary d-flex align-items-center gap-1"
              onClick={() => onAdd(producto)}
            >
              <FiShoppingBag />
              <span>Agregar</span>
            </button>
            <Link
              to={`/catalogo/producto/${producto.id}`}
              className="btn btn-outline-secondary"
            >
              Ver
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;

