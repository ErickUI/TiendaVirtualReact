import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import MainNavbar from '../components/common/MainNavbar';

interface PublicLayoutProps {
  children: ReactNode;
}
//en este apartado principalmente es para que no se muestre
//el navbar en las paginas de login y registro, pero si en las demas paginas

const RUTAS_SIN_NAV = ['/login', '/registro'];

function PublicLayout({ children }: PublicLayoutProps) {
  const { pathname } = useLocation();
  const mostrarNavbar = !RUTAS_SIN_NAV.includes(pathname);

  return (
    <>
      {mostrarNavbar && <MainNavbar />}

      <div className={mostrarNavbar ? 'public-layout-content' : ''}>
        {children}
      </div>
    </>
  );
}

export default PublicLayout;