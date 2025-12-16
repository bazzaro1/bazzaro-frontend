import React, { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token"); // faqat token localStorage’da
      const res = await axios.get("http://127.0.0.1:8000/api/seller/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data.data); // paginate → data ichida bo‘ladi
    } catch (err) {
      console.error("Orders fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <p>Yuklanmoqda...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Buyurtmalar</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Mahsulot</th>
            <th className="p-2 border">Mijoz</th>
            <th className="p-2 border">Telefon</th>
            <th className="p-2 border">Manzil</th>
            <th className="p-2 border">Miqdor</th>
            <th className="p-2 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="p-2 border">{order.id}</td>
              <td className="p-2 border">{order.product?.name}</td>
              <td className="p-2 border">{order.buyer_name}</td>
              <td className="p-2 border">{order.buyer_phone}</td>
              <td className="p-2 border">{order.buyer_address}</td>
              <td className="p-2 border">{order.quantity}</td>
              <td className="p-2 border">{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
