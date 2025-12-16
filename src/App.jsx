import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./admin/pages/Home";
import Cart from "./admin/pages/Cart";
import SellerRegister from "./seller/pages/Register";
import SellerLanding from "./pages/SellerLanding";
import ProductDetails from "./pages/ProductDetails";
// boshqa importlar: Login, Categories, About, etc.

export default function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/seller/register" element={<SellerRegister />} />
          <Route path="/seller" element={<SellerLanding />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          {/* boshqa marshrutlar: /seller/login, /categories, /about, /checkout, /success */}
          <Route path="*" element={<h2 style={{ padding: 24 }}>Sahifa topilmadi</h2>} />
        </Routes>
      </div>
    </Router>
  );
}