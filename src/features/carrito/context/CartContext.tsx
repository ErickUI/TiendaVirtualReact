import { createContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { Producto } from '../../../models/producto.model';

export interface ItemCarrito {
  producto: Producto;
  cantidad: number;
}

interface CartContextProps {
  items: ItemCarrito[];
  agregar: (producto: Producto) => void;
  cambiarCantidad: (id: number | string, cantidad: number) => void;
  eliminar: (id: number | string) => void;
  vaciar: () => void;
}

export const CartContext = createContext<CartContextProps>(null!);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ItemCarrito[]>([]);

  const agregar = (producto: Producto) => {
    setItems((prev) => {
      const existe = prev.find((i) => i.producto.id === producto.id);
      if (existe) {
        return prev.map((i) =>
          i.producto.id === producto.id ? { ...i, cantidad: i.cantidad + 1 } : i
        );
      }
      return [...prev, { producto, cantidad: 1 }];
    });
  };

  const cambiarCantidad = (id: number | string, cantidad: number) => {
    setItems((prev) =>
      prev.map((i) =>
        i.producto.id === id ? { ...i, cantidad: Math.max(1, cantidad) } : i
      )
    );
  };

  const eliminar = (id: number | string) => {
    setItems((prev) => prev.filter((i) => i.producto.id !== id));
  };

  const vaciar = () => setItems([]);

  return (
    <CartContext.Provider value={{ items, agregar, cambiarCantidad, eliminar, vaciar }}>
      {children}
    </CartContext.Provider>
  );
}
