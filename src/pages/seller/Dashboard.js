import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import api from "../../api";

export default function Dashboard() {
  const [me, setMe] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
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
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6">
        <h2 className="text-xl font-bold text-blue-600 mb-6">{me.shopName}</h2>
        <nav className="space-y-3">
          <Link
            to="/seller/dashboard/products"
            className={`block px-4 py-2 rounded ${location.pathname.includes("products") ? "bg-blue-600 text-white" : "hover:bg-gray-100"}`}
          >
            🛍 Mahsulotlarim
          </Link>
          <Link
            to="/seller/dashboard/orders"
            className={`block px-4 py-2 rounded ${location.pathname.includes("orders") ? "bg-blue-600 text-white" : "hover:bg-gray-100"}`}
          >
            📦 Buyurtmalarim
          </Link>
          <Link
            to="/seller/dashboard/settings"
            className={`block px-4 py-2 rounded ${location.pathname.includes("settings") ? "bg-blue-600 text-white" : "hover:bg-gray-100"}`}
          >
            ⚙️ Sozlamalar
          </Link>
        </nav>

        <button
          onClick={handleLogout}
          className="mt-6 w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
        >
          🚪 Chiqish
        </button>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
