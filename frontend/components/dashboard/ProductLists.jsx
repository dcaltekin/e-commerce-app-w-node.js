import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductLists = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleEdit = (productId) => {
    console.log(productId);
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:3001/api/products/${productId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setProducts(products.filter((product) => product.id !== productId));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Ürün Listesi</h1>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 border-collapse">
          <thead className="text-xs text-gray-700 bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 border-b">
                ID
              </th>
              <th scope="col" className="px-6 py-3 border-b">
                Ürün Adı
              </th>
              <th scope="col" className="px-6 py-3 border-b">
                Değeri
              </th>
              <th scope="col" className="px-6 py-3 border-b">
                Stok
              </th>
              <th scope="col" className="px-6 py-3 border-b">
                Açıklama
              </th>
              <th scope="col" className="px-6 py-3 border-b">
                Eylem
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="odd:bg-white even:bg-gray-50 border-b"
              >
                <td className="px-6 py-4">{product.id}</td>
                <td className="px-6 py-4 font-medium text-gray-900">
                  {product.name}
                </td>
                <td className="px-6 py-4">{product.price}</td>
                <td className="px-6 py-4">{product.stock}</td>
                <td className="px-6 py-4">{product.description}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleEdit(product.id)}
                    className="text-blue-500 hover:text-blue-700 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductLists;
