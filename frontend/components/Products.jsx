import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { FaShoppingCart } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import OrderStatusPopup from "./OrderStatusPopup";
import { useToken } from "@/context/TokenContext";
import { useTranslation } from "react-i18next";
import { MdLanguage } from "react-icons/md";

export default function Products() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  const { token, logoutNoPush } = useToken();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState("default");
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showOrderStatusPopup, setShowOrderStatusPopup] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/products`
        );
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

  const addItemToCart = (product) => {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex(
        (item) => item.id === product.id
      );
      let updatedCart;
      if (existingProductIndex === -1) {
        updatedCart = [...prevCart, { ...product, quantity: 1 }];
      } else {
        updatedCart = prevCart.map((item, index) =>
          index === existingProductIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return updatedCart;
    });
  };

  const removeItemFromCart = (productId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.reduce((acc, item) => {
        if (item.id === productId) {
          if (item.quantity > 1) {
            acc.push({ ...item, quantity: item.quantity - 1 });
          }
        } else {
          acc.push(item);
        }
        return acc;
      }, []);
      return updatedCart;
    });
  };

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  const handleCloseCart = () => {
    setShowCart(false);
  };

  const getTotalPrice = () => {
    const total = cart.reduce((total, item) => {
      const price = parseFloat(item.price);
      return !isNaN(price) ? total + price * (item.quantity || 1) : total;
    }, 0);
    return (Math.round(total * 100) / 100).toFixed(2);
  };

  const handleCompletePurchase = async () => {
    try {
      const orderData = {
        cartItems: cart,
        totalPrice: getTotalPrice(),
        status: "Hazırlanıyor...",
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/orders`,
        orderData
      );

      if (response.status === 201) {
        const orderCode = response.data.orderCode;
        alert(`Sipariş başarıyla oluşturuldu! Sipariş kodunuz: ${orderCode}`);
        setCart([]);
        setShowCart(false);
      }
    } catch (error) {
      console.error("Error completing purchase:", error);
      alert("Sipariş oluşturulurken bir hata oluştu.");
    }
  };

  const handleOrderStatusClick = () => {
    setShowOrderStatusPopup(true);
  };

  const handleCloseOrderStatusPopup = () => {
    setShowOrderStatusPopup(false);
  };

  if (loading) {
    return (
      <div className="container mx-auto mt-8">
        <p className="text-center text-xl">Yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="">
      <nav className="bg-gray-800 p-4 mb-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-white text-xl font-bold">{t("homepage")}</h1>

          <div className="flex gap-x-8">
            <div className="flex gap-x-8 items-center text-white">
              <button
                onClick={() => changeLanguage("en")}
                className="flex items-center"
              >
                <MdLanguage color="white" />
                English
              </button>
              <button
                onClick={() => changeLanguage("tr")}
                className="flex items-center"
              >
                <MdLanguage color="white" />
                Türkçe
              </button>
            </div>

            {token ? (
              <div className="flex gap-x-2">
                <Link href="/dashboard">
                  <button className="bg-indigo-500 py-2 text-white rounded-[8px] px-2">
                    {t("goToDashboard")}
                  </button>
                </Link>
                <button
                  className="bg-red-500 py-2 text-white rounded-[8px] px-2"
                  onClick={logoutNoPush}
                >
                  {t("logout")}
                </button>
              </div>
            ) : (
              <div className="flex gap-x-2">
                <Link href="/login">
                  <button className="bg-blue-500 py-2 text-white rounded-[8px] px-2">
                    {t("login")}
                  </button>
                </Link>
                <Link href="/register">
                  <button className="bg-blue-500 py-2 text-white rounded-[8px] px-2">
                    {t("register")}
                  </button>
                </Link>
              </div>
            )}
            <button
              onClick={handleOrderStatusClick}
              className="bg-green-500 py-2 text-white rounded-[8px] px-2"
            >
              {t("orderStatus")}
            </button>
            <button onClick={toggleCart} className="relative flex items-center">
              <FaShoppingCart className="h-6 w-6 text-white cursor-pointer" />
              {cart.length > 0 && (
                <button className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-1">
                  {cart.length}
                </button>
              )}
            </button>
          </div>
        </div>
      </nav>
      <div className="container mx-auto">
        <div className="mb-4 flex flex-col gap-4">
          <input
            type="text"
            placeholder={t("searchProduct")}
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
              <option value="default">{t("sorting")}</option>
              <option value="priceAsc">{t("cheapestToMostExpensive")}</option>
              <option value="priceDesc">{t("expensiveToCheapest")}</option>
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
                  <button
                    onClick={() => {
                      addItemToCart(product);
                      setShowCart(true);
                    }}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                  >
                    {t("addToBasket")}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              {t("productNotFound")}
            </p>
          )}
        </div>
        {showCart && (
          <div className="max-h-[500px] overflow-y-scroll fixed top-0 right-0 mt-16 mr-4 w-80 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
            <div className="relative p-4">
              <button
                onClick={handleCloseCart}
                className="absolute top-[20px] right-2 text-gray-500 hover:text-gray-800"
              >
                <MdClose className="h-6 w-6" />
              </button>
              <h2 className="text-2xl mb-4">{t("basket")}</h2>
              {cart.length > 0 ? (
                <>
                  <ul className="mb-4">
                    {cart.map((item) => (
                      <li
                        key={item.id}
                        className="py-2 border-b border-gray-200 flex justify-between items-center"
                      >
                        <span>
                          {item.name} - {item.price} TL x{item.quantity}
                        </span>
                        <button
                          onClick={() => removeItemFromCart(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <MdClose className="h-5 w-5" />
                        </button>
                      </li>
                    ))}
                  </ul>
                  <div className="flex justify-between items-center mb-4 font-bold">
                    <span>{t("total")}:</span>
                    <span>{getTotalPrice()} TL</span>
                  </div>
                  <button
                    onClick={handleCompletePurchase}
                    className="w-full inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300"
                  >
                    {t("completeThePurchase")}
                  </button>
                </>
              ) : (
                <p className="text-center text-gray-500 py-4">
                  {t("emptyBasket")}
                </p>
              )}
            </div>
          </div>
        )}
        {showOrderStatusPopup && (
          <OrderStatusPopup onClose={handleCloseOrderStatusPopup} />
        )}
      </div>
    </div>
  );
}
