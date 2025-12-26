import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ShoppingCart, Menu, X } from "lucide-react";

export default function Navbar() {
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* 🔰 LOGO */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="Bazzaro"
              className="w-9 h-9 object-contain"
            />
            <span className="text-xl font-bold text-green-700">
              Bazzaro
            </span>
          </Link>

          {/* 🖥 DESKTOP MENU */}
          <div className="hidden md:flex space-x-6 items-center text-sm font-medium">
            <Link to="/" className="hover:text-green-600">
              Bosh sahifa
            </Link>
            <Link to="/categories" className="hover:text-green-600">
              Kategoriyalar
            </Link>
            <Link to="/shops" className="hover:text-green-600">
              Do‘konlar
            </Link>
            <Link to="/contact" className="hover:text-green-600">
              Aloqa
            </Link>

            <Link
              to="/seller"
              className="text-green-600 font-semibold hover:underline"
            >
              Sotuvchi bo‘lish
            </Link>

            <Link
              to="/register"
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              Xaridor bo‘lish
            </Link>
          </div>

          {/* 🛒 CART + SEARCH */}
          <div className="flex items-center gap-4">
            <Link to="/search" className="text-lg hover:text-green-600">
              🔍
            </Link>

            <Link to="/cart" className="relative hover:text-green-600">
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* 📱 MOBILE MENU BUTTON */}
            <button
              className="md:hidden"
              onClick={() => setOpen(!open)}
            >
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* 📱 MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-white border-t px-4 py-4 space-y-3 text-sm">
          <Link onClick={() => setOpen(false)} to="/">Bosh sahifa</Link>
          <Link onClick={() => setOpen(false)} to="/categories">Kategoriyalar</Link>
          <Link onClick={() => setOpen(false)} to="/shops">Do‘konlar</Link>
          <Link onClick={() => setOpen(false)} to="/contact">Aloqa</Link>
          <Link
            onClick={() => setOpen(false)}
            to="/seller"
            className="block font-semibold text-green-600"
          >
            Sotuvchi bo‘lish
          </Link>
          <Link
            onClick={() => setOpen(false)}
            to="/register"
            className="block bg-green-600 text-white text-center py-2 rounded-lg"
          >
            Xaridor bo‘lish
          </Link>
        </div>
      )}
    </nav>
  );
}
