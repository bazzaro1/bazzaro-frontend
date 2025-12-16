import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ShoppingCart } from "lucide-react";

export default function Navbar() {
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          Bazzaro
        </Link>

        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="hover:text-indigo-600">Bosh sahifa</Link>
          <Link to="/categories" className="hover:text-indigo-600">Kategoriyalar</Link>
          <Link to="/shops" className="hover:text-indigo-600">Do‘konlar</Link>
          <Link to="/contact" className="hover:text-indigo-600">Aloqa</Link>

          {/* ✅ To‘g‘ri yo‘nalish */}
          <Link to="/seller" className="hover:text-green-600 font-semibold">
            Sotuvchi bo‘lish
          </Link>

          <Link to="/register" className="hover:text-indigo-600 font-semibold">
            Xaridor bo‘lish
          </Link>
        </div>

        <div className="flex space-x-4 items-center">
          <Link to="/search" className="hover:text-indigo-600">🔍</Link>
          <Link to="/cart" className="relative hover:text-indigo-600">
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        {/* 🔸 Optional: Mobil menyu (agar kerak bo‘lsa) */}
        {/* <MobileMenu /> */}
      </div>
    </nav>
  );
}
