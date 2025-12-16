import React from "react";
import { Navigate, useLocation } from "react-router-dom";

// type: 'admin' yoki 'seller'
const ProtectedRoute = ({ children, type }) => {
  const location = useLocation();

  // Admin tekshiruvi: Context yoki localStorage orqali user ma’lumot
  if (type === "admin") {
    const adminToken = localStorage.getItem("admin_token"); // admin login token
    if (!adminToken) {
      return <Navigate to="/admin/login" state={{ from: location }} replace />;
    }
  }

  // Seller tekshiruvi
  if (type === "seller") {
    const sellerToken = localStorage.getItem("token"); // seller login token
    if (!sellerToken) {
      return <Navigate to="/seller/login" state={{ from: location }} replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
