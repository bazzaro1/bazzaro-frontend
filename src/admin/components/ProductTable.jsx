import React from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

export default function ProductTable() {
  const products = [
    { id: 1, name: "iPhone 13 Pro", category: "Telefon", price: "12,990,000", stock: 24 },
    { id: 2, name: "Samsung Galaxy S22", category: "Telefon", price: "11,500,000", stock: 18 },
    { id: 3, name: "MacBook Pro M1", category: "Noutbuk", price: "18,500,000", stock: 8 },
  ];

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nomi</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategoriya</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Narxi</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sotuvda</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Harakatlar</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products.map((product) => (
            <tr key={product.id}>
              <td className="px-6 py-4 whitespace-nowrap">#{product.id}</td>
              <td className="px-6 py-4 whitespace-nowrap font-medium">{product.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{product.category}</td>
              <td className="px-6 py-4 whitespace-nowrap">{product.price} so'm</td>
              <td className="px-6 py-4 whitespace-nowrap">{product.stock} ta</td>
              <td className="px-6 py-4 whitespace-nowrap flex space-x-2">
                <button className="text-blue-600 hover:text-blue-900">
                  <FiEdit size={18} />
                </button>
                <button className="text-red-600 hover:text-red-900">
                  <FiTrash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}