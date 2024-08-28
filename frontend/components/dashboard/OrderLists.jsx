import React, { useEffect, useState } from "react";
import axios from "axios";

export function OrderLists() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${process.env.BASE_URL}/api/orders`);
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const formatCartItems = (items) => {
    return items
      .map((item) => `${item.name} - ${item.price} TL x${item.quantity}`)
      .join(", ");
  };

  const handleStatusChange = async (orderCode, newStatus) => {
    try {
      await axios.put(`${process.env.BASE_URL}/api/orders/status`, {
        orderCode,
        newStatus,
      });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.orderCode === orderCode
            ? { ...order, status: newStatus }
            : order
        )
      );
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Sipariş Listesi</h1>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 border-collapse">
          <thead className="text-xs text-gray-700 bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 border-b">
                Sipariş Kodu
              </th>
              <th scope="col" className="px-6 py-3 border-b">
                Toplam Fiyat
              </th>
              <th scope="col" className="px-6 py-3 border-b">
                Durum
              </th>
              <th scope="col" className="px-6 py-3 border-b">
                Sepet İçeriği
              </th>
              <th scope="col" className="px-6 py-3 border-b">
                Eylem
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.orderCode}
                className="odd:bg-white even:bg-gray-50 border-b"
              >
                <td className="px-6 py-4">{order.orderCode}</td>
                <td className="px-6 py-4">{`${order.totalPrice} TL`}</td>
                <td className="px-6 py-4">{order.status}</td>
                <td className="px-6 py-4">
                  {formatCartItems(order.cartItems)}
                </td>
                <td className="px-6 py-4">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order.orderCode, e.target.value)
                    }
                    className="border border-gray-300 rounded px-2 py-1"
                  >
                    <option value="Hazırlanıyor...">Hazırlanıyor...</option>
                    <option value="Kargoya verildi.">Kargoya verildi.</option>
                    <option value="Yolda.">Yolda.</option>
                    <option value="Teslim edildi.">Teslim edildi.</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
