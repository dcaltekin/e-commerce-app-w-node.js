import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductLists = () => {
  const [products, setProducts] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);
  const [editedProduct, setEditedProduct] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${process.env.BASE_URL}/api/products`
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleEdit = (product) => {
    setEditingProductId(product.id);
    setEditedProduct({
      name: product.name,
      price: product.price,
      stock: product.stock,
      description: product.description,
    });
  };

  const handleSave = async (productId) => {
    try {
      await axios.put(
        `${process.env.BASE_URL}/api/products/${productId}`,
        editedProduct,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setProducts(
        products.map((product) =>
          product.id === productId ? { ...product, ...editedProduct } : product
        )
      );
      setEditingProductId(null);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`${process.env.BASE_URL}/api/products/${productId}`, {
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
                  {editingProductId === product.id ? (
                    <input
                      type="text"
                      value={editedProduct.name}
                      onChange={(e) =>
                        setEditedProduct({
                          ...editedProduct,
                          name: e.target.value,
                        })
                      }
                      className="w-full border border-gray-300 rounded-md"
                    />
                  ) : (
                    product.name
                  )}
                </td>
                <td className="px-6 py-4">
                  {editingProductId === product.id ? (
                    <input
                      type="number"
                      value={editedProduct.price}
                      onChange={(e) =>
                        setEditedProduct({
                          ...editedProduct,
                          price: e.target.value,
                        })
                      }
                      className="w-full border border-gray-300 rounded-md"
                    />
                  ) : (
                    product.price
                  )}
                </td>
                <td className="px-6 py-4">
                  {editingProductId === product.id ? (
                    <input
                      type="number"
                      value={editedProduct.stock}
                      onChange={(e) =>
                        setEditedProduct({
                          ...editedProduct,
                          stock: e.target.value,
                        })
                      }
                      className="w-full border border-gray-300 rounded-md"
                    />
                  ) : (
                    product.stock
                  )}
                </td>
                <td className="px-6 py-4">
                  {editingProductId === product.id ? (
                    <input
                      type="text"
                      value={editedProduct.description}
                      onChange={(e) =>
                        setEditedProduct({
                          ...editedProduct,
                          description: e.target.value,
                        })
                      }
                      className="w-full border border-gray-300 rounded-md"
                    />
                  ) : (
                    product.description
                  )}
                </td>
                <td className="px-6 py-4">
                  {editingProductId === product.id ? (
                    <button
                      onClick={() => handleSave(product.id)}
                      className="text-green-500 hover:text-green-700 mr-2"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(product)}
                      className="text-blue-500 hover:text-blue-700 mr-2"
                    >
                      Edit
                    </button>
                  )}
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
