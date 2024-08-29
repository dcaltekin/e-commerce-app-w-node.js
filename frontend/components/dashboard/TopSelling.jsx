import React, { useEffect, useState } from "react";
import axios from "axios";
import { useToken } from "@/context/TokenContext";
export default function TopSellingProducts() {
  const { token } = useToken();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopSellingProducts = async () => {
      try {
        const response = await axios.get(
          `${process.env.BASE_URL}/api/top-selling`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching top-selling products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopSellingProducts();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-gray-500 mt-8">
        <p>Yükleniyor...</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">En Çok Satan Ürünler (Top 10)</h1>
      <div className="grid gap-4 mt-8">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow"
            >
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                Ürün: {product.name}
              </h5>
              <p className="mb-3 font-normal text-gray-700 text-start">
                Satış Miktarı: {product.totalQuantity}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Ürün bulunamadı.</p>
        )}
      </div>
    </div>
  );
}
