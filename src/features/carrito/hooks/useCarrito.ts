import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

export function useCarrito() {
  return useContext(CartContext);
}
