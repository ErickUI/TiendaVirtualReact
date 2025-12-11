import { Link, NavLink } from 'react-router-dom';
import { useCarrito } from '../../features/carrito/hooks/useCarrito';
import { useAuth } from '../../hooks/useAuth';

function MainNavbar() {
    const { items } = useCarrito();
    const { usuarioActual, logout } = useAuth();

    const totalItems = items.reduce((acc, i) => acc + i.cantidad, 0);

    return (
        <nav className="navbar navbar-expand-lg nav-principal fixed-top">
            <div className="container">
                <Link className="navbar-brand logo-tienda" to="/">
                    Tienda UTP Web
                </Link>

                <button
                    className="navbar-toggler boton-menu"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#menuPrincipal"
                >
                    <span className="linea" />
                    <span className="linea" />
                    <span className="linea" />
                </button>

                <div className="collapse navbar-collapse" id="menuPrincipal">
                    <ul className="navbar-nav ms-auto lista-menu">
                        <li className="nav-item">
                            <a className="nav-link item-menu" href="/#inicio">
                                Inicio
                            </a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link item-menu" href="/#destacados">
                                Destacados
                            </a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link item-menu" href="/#categorias">
                                Categorías
                            </a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link item-menu" href="/#novedades">
                                Novedosos
                            </a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link item-menu" href="/#AcercaDe">
                                Acerca de
                            </a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link item-menu" href="/#contacto">
                                Contáctenos
                            </a>
                        </li>

                        <li className="nav-item">
                            <NavLink
                                to="/catalogo"
                                className={({ isActive }) =>
                                    `nav-link item-menu ${isActive ? 'active' : ''}`
                                }
                            >
                                Catálogo
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink
                                to="/carrito"
                                className={({ isActive }) =>
                                    `nav-link item-menu d-flex align-items-center ${isActive ? 'active' : ''
                                    }`
                                }
                            >
                                <i className="bi bi-cart3 me-1" />
                                <span>Carrito</span>
                                {totalItems > 0 && (
                                    <span className="badge bg-primary ms-1">{totalItems}</span>
                                )}
                            </NavLink>
                        </li>

                        {!usuarioActual && (
                            <li className="nav-item">
                                <NavLink
                                    to="/login"
                                    className={({ isActive }) =>
                                        `nav-link item-menu ${isActive ? 'active' : ''}`
                                    }
                                >
                                    Ingresar
                                </NavLink>
                            </li>
                        )}

                        {usuarioActual && (
                            <>
                                <li className="nav-item">
                                    <NavLink
                                        to="/panel"
                                        className={({ isActive }) =>
                                            `nav-link item-menu ${isActive ? 'active' : ''}`
                                        }
                                    >
                                        Mi cuenta
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <button
                                        type="button"
                                        className="nav-link item-menu btn btn-link p-0 border-0"
                                        onClick={logout}
                                    >
                                        Salir
                                    </button>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default MainNavbar;
