import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const ProductList: React.FC = () => {
  const { addToCart, removeToCart } = useCart();

  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: "Product A", price: 100, quantity: 0 },
    { id: 2, name: "Product B", price: 200, quantity: 0 },
    { id: 3, name: "Product C", price: 300, quantity: 0 },
  ]);

  const handleAddToCart = (product: Product) => {
    setProducts((prevProducts) =>
      prevProducts.map((p) =>
        p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
      )
    );
    addToCart({ ...product, quantity: 1 });
  };

  const handleRemoveToCart = (product: Product) => {
    setProducts((prevProducts) =>
      prevProducts.map((p) =>
        p.id === product.id && p.quantity > 0
          ? { ...p, quantity: p.quantity - 1 }
          : p
      )
    );
    removeToCart({ ...product, quantity: 1 });
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {products.map((product) => (
        <div key={product.id}>
          <div className="border p-4 rounded-lg shadow">
            <h2 className="text-lg font-bold dark:text-white">{product.name}</h2>
            <p className="text-gray-600 dark:text-white">Price: {product.price}</p>
            <div className="flex items-center justify-between">
              <button
                onClick={() => handleRemoveToCart(product)}
                disabled={product.quantity == 0}
                className="mt-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 disabled:opacity-55 disabled:grayscale"
              >
                <FaMinusCircle />
              </button>
              <span className="dark:text-white">{product.quantity}</span>
              <button
                onClick={() => handleAddToCart(product)}
                className="mt-2 bg-green-500 text-white p-1 rounded-full hover:bg-green-600"
              >
                <FaPlusCircle />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
