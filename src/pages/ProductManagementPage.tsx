import React, { useState, useEffect } from "react";
import { IoMdAdd } from "react-icons/io";
import { MdDeleteOutline, MdOutlineEditNote } from "react-icons/md";
import usePagination from "../hooks/usePagination";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
}

const ProductManagementPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { currentPageItems, currentPage, totalPages, nextPage, previousPage } = usePagination(products, { itemsPerPage: 5 });
  const [newProduct, setNewProduct] = useState<Omit<Product, "id">>({
    name: "",
    price: 0,
    description: "",
  });
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  }, []);
  
  const addProduct = () => {
    const product: Product = {
      id: Date.now().toString(),
      ...newProduct,
    };
    setProducts((prevProducts) => {
      const updatedProducts = [...prevProducts, product];
      localStorage.setItem("products", JSON.stringify(updatedProducts));
      return updatedProducts;
    });
    setNewProduct({ name: "", price: 0, description: "" });
  };    

  const updateProduct = () => {
    if (!editingProduct) return;
    setProducts((prev) =>
      prev.map((product) =>
        product.id === editingProduct.id ? editingProduct : product
      )
    );
    setEditingProduct(null);
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  const exportToCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["Name,Price,Description"]
        .concat(
          products.map((product) =>
            [product.name, product.price, product.description]
              .map((value) => `"${value}"`)
              .join(",")
          )
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "products.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container min-h-screen mx-auto p-4 space-y-10 pt-20">
      <h1 className="text-2xl font-bold mb-4 dark:text-white">Product Management</h1>

      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-4 dark:text-white">Add Product</h2>
        <div className="flex items-center flex-auto flex-wrap">
          <div>
            <label htmlFor="Name" className="block text-xs text-slate-900 dark:text-white my-2">Name</label>
            <input
              type="text"
              placeholder="Name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
              className="border p-2 mr-2 dark:text-white"
            />
          </div>
          <div>
            <label htmlFor="Price" className="block text-xs text-slate-900 dark:text-white my-2">Price</label>
            <input
              type="number"
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: +e.target.value })
              }
              className="border p-2 mr-2 dark:text-white"
            />
          </div>
          <div>
            <label htmlFor="Description" className="block text-xs text-slate-900 dark:text-white my-2">Description</label>
            <input
              type="text"
              placeholder="Description"
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct({ ...newProduct, description: e.target.value })
              }
              className="border p-2 mr-2 dark:text-white"
            />
          </div>
          <button disabled={newProduct.name == ''} onClick={addProduct} className="bg-blue-500 text-white mt-8 px-4 py-2 disabled:opacity-25 disabled:grayscale">
            <div className="flex items-center">
              <IoMdAdd />
              <span>Add</span>
            </div>
          </button>
        </div>
      </div>

      {editingProduct && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Edit Product</h2>
          <div className="flex items-center flex-auto flex-wrap">
            <div>
              <label htmlFor="Name" className="block text-xs text-slate-900 dark:text-white my-2">Name</label>
              <input
                type="text"
                placeholder="Name"
                value={editingProduct.name}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, name: e.target.value })
                }
                className="border p-2 mr-2 dark:text-white"
              />
            </div>
            <div>
              <label htmlFor="Price" className="block text-xs text-slate-900 dark:text-white my-2">Price</label>
              <input
                type="number"
                placeholder="Price"
                value={editingProduct.price}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, price: +e.target.value })
                }
                className="border p-2 mr-2 dark:text-white"
              />
            </div>
            <div>
              <label htmlFor="Description" className="block text-xs text-slate-900 dark:text-white my-2">Description</label>
              <input
                type="text"
                placeholder="Description"
                value={editingProduct.description}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    description: e.target.value,
                  })
                }
                className="border p-2 mr-2 dark:text-white"
              />
            </div>
            <button
              onClick={updateProduct}
              className="bg-green-500 text-white px-4 py-2 mt-8 focus:outline-none"
            >
              Update
            </button>
          </div>
        </div>
      )}

      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Product List</h2>
          <button
            onClick={exportToCSV}
            disabled={currentPageItems.length == 0}
            className="mb-4 bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none disabled:grayscale disabled:opacity-65"
          >
            Export to CSV
          </button>
        </div>
        <div className="overflow-x-scroll">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100 dark:bg-slate-900 dark:text-white">
                <th className="border border-gray-300 px-4 py-2 w-5">#</th>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Price</th>
                <th className="border border-gray-300 px-4 py-2">Description</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentPageItems.map((product) => (
                <tr key={product.id} className="dark:text-white">
                  <td className="border border-gray-300 px-4 py-2">{product.index}</td>
                  <td className="border border-gray-300 px-4 py-2">{product.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{product.price}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {product.description}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <div className="flex items-center justify-center">
                      <button
                        onClick={() => setEditingProduct(product)}
                        className="bg-green-500 text-white px-2 py-1 mr-2 focus:outline-none"
                      >
                        <MdOutlineEditNote />
                      </button>
                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="bg-red-500 text-white px-2 py-1 focus:outline-none"
                      >
                        <MdDeleteOutline />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-center mt-4 space-x-4">
          <button
            className="p-1 bg-blue-500 text-white rounded-full disabled:opacity-50"
            disabled={currentPage === 1}
            onClick={previousPage}
          >
            <GrFormPrevious />
          </button>
          <span className="dark:text-white">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="p-1 bg-blue-500 text-white rounded-full disabled:opacity-50"
            disabled={currentPage === totalPages}
            onClick={nextPage}
          >
            <GrFormNext />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductManagementPage;
