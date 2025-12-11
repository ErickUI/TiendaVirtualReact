import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import {
  obtenerResumenDashboard,
  type ResumenDashboard,
} from '../services/dashboard.service';
import DashboardStatsPanel from '../components/DashboardStatsPanel';
import VentasChart from '../components/VentasChart';
import { useCatalogo } from '../../catalogo/hooks/useCatalogo';
import ProductList from '../../catalogo/components/ProductList';
import { useCarrito } from '../../carrito/hooks/useCarrito';
import { actualizarPerfilUsuario } from '../../usuarios/services/usuario.service';

function DashboardHomePage() {
  const { usuarioActual } = useAuth();
  const esCliente = usuarioActual?.rol === 'CLIENTE';

  if (esCliente) {
    return <DashboardClienteHome />;
  }
  return <DashboardAdminHome />;
}

function DashboardAdminHome() {
  const [resumen, setResumen] = useState<ResumenDashboard | null>(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cargar = async () => {
      setCargando(true);
      setError(null);
      try {
        const data = await obtenerResumenDashboard();
        setResumen(data);
      } catch {
        setError('No se pudo cargar el resumen del dashboard');
      } finally {
        setCargando(false);
      }
    };
    void cargar();
  }, []);

  return (
    <div>
      <h2 className="mb-3">Dashboard principal</h2>

      {cargando && <p>Cargando resumen...</p>}
      {error && <div className="alert alert-danger">{error}</div>}

      {resumen && (
        <>
          <DashboardStatsPanel resumen={resumen} />
          <VentasChart resumen={resumen} />
        </>
      )}
    </div>
  );
}


interface FormState {
  nombres: string;
  apellidos: string;
  correo: string;
  telefono: string;
}

function DashboardClienteHome() {
  const { usuarioActual, actualizarSesion } = useAuth();
  const { productos } = useCatalogo();
  const { agregar } = useCarrito();

  const [form, setForm] = useState<FormState>({
    nombres: '',
    apellidos: '',
    correo: '',
    telefono: '',
  });
  const [guardado, setGuardado] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!usuarioActual) return;
    setForm({
      nombres: usuarioActual.nombres ?? '',
      apellidos: usuarioActual.apellidos ?? '',
      correo: usuarioActual.correo ?? '',
      telefono: usuarioActual.telefono ?? '',
    });
  }, [usuarioActual]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setGuardado(false);
    setError(null);
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!usuarioActual) return;

    setGuardando(true);
    setGuardado(false);
    setError(null);

    try {
      const usuarioActualizado = await actualizarPerfilUsuario(usuarioActual.id, {
        nombres: form.nombres,
        apellidos: form.apellidos,
        correo: form.correo,
        telefono: form.telefono,
      });

      actualizarSesion({
        nombres: usuarioActualizado.nombres,
        apellidos: usuarioActualizado.apellidos,
        correo: usuarioActualizado.correo,
        telefono: usuarioActualizado.telefono,
      });

      setGuardado(true);
    } catch (err) {
      console.error(err);
      setError('No se pudo guardar los cambios. Intenta nuevamente.');
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div>
      <nav className="mb-3 small text-muted">
        <span className="me-1">Mi perfil</span>
        <span className="mx-1">›</span>
        <span className="text-body">Datos de tu cuenta</span>
      </nav>

      <h2 className="mb-3">Datos de tu cuenta</h2>
      <p className="text-muted mb-4">
        Actualiza tus datos personales y de contacto. Estos datos se usarán para tus compras.
      </p>

      <form onSubmit={handleSubmit} className="account-form-grid mb-4">
        <div className="account-card">
          <div className="account-card-header">
            <div>
              <span className="badge bg-warning-subtle text-warning me-2">!</span>
              <span className="fw-semibold">Datos personales</span>
            </div>
          </div>

          <div className="account-card-body">
            <div className="mb-3">
              <label className="form-label small">Nombres</label>
              <input
                type="text"
                name="nombres"
                className="form-control"
                value={form.nombres}
                onChange={handleChange}
                placeholder="Ingresa tus nombres"
              />
            </div>
            <div className="mb-0">
              <label className="form-label small">Apellidos</label>
              <input
                type="text"
                name="apellidos"
                className="form-control"
                value={form.apellidos}
                onChange={handleChange}
                placeholder="Ingresa tus apellidos"
              />
            </div>
          </div>
        </div>

        <div className="account-card">
          <div className="account-card-header">
            <div>
              <span className="badge bg-warning-subtle text-warning me-2">!</span>
              <span className="fw-semibold">Datos de contacto</span>
            </div>
          </div>

          <div className="account-card-body">
            <div className="mb-3">
              <label className="form-label small">Correo electrónico</label>
              <input
                type="email"
                name="correo"
                className="form-control"
                value={form.correo}
                onChange={handleChange}
                placeholder="ejemplo@correo.com"
              />
            </div>
            <div className="mb-0">
              <label className="form-label small">Teléfono</label>
              <input
                type="tel"
                name="telefono"
                className="form-control"
                value={form.telefono}
                onChange={handleChange}
                placeholder="Número de teléfono"
              />
            </div>
          </div>
        </div>

        <div className="account-actions">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={guardando}
          >
            {guardando ? 'Guardando...' : 'Guardar cambios'}
          </button>
          {guardado && !error && (
            <span className="text-success small ms-3">
              Cambios guardados correctamente.
            </span>
          )}
          {error && (
            <span className="text-danger small ms-3">
              {error}
            </span>
          )}
        </div>
      </form>

      <h5 className="mb-3">Productos recomendados para ti</h5>
      <ProductList
        productos={productos.slice(0, 4)}
        onAdd={agregar}
        mostrarVer={false}
      />

    </div>
  );
}

export default DashboardHomePage;
