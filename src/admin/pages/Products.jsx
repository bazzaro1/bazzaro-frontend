import React, { useEffect, useState } from "react";
import ConfirmModal from "../components/ConfirmModal";
import EditProductModal from "../components/EditProductModal";
import AddProductModal from "../components/AddProductModal";

const API_URL = "http://localhost:5000/api/products";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [showAddModal, setShowAddModal] = useState(false);

  // 🔄 API’dan mahsulotlarni olish
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Xatolik:", err);
        setLoading(false);
      });
  }, []);

  // ➕ Qo‘shish (API POST)
  const handleAdd = async (newProduct) => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });
      const saved = await res.json();
      setProducts([saved, ...products]); // yangi mahsulotni qo‘shish
    } catch (err) {
      console.error("Qo‘shishda xatolik:", err);
    }
  };

  // ✏️ Tahrirlash
  const openEditModal = (product) => {
    setSelectedProduct(product);
    setShowEditModal(true);
  };

  const handleUpdate = async (updatedData) => {
    try {
      const res = await fetch(`${API_URL}/${selectedProduct.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      const updated = await res.json();
      setProducts(products.map((p) => (p.id === updated.id ? updated : p)));
    } catch (err) {
      console.error("Yangilashda xatolik:", err);
    }
  };

  // 🗑️ O‘chirish
  const openDeleteModal = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await fetch(`${API_URL}/${deleteId}`, { method: "DELETE" });
      setProducts(products.filter((p) => p.id !== deleteId));
      setShowDeleteModal(false);
    } catch (err) {
      console.error("O‘chirishda xatolik:", err);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Mahsulotlar ro'yxati</h2>

      <button
        onClick={() => setShowAddModal(true)}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        + Yangi mahsulot qo‘shish
      </button>

      {loading ? (
        <p>⏳ Yuklanmoqda...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border border-gray-300 bg-white rounded-lg shadow">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">Rasm</th>
                <th className="p-3">Nomi</th>
                <th className="p-3">Narxi</th>
                <th className="p-3">Kategoriya</th>
                <th className="p-3">Razmerlar</th>
                <th className="p-3">Ranglar</th>
                <th className="p-3">Amallar</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="border-t border-gray-200 hover:bg-gray-50"
                >
                  <td className="p-3">
                    <img
                      src={product.image || "https://via.placeholder.com/100"}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="p-3 font-medium">{product.name}</td>
                  <td className="p-3">{product.price}</td>
                  <td className="p-3">{product.category}</td>
                  <td className="p-3">{product.sizes?.join(", ")}</td>
                  <td className="p-3">{product.colors?.join(", ")}</td>
                  <td className="p-3 space-x-2">
                    <button
                      onClick={() => openEditModal(product)}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => openDeleteModal(product.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modallar */}
      <AddProductModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAdd}
      />

      <EditProductModal
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSave={handleUpdate}
        product={selectedProduct}
      />

      <ConfirmModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        message="Bu mahsulotni o‘chirishni istaysizmi?"
      />
    </div>
  );
};

export default Products;
