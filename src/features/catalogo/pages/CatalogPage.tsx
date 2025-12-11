import { useEffect, useMemo, useState } from 'react';
import { useCatalogo } from '../hooks/useCatalogo';
import { useCarrito } from '../../carrito/hooks/useCarrito';
import type { Producto } from '../../../models/producto.model';

function CatalogPage() {
  const { productos, cargando, error } = useCatalogo();
  const { agregar } = useCarrito();

  const [busqueda, setBusqueda] = useState('');
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState<string[]>([]);
  const [precioMin, setPrecioMin] = useState(0);
  const [precioMax, setPrecioMax] = useState(0);
  const [limiteMin, setLimiteMin] = useState(0);
  const [limiteMax, setLimiteMax] = useState(0);

  useEffect(() => {
    if (productos.length === 0) return;
    const precios = productos.map((p) => p.precio);
    const min = Math.min(...precios);
    const max = Math.max(...precios);
    setLimiteMin(min);
    setLimiteMax(max);
    setPrecioMin(min);
    setPrecioMax(max);
  }, [productos]);

  const categorias = useMemo(
    () =>
      Array.from(
        new Set(
          productos.map((p) => p.categoria?.nombre ?? 'General'),
        ),
      ),
    [productos],
  );

  const toggleCategoria = (nombre: string) => {
    setCategoriasSeleccionadas((prev) =>
      prev.includes(nombre)
        ? prev.filter((c) => c !== nombre)
        : [...prev, nombre],
    );
  };

  const productosFiltrados: Producto[] = useMemo(
    () =>
      productos.filter((p) => {
        const nombre = p.nombre.toLowerCase();
        const coincideBusqueda =
          !busqueda ||
          nombre.includes(busqueda.toLowerCase().trim());
        const categoria = p.categoria?.nombre ?? 'General';
        const coincideCategoria =
          categoriasSeleccionadas.length === 0 ||
          categoriasSeleccionadas.includes(categoria);
        const coincidePrecio =
          p.precio >= precioMin && p.precio <= precioMax;
        return coincideBusqueda && coincideCategoria && coincidePrecio;
      }),
    [productos, busqueda, categoriasSeleccionadas, precioMin, precioMax],
  );

  const manejarAgregar = (producto: Producto) => {
    agregar(producto);
  };

  return (
    <div className="catalog-page">
      <div className="container-xl">
        <div className="row mb-3 align-items-center">
          <div className="col-lg-6 col-md-12">
            <h3 className="mb-0">Catálogo de productos</h3>
            <p className="text-muted small mb-0">
              Explora los productos disponibles y filtra según tus preferencias.
            </p>
          </div>
          <div className="col-lg-6 col-md-12 mt-3 mt-lg-0">
            <div className="catalog-search d-flex justify-content-end">
              <input
                type="search"
                className="form-control form-control-sm w-100 w-md-75 w-lg-50"
                placeholder="Buscar por nombre..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="row">

          <aside className="col-lg-3 mb-4">
            <div className="catalog-filters card shadow-sm">
              <div className="card-body">
                <h6 className="text-uppercase text-muted mb-3">
                  Filtrar por
                </h6>

                <div className="mb-4">
                  <h6 className="mb-2">Categoría</h6>
                  {categorias.map((cat) => (
                    <div className="form-check" key={cat}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={`cat-${cat}`}
                        checked={categoriasSeleccionadas.includes(cat)}
                        onChange={() => toggleCategoria(cat)}
                      />
                      <label
                        className="form-check-label small"
                        htmlFor={`cat-${cat}`}
                      >
                        {cat}
                      </label>
                    </div>
                  ))}
                  {categoriasSeleccionadas.length > 0 && (
                    <button
                      type="button"
                      className="btn btn-link p-0 mt-1 small"
                      onClick={() => setCategoriasSeleccionadas([])}
                    >
                      Limpiar categorías
                    </button>
                  )}
                </div>

                <div>
                  <h6 className="mb-2">Precio</h6>
                  <div className="small text-muted mb-2">
                    S/ {precioMin.toFixed(2)} – S/ {precioMax.toFixed(2)}
                  </div>

                  <div className="range-slider">
                    <input
                      type="range"
                      min={limiteMin}
                      max={limiteMax}
                      value={precioMin}
                      onChange={(e) => {
                        const valor = Number(e.target.value);
                        setPrecioMin(
                          valor > precioMax ? precioMax : valor,
                        );
                      }}
                    />
                    <input
                      type="range"
                      min={limiteMin}
                      max={limiteMax}
                      value={precioMax}
                      onChange={(e) => {
                        const valor = Number(e.target.value);
                        setPrecioMax(
                          valor < precioMin ? precioMin : valor,
                        );
                      }}
                    />
                  </div>

                  <div className="d-flex gap-2 mt-2">
                    <input
                      type="number"
                      className="form-control form-control-sm"
                      value={precioMin.toFixed(2)}
                      onChange={(e) =>
                        setPrecioMin(
                          Math.min(
                            Number(e.target.value) || limiteMin,
                            precioMax,
                          ),
                        )
                      }
                    />
                    <input
                      type="number"
                      className="form-control form-control-sm"
                      value={precioMax.toFixed(2)}
                      onChange={(e) =>
                        setPrecioMax(
                          Math.max(
                            Number(e.target.value) || limiteMax,
                            precioMin,
                          ),
                        )
                      }
                    />
                  </div>

                  <button
                    type="button"
                    className="btn btn-link p-0 mt-2 small"
                    onClick={() => {
                      setPrecioMin(limiteMin);
                      setPrecioMax(limiteMax);
                    }}
                  >
                    Restablecer rango
                  </button>
                </div>
              </div>
            </div>
          </aside>

          <section className="col-lg-9">
            {cargando && <p>Cargando productos...</p>}
            {error && <div className="alert alert-danger">{error}</div>}

            {!cargando && !error && productosFiltrados.length === 0 && (
              <p className="text-muted">
                No se encontraron productos con los filtros actuales.
              </p>
            )}

            {!cargando && !error && productosFiltrados.length > 0 && (
              <div className="row g-3">
                {productosFiltrados.map((p) => (
                  <div key={p.id} className="col-sm-6 col-md-4 col-xl-3">

                    <div className="product-card h-100">
                      {p.imagenUrl && (
                        <img
                          src={p.imagenUrl}
                          className="product-card-img"
                        />
                      )}
                      <div className="card-body d-flex flex-column">
                        <div className="d-flex justify-content-between mb-1">
                          <h6 className="product-card-title mb-0">
                            {p.nombre}
                          </h6>
                          <span className="badge bg-success-subtle text-success border border-success-subtle">
                            En stock
                          </span>
                        </div>
                        <div className="product-card-category mb-2">
                          {p.categoria?.nombre ?? 'General'}
                        </div>
                        <p className="text-muted small flex-grow-1 mb-2">
                          {(p.descripcion ?? '').slice(0, 80)}
                          {p.descripcion && '...'}
                        </p>
                        <div className="d-flex justify-content-between align-items-center mt-2">
                          <div className="h6 mb-0 text-primary">
                            S/ {p.precio.toFixed(2)}
                          </div>
                          <button
                            type="button"
                            className="btn btn-primary btn-sm"
                            onClick={() => manejarAgregar(p)}
                          >
                            Agregar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
    
  );
}

export default CatalogPage;
