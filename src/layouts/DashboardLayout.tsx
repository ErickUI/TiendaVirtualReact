import type { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import {
    FiHome,
    FiBox,
    FiUsers,
    FiUserCheck,
    FiShoppingCart,
    FiLogOut,
} from 'react-icons/fi';
import MainNavbar from '../components/common/MainNavbar';

interface DashboardLayoutProps {
    children: ReactNode;
}

function DashboardLayout({ children }: DashboardLayoutProps) {
    const { usuarioActual, logout } = useAuth();
    const esCliente = usuarioActual?.rol === 'CLIENTE';

//este layout es diferente para el dashboard de clientes y el admin

    if (esCliente) {
        return (
            <>
                <MainNavbar />
                <div className="container-xl py-4">
                    {children}
                </div>
            </>
        );
    }

    return (
        <div className="dashboard-wrapper">
            <aside className="dashboard-sidebar">
                <div className="dashboard-sidebar-header">
                    <div className="dashboard-sidebar-title">Panel</div>
                    <div className="small text-gray-400">
                        {usuarioActual?.rol ?? 'Usuario'}
                    </div>
                </div>

                <nav className="dashboard-sidebar-menu nav flex-column">
                    <NavLink
                        to="/panel"
                        className={({ isActive }) =>
                            `nav-link ${isActive ? 'active' : ''}`
                        }
                    >
                        <FiHome />
                        <span>Inicio</span>
                    </NavLink>

                    <NavLink
                        to="/panel/productos"
                        className={({ isActive }) =>
                            `nav-link ${isActive ? 'active' : ''}`
                        }
                    >
                        <FiBox />
                        <span>Productos</span>
                    </NavLink>

                    <NavLink
                        to="/panel/clientes"
                        className={({ isActive }) =>
                            `nav-link ${isActive ? 'active' : ''}`
                        }
                    >
                        <FiUsers />
                        <span>Clientes</span>
                    </NavLink>

                    <NavLink
                        to="/panel/empleados"
                        className={({ isActive }) =>
                            `nav-link ${isActive ? 'active' : ''}`
                        }
                    >
                        <FiUserCheck />
                        <span>Empleados</span>
                    </NavLink>

                    <NavLink
                        to="/panel/pedidos"
                        className={({ isActive }) =>
                            `nav-link ${isActive ? 'active' : ''}`
                        }
                    >
                        <FiShoppingCart />
                        <span>Pedidos</span>
                    </NavLink>
                </nav>

                <div className="dashboard-sidebar-footer">
                    <div className="mb-2 small">
                        {usuarioActual?.nombres} {usuarioActual?.apellidos}
                    </div>
                    <button
                        className="btn btn-outline-light btn-sm d-flex align-items-center gap-2"
                        onClick={logout}
                    >
                        <FiLogOut />
                        <span>Cerrar sesión</span>
                    </button>
                </div>
            </aside>

            <div className="dashboard-main">
                <header className="dashboard-main-header">
                    <h5 className="mb-0">MiTienda – Panel de control</h5>
                </header>

                <section className="dashboard-main-content">{children}</section>
            </div>
        </div>
    );
}

export default DashboardLayout;
