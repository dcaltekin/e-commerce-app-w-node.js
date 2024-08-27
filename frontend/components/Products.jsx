import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
export default function Products() {
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
  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-4xl">Ürünler</h1>
      <div className="grid xl:grid-cols-4 gap-4 mt-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow  "
          >
            <Link href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                {product.name}
              </h5>
            </Link>
            <p className="mb-3 font-normal text-gray-700 text-[14px]">
              {product.description}
            </p>
            <p className="mb-3 font-normal text-gray-700 text-end ">
              {product.price} TL
            </p>
            <div className="flex justify-center w-full">
              <Link
                href="#"
                className=" inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
              >
                Sepete ekle
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
