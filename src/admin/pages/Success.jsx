import React from "react";

export default function Success() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-4xl font-bold text-green-600 mb-4">
        ✅ Buyurtmangiz qabul qilindi!
      </h1>
      <p className="text-lg text-gray-700 mb-6">
        Operator tez orada siz bilan bog‘lanadi.
      </p>
      <a
        href="/"
        className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
      >
        Bosh sahifaga qaytish
      </a>
    </div>
  );
}
