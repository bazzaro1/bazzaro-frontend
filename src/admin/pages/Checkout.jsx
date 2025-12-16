import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Checkout() {
  const cart = useSelector((state) => state.cart.items);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.address) {
      alert("❗ Iltimos, barcha maydonlarni to‘ldiring!");
      return;
    }

    if (cart.length === 0) {
      alert("❗ Savatchangiz bo‘sh!");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://127.0.0.1:8000/api/orders",
        {
          buyer_name: formData.name,
          buyer_phone: formData.phone,
          buyer_address: formData.address,
          payment_method: paymentMethod,
          products: cart.map((item) => ({
            product_id: item.id,
            quantity: item.quantity,
          })),
        },
        {
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      console.log("✅ Buyurtma:", response.data);
      navigate("/success", { state: { order: response.data.order } });
    } catch (error) {
      console.error("❌ Buyurtma xatosi:", error.response?.data || error.message);
      alert("Xatolik yuz berdi, qayta urinib ko‘ring!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white shadow-md rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-6">🚚 Yetkazib berish ma’lumotlari</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ismingiz"
            className="w-full border rounded-lg px-4 py-2"
            required
          />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+998 90 123 45 67"
            className="w-full border rounded-lg px-4 py-2"
            required
          />
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Manzilingiz"
            className="w-full border rounded-lg px-4 py-2"
            required
          />

          <div className="bg-white shadow-md rounded-xl p-6 flex flex-col justify-between">
            <h2 className="text-2xl font-bold mb-6">💳 To‘lov usuli</h2>
            {["payme", "click", "visa", "cash"].map((method) => (
              <label key={method} className="flex items-center space-x-3 my-2">
                <input
                  type="radio"
                  name="payment"
                  value={method}
                  checked={paymentMethod === method}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span>
                  {method === "payme"
                    ? "Payme"
                    : method === "click"
                    ? "Click"
                    : method === "visa"
                    ? "Visa / Mastercard"
                    : "Eshikda to‘lov"}
                </span>
              </label>
            ))}

            <div className="mt-6 flex justify-between font-bold text-xl">
              <span>Umumiy summa:</span>
              <span className="text-orange-600">
                {totalPrice.toLocaleString()} so‘m
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold"
            >
              {loading ? "⏳ Yuborilmoqda..." : "Buyurtmani yakunlash"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
