import SiteFooter from '../../../components/common/SiteFooter';

function HomePage() {
  return (
    <div className="container py-4">
      <h2 className="mb-3">Bienvenido a MiTienda</h2>
      <p className="text-muted">
        Aquí podrás gestionar productos, clientes, empleados y pedidos, además de ver un catálogo público.
      </p>
      <SiteFooter />
    </div>
  );
}

export default HomePage;
