import type { RolSistema } from '../models/comunes.model';
import type { JSX } from 'react';
import RegisterPage from '../features/auth/pages/RegisterPage';
import LoginPage from '../features/auth/pages/LoginPage';
import DashboardHomePage from '../features/dashboard/pages/DashboardHomePage';
import NotFoundPage from '../components/common/NotFoundPage';
import CatalogPage from '../features/catalogo/pages/CatalogPage';
import ProductDetailPage from '../features/catalogo/pages/ProductDetailPage';
import CartPage from '../features/carrito/pages/CartPage';
import CheckoutPage from '../features/carrito/pages/CheckoutPage';
import ProductListPage from '../features/Products/pages/ProductListPage';
import ProductFormPage from '../features/Products/pages/ProductFormPage';
import ClienteListPage from '../features/Clientes/pages/ClienteListPage';
import ClienteFormPage from '../features/Clientes/pages/ClienteFormPage';
import EmpleadoListPage from '../features/empleados/pages/EmpleadoListPage';
import EmpleadoFormPage from '../features/empleados/pages/EmpleadoFormPage';
import PedidoListPage from '../features/pedidos/pages/PedidoListPage';
import PedidoDetailPage from '../features/pedidos/pages/PedidoDetailPage';
import ClientOrdersPage from '../features/pedidos/pages/ClientOrdersPage';
import HomePage from '../features/home/pages/HomePage.tsx';

export interface AppRoute {
  path: string;
  element: JSX.Element;
  layout?: 'publico' | 'dashboard' | 'admin';
  esPrivada?: boolean;
  rolesPermitidos?: RolSistema[];
}

export const rutasPublicas: AppRoute[] = [
  {
    path: '/catalogo',
    element: <CatalogPage />,
    layout: 'publico',
  },
  {
    path: '/login',
    element: <LoginPage />,
    layout: 'publico',
  },
  {
    path: '/registro',
    element: <RegisterPage />,
    layout: 'publico',
  },
  {
    path: '/catalogo/producto/:id',
    element: <ProductDetailPage />,
    layout: 'publico',
  },
  {
    path: '/carrito',
    element: <CartPage />,
    layout: 'publico',
  },
    {
    path: '/',
    element: <HomePage />,
    layout: 'publico',
  },

];

//rutas con el dashboard
export const rutasPrivadasDashboard: AppRoute[] = [
  {
    path: '/panel',
    element: <DashboardHomePage />,
    layout: 'dashboard',
    esPrivada: true,
    rolesPermitidos: ['CLIENTE', 'EMPLEADO', 'ADMIN'],
  },
  {
    path: '/checkout',
    element: <CheckoutPage />,
    layout: 'publico',
    esPrivada: true,
    rolesPermitidos: ['CLIENTE', 'EMPLEADO', 'ADMIN'],
  },
];

//para gestionar el crud del producot
export const rutasGestionProductos: AppRoute[] = [
  {
    path: '/panel/productos',
    element: <ProductListPage />,
    layout: 'dashboard',
    esPrivada: true,
    rolesPermitidos: ['EMPLEADO', 'ADMIN'],
  },
  {
    path: '/panel/productos/nuevo',
    element: <ProductFormPage />,
    layout: 'dashboard',
    esPrivada: true,
    rolesPermitidos: ['EMPLEADO', 'ADMIN'],
  },
  {
    path: '/panel/productos/:id/editar',
    element: <ProductFormPage />,
    layout: 'dashboard',
    esPrivada: true,
    rolesPermitidos: ['EMPLEADO', 'ADMIN'],
  },
];

export const rutasGestionUsuarios: AppRoute[] = [
  {
    path: '/panel/clientes',
    element: <ClienteListPage />,
    layout: 'dashboard',
    esPrivada: true,
    rolesPermitidos: ['EMPLEADO', 'ADMIN'],
  },
  {
    path: '/panel/clientes/nuevo',
    element: <ClienteFormPage />,
    layout: 'dashboard',
    esPrivada: true,
    rolesPermitidos: ['EMPLEADO', 'ADMIN'],
  },
  {
    path: '/panel/clientes/:id/editar',
    element: <ClienteFormPage />,
    layout: 'dashboard',
    esPrivada: true,
    rolesPermitidos: ['EMPLEADO', 'ADMIN'],
  },
];

export const rutasGestionEmpleados: AppRoute[] = [
  {
    path: '/panel/empleados',
    element: <EmpleadoListPage />,
    layout: 'admin',
    esPrivada: true,
    rolesPermitidos: ['ADMIN'],
  },
  {
    path: '/panel/empleados/nuevo',
    element: <EmpleadoFormPage />,
    layout: 'admin',
    esPrivada: true,
    rolesPermitidos: ['ADMIN'],
  },
  {
    path: '/panel/empleados/:id/editar',
    element: <EmpleadoFormPage />,
    layout: 'admin',
    esPrivada: true,
    rolesPermitidos: ['ADMIN'],
  },
];

export const rutasPedidos: AppRoute[] = [
  {
    path: '/panel/pedidos',
    element: <PedidoListPage />,
    layout: 'dashboard',
    esPrivada: true,
    rolesPermitidos: ['EMPLEADO', 'ADMIN'],
  },
  {
    path: '/panel/pedidos/:id',
    element: <PedidoDetailPage />,
    layout: 'dashboard',
    esPrivada: true,
    rolesPermitidos: ['EMPLEADO', 'ADMIN'],
  },
  {
    path: '/panel/mis-pedidos',
    element: <ClientOrdersPage />,
    layout: 'dashboard',
    esPrivada: true,
    rolesPermitidos: ['CLIENTE'],
  }
];

export const rutaNoEncontrada: AppRoute = {
  path: '*',
  element: <NotFoundPage />,
  layout: 'publico',
};