import type { ReactNode } from 'react';
import { AuthProvider } from '../contexts/AuthContext';
import { CartProvider } from '../features/carrito/context/CartContext';

interface AppProvidersProps {
  children: ReactNode;
}

function AppProviders({ children }: AppProvidersProps) {
  return (
    <AuthProvider>
      <CartProvider>
        {children}
      </CartProvider>
    </AuthProvider>
  );
}

export default AppProviders;
