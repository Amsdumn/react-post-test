import React from "react";
import { useCart } from "../context/CartContext";

const Cart: React.FC = () => {
  const { cart, clearCart } = useCart();

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="border p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4 dark:text-white">Shopping Cart</h2>
      {cart.length === 0 ? (
        <p className="dark:text-white">Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.id} className="flex justify-between items-center mb-2">
              <span className="text-white">
                {item.name} (x{item.quantity})
              </span>
              <span className="dark:text-white">{item.price * item.quantity}</span>
            </li>
          ))}
        </ul>
      )}

      {cart.length > 0 && (
        <div className="flex items-center justify-between mt-4">
          <span className="text-lg font-bold dark:text-white">Total:</span>
          <span className="text-lg font-bold dark:text-white">{totalPrice}</span>
        </div>
      )}

      {cart.length > 0 && (
        <div className="mt-10">
          <button
            onClick={clearCart}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
