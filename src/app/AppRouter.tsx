// src/app/AppRouter.tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import {
    rutasPublicas,
    rutasPrivadasDashboard,
    rutasGestionProductos,
    rutasGestionUsuarios,
    rutasGestionEmpleados,
    rutasPedidos,
    rutaNoEncontrada,
    type AppRoute,
} from './routes.config';
import PublicLayout from '../layouts/PublicLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import AdminLayout from '../layouts/AdminLayout';
import { useAuth } from '../hooks/useAuth';

const todasLasRutas: AppRoute[] = [
    ...rutasPublicas,
    ...rutasPrivadasDashboard,
    ...rutasGestionProductos,
    ...rutasGestionUsuarios,
    ...rutasGestionEmpleados,
    ...rutasPedidos,
    rutaNoEncontrada,
];

function seleccionarLayout(layout: AppRoute['layout']) {
    switch (layout) {
        case 'dashboard':
            return DashboardLayout;
        case 'admin':
            return AdminLayout;
        default:
            return PublicLayout;
    }
}

export function AppRouter() {
    const { usuarioActual } = useAuth();

    const puedeEntrar = (ruta: AppRoute) => {
        if (!ruta.esPrivada) return true;
        if (!usuarioActual) return false;
        if (!ruta.rolesPermitidos || ruta.rolesPermitidos.length === 0) {
            return true;
        }
        return ruta.rolesPermitidos.includes(usuarioActual.rol);
    };

    return (
        <Routes>
            {todasLasRutas.map((ruta) => {
                const Layout = seleccionarLayout(ruta.layout);

                if (ruta.esPrivada) {
                    return (
                        <Route
                            key={ruta.path}
                            path={ruta.path}
                            element={
                                puedeEntrar(ruta) ? (
                                    <Layout>{ruta.element}</Layout>
                                ) : (
                                    <Navigate to="/login" replace />
                                )
                            }
                        />
                    );
                }

                return (
                    <Route
                        key={ruta.path}
                        path={ruta.path}
                        element={<Layout>{ruta.element}</Layout>}
                    />
                );
            })}
        </Routes>
    );
}

export default AppRouter;
