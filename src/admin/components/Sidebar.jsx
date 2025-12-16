import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-900 text-white h-screen p-4 flex-shrink-0">
      <h2 className="text-xl font-bold mb-6">Bazzaro Admin</h2>
      <ul className="space-y-4">
        <li><Link to="/admin/dashboard" className="hover:text-teal-400">Dashboard</Link></li>
        <li><Link to="/admin/orders" className="hover:text-teal-400">Orders</Link></li>
        <li><Link to="/admin/products" className="hover:text-teal-400">Products</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
