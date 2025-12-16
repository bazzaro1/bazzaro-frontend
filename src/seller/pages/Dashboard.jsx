import React, { useEffect, useState } from "react";
import api from "../../api";

export default function Dashboard() {
  const [me, setMe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token"); // SellerLogin da yozilgan token
    if (!token) {
      window.location.href = "/seller/login";
      return;
    }

    api.get("/sellers/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        setMe(res.data);
        setLoading(false);
      })
      .catch(() => {
        alert("❌ Sessiya tugagan, qayta login qiling.");
        localStorage.removeItem("token");
        window.location.href = "/seller/login";
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("seller");
    window.location.href = "/seller/login";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-blue-600 mb-4">
          Sotuvchi Kabinet
        </h1>

        <div className="space-y-2">
          <p><b>🛍 Do‘kon:</b> {me.shopName}</p>
          <p><b>👤 Ism:</b> {me.fullName}</p>
          <p><b>📧 Email:</b> {me.email}</p>
          <p><b>📱 Telefon:</b> {me.phone}</p>
          <p><b>📌 Status:</b> 
            <span className={`ml-2 px-2 py-1 rounded text-white ${me.status === "active" ? "bg-green-500" : "bg-red-500"}`}>
              {me.status}
            </span>
          </p>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Chiqish
          </button>
        </div>
      </div>
    </div>
  );
}
