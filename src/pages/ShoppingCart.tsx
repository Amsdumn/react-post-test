import React from "react";
import { CartProvider } from "../context/CartContext";
import ProductList from "../components/ProductList";
import Cart from "../components/Cart";

const ShoppingCartPage: React.FC = () => {
  return (
    <CartProvider>
      <div className="container min-h-screen mx-auto p-4 space-y-10 pt-20">
        <h1 className="text-2xl font-bold mb-4 dark:text-white">Shopping Cart</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProductList />
          <Cart />
        </div>
      </div>
    </CartProvider>
  );
};

export default ShoppingCartPage;
