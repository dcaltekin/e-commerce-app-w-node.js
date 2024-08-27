import React, { useState } from "react";
import axios from "axios";
import { MdClose } from "react-icons/md";

export default function OrderStatusPopup({ onClose }) {
  const [orderCode, setOrderCode] = useState("");
  const [orderDetails, setOrderDetails] = useState(null);
  const [error, setError] = useState("");

  const handleCheckStatus = async () => {
    try {
      const response = await axios.get(
        `${process.env.BASE_URL}/api/orders/${orderCode}`
      );
      setOrderDetails(response.data);
      setError("");
    } catch (error) {
      setOrderDetails(null);
      setError("Sipariş bulunamadı.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-between gap-x-8 items-center h-full mb-4">
          <h2 className="text-2xl">Sipariş Durumunu Sorgula</h2>
          <button onClick={onClose} className=" text-red-500 ">
            <MdClose size={24} />
          </button>
        </div>

        <input
          type="text"
          placeholder="Sipariş kodu..."
          value={orderCode}
          onChange={(e) => setOrderCode(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg mb-4"
        />
        <button
          onClick={handleCheckStatus}
          className="w-full inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
        >
          Sipariş Durumunu Sorgula
        </button>
        {orderDetails && (
          <div className="mt-4">
            <h3 className="text-xl font-bold">Sipariş Detayları</h3>
            <p>
              <strong>Kod:</strong> {orderDetails.orderCode}
            </p>
            <p>
              <strong>Toplam Tutar:</strong> {orderDetails.totalPrice} TL
            </p>
            <p>
              <strong>Durum:</strong> {orderDetails.status}
            </p>
            <h4 className="mt-2 text-lg font-semibold">Ürünler:</h4>
            <ul>
              {orderDetails.cartItems.map((item) => (
                <li key={item.id} className="py-1">
                  {item.name} - {item.price} TL x{item.quantity}
                </li>
              ))}
            </ul>
          </div>
        )}
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
}
