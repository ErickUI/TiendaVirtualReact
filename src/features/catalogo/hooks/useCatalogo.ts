import { useEffect, useState } from 'react';
import type { Producto } from '../../../models/producto.model';
import { obtenerCatalogo } from '../services/catalogo.service';

export function useCatalogo() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cargar = async () => {
    setCargando(true);
    setError(null);
    try {
      const data = await obtenerCatalogo();
      setProductos(data);
    } catch {
      setError('No se pudo cargar el catálogo');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    void cargar();
  }, []);

  return { productos, cargando, error, refetch: cargar };
}
