import type { ItemCarrito } from '../context/CartContext';
import { useCarrito } from '../hooks/useCarrito';

interface Props {
  item: ItemCarrito;
}

function CartItemRow({ item }: Props) {
  const { cambiarCantidad, eliminar } = useCarrito();

  return (
    <tr>
      <td>{item.producto.nombre}</td>
      <td className="text-end">S/ {item.producto.precio.toFixed(2)}</td>
      <td className="text-end">
        <input
          type="number"
          min={1}
          className="form-control form-control-sm"
          style={{ width: 70, display: 'inline-block' }}
          value={item.cantidad}
          onChange={(e) => cambiarCantidad(item.producto.id, parseInt(e.target.value))}
        />
      </td>
      <td className="text-end">
        S/ {(item.producto.precio * item.cantidad).toFixed(2)}
      </td>
      <td>
        <button
          className="btn btn-outline-danger btn-sm"
          onClick={() => eliminar(item.producto.id)}
        >
          X
        </button>
      </td>
    </tr>
  );
}

export default CartItemRow;
