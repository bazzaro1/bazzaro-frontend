import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token"); // Token localStorage'dan olinadi

  if (!token) {
    return <Navigate to="/seller/login" replace />; // Agar token bo'lmasa — login sahifasiga yuboriladi
  }

  return children; // Agar token bo'lsa — ichidagi component'ni ko'rsatadi
}
