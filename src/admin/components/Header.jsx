import React from "react";

export default function Header({ toggleSidebar }) {
  return (
    <header className="flex justify-between items-center bg-white shadow px-4 py-2">
      {/* Mobil menyu tugmasi */}
      <button
        className="md:hidden text-2xl"
        onClick={toggleSidebar}
      >
        ☰
      </button>

      <h2 className="text-xl font-semibold">Admin Panel</h2>

      <div className="flex items-center space-x-4">
        <span className="text-gray-700">Admin</span>
        <img
          src="https://via.placeholder.com/32"
          alt="avatar"
          className="rounded-full"
        />
      </div>
    </header>
  );
}