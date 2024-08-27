import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState("default");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/products");
        setProducts(response.data);
        setFilteredProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const searchResults = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const sortedResults = [...searchResults].sort((a, b) => {
      if (sortOrder === "priceAsc") {
        return a.price - b.price;
      } else if (sortOrder === "priceDesc") {
        return b.price - a.price;
      }
      return 0;
    });

    setFilteredProducts(sortedResults);
  }, [searchTerm, products, sortOrder]);

  if (loading) {
    return (
      <div className="container mx-auto mt-8">
        <p className="text-center text-xl">Yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-4xl mb-4">Ürünler</h1>
      <div className="mb-4 flex flex-col gap-4">
        <input
          type="text"
          placeholder="Ürün ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
        <div className="flex w-full justify-end">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="w-48 p-2 border border-gray-300 rounded-lg"
          >
            <option value="default">Sıralama</option>
            <option value="priceAsc">En Ucuzdan En Pahalıya</option>
            <option value="priceDesc">En Pahalıdan En Ucuza</option>
          </select>
        </div>
      </div>
      <div className="grid xl:grid-cols-4 gap-4 mt-8">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow"
            >
              <Link href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                  {product.name}
                </h5>
              </Link>
              <p className="mb-3 font-normal text-gray-700 text-[14px]">
                {product.description}
              </p>
              <p className="mb-3 font-normal text-gray-700 text-end">
                {product.price} TL
              </p>
              <div className="flex justify-center w-full">
                <Link
                  href="#"
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                >
                  Sepete ekle
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            Ürün bulunamadı.
          </p>
        )}
      </div>
    </div>
  );
}
