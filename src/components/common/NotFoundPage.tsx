import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="container py-5 text-center">
      <h1>404</h1>
      <p className="lead">La página que buscas no existe.</p>
      <Link to="/" className="btn btn-primary">Ir al inicio</Link>
    </div>
  );
}

export default NotFoundPage;
