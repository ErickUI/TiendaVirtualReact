import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { obtenerProductoCatalogo } from '../services/catalogo.service';
import type { Producto } from '../../../models/producto.model';
import { useCarrito } from '../../carrito/hooks/useCarrito';

function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [producto, setProducto] = useState<Producto | null>(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { agregar } = useCarrito();

  useEffect(() => {
    const cargar = async () => {
      if (!id) return;
      setCargando(true);
      setError(null);
      try {
        const p = await obtenerProductoCatalogo(id);
        setProducto(p);
      } catch {
        setError('No se pudo cargar el producto');
      } finally {
        setCargando(false);
      }
    };
    void cargar();
  }, [id]);

  if (cargando) return <p>Cargando...</p>;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!producto) return <p>No existe el producto.</p>;

  return (
    <div className="container py-4">
      <div className="row g-4">
        <div className="col-md-5">
          {producto.imagenUrl && (
            <img src={producto.imagenUrl} className="img-fluid rounded shadow-sm" />
          )}
        </div>

        <div className="col-md-7">
          <h3>{producto.nombre}</h3>
          <p className="text-muted">{producto.categoria?.nombre}</p>
          <p>{producto.descripcion}</p>

          <h4 className="mt-3">S/ {producto.precio.toFixed(2)}</h4>

          <button className="btn btn-primary mt-3" onClick={() => agregar(producto)}>
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
