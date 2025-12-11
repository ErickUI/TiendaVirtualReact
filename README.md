# 🛒 Tienda Virtual — Proyecto Completo (React + TypeScript + JSON Server)

Aplicación web desarrollada en **React + TypeScript**, diseñada como una **tienda virtual completa** con:
- Módulo público (inicio, catálogo, carrito, registro/login).
- Módulo privado cliente (panel, pedidos, perfil editable).
- Módulo administrativo (gestión de productos, usuarios, empleados y pedidos).
- Persistencia mediante **JSON Server** simulando una API REST real.
- Arquitectura modular, escalable y basada en buenas prácticas.

---

## 🚀 Tecnologías Principales

Este proyecto utiliza las siguientes herramientas y librerías:

| Tecnología | Uso |
|-----------|-----|
| **React 18 + TypeScript** | Frontend moderno tipado |
| **React Router v6** | Navegación pública y privada |
| **Bootstrap 5** | Estilos y componentes responsivos |
| **JSON Server** | API REST simulada |
| **Axios** | Cliente HTTP centralizado |
| **React Hook Form** | Formularios robustos |
| **Context API** | Autenticación, Carrito, Catálogo |
| **Vite** | Entorno de desarrollo rápido |


## 📦 Instalación de dependencias

- npm install
- npm install react-router-dom
- npm install bootstrap
- npm install bootstrap-icons
- npm install react-icons
- npm install react-hook-form
- npm install axios
- npm install json-server --save-dev
- npm install chart.js react-chartjs-2
- npm install dayjs
- npm install sweetalert2
- npm install --save-dev typescript @types/react @types/react-dom @types/react-router-dom
- npm install --save-dev @types/yup @types/react-bootstrap @types/node @types/sweetalert2
---

## 📦 Archivo db.json Dominios

```Db.json
{
  "productos": [
    {
      "id": "11",
      "nombre": "MSI Titan 18 HX",
      "descripcion": "Portátil Gamer diseñado para el mejor performance.",
      "precio": 8999.9,
      "stock": 5,
      "sku": "MSI-TITAN-18HX",
      "imagenUrl": "/imagenes/LaptopMSI.jpg",
      "categoriaId": 1,
      "estado": "ACTIVO"
    }
  ],
  "usuarios": [
    {
      "id": "1",
      "nombres": "Administrador",
      "apellidos": "Sistema",
      "correo": "admin@gmail.com",
      "telefono": "987569534",
      "rol": "ADMIN",
      "password": "admin123",
      "activo": true
    }
  ],
  "categorias": [
    { "id": "1", "nombre": "Laptops" }
  ],
  "empleados": [
    {
      "id": "1",
      "nombres": "Lucía",
      "apellidos": "Gonzales Méndez",
      "correo": "l.gonzales@mitienda.com",
      "telefono": "954182937",
      "cargo": "Vendedora senior"
      "activo": true
    }
  ],
  "pedidos": [
    {
      "id": "1",
      "codigo": "PED-2025-0001",
      "usuarioId": 2,
      "estado": "ENTREGADO",
      "total": 4589.4
    }
  ]
}
```
---
### Ejecucion del json server

- npx json-server --watch db.json --port 3001

---

## 🔗 API centralizada
### httpClient.ts
```
import axios from 'axios';

export const httpClient = axios.create({
  baseURL: 'http://localhost:3001',
  headers: { 'Content-Type': 'application/json' }
});
```


### endpoints.ts
```
export const endpoints = {
  productos: '/productos',
  usuarios: '/usuarios',
  pedidos: '/pedidos',
  empleados: '/empleados',
  categorias: '/categorias'
};
```

## ⚙️ Funciones CRUD Importantes
### Crear productos
```
export function crearProducto(data: Producto) {
  return httpClient.post(endpoints.productos, data);
}
```
### Obtener productos
```
export async function obtenerProductos() {
  const resp = await httpClient.get<Producto[]>(endpoints.productos);
  return resp.data;
}
```
### Actualizar producto
```
export function actualizarProducto(id: string | number, data: Partial<Producto>) {
  return httpClient.patch(`${endpoints.productos}/${id}`, data);
}
```
### Eliminar producto
```
export function eliminarProducto(id: string | number) {
  return httpClient.delete(`${endpoints.productos}/${id}`);
}
```
## 🔑 Autenticación
### Inicio de sesión 
```
export async function iniciarSesion(credenciales: CredencialesLogin) {
  const resp = await httpClient.get('/usuarios');
  const usuario = resp.data.find(
    u => u.correo === credenciales.correo && u.password === credenciales.password
  );

  if (!usuario) throw new Error('Credenciales incorrectas');

  localStorage.setItem('usuarioSesion', JSON.stringify(usuario));
  return usuario;
}
```
### Logout
```
export function cerrarSesion() {
  localStorage.removeItem('usuarioSesion');
}
```
## 🛒 Funciones principales del carrito
### Contexto del carrito
```
const agregar = (producto: Producto) => {
  setItems(prev => {
    const existe = prev.find(i => i.producto.id === producto.id);
    if (existe)
      return prev.map(i =>
        i.producto.id === producto.id
          ? { ...i, cantidad: i.cantidad + 1 }
          : i
      );
    return [...prev, { producto, cantidad: 1 }];
  });
};
```
### Eliminar
```
const eliminar = (id) =>
  setItems(prev => prev.filter(i => i.producto.id !== id));
```
### Vaciar carrito
```
const vaciar = () => setItems([]);
```
## 🔔 Manejo de mensajes

### Error: producto no encontrado
```
if (!producto) {
  alert('Producto no disponible en el catálogo.');
  return;
}
```
### Confirmacion antes de eliminar
```
const confirmar = window.confirm('¿Seguro que deseas eliminar este producto?');
if (!confirmar) return;
```
### Guardado exitoso
```
alert('Cambios guardados correctamente.');
```
## Diagrama de flujo LOGIN
<img width="4196" height="7971" alt="Untitled diagram-2025-12-11-040340" src="https://github.com/user-attachments/assets/6a83e7ac-613f-412c-83f2-332a96e03e87" />


