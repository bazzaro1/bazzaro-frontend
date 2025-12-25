import React, { useEffect, useState, useCallback } from "react";
import ConfirmModal from "../components/ConfirmModal";
import EditProductModal from "../components/EditProductModal";
import AddProductModal from "../components/AddProductModal";

const API_URL = import.meta.env.VITE_API_URL + "/products";

/* ================= UTIL ================= */
const formatPrice = (price) =>
  new Intl.NumberFormat("uz-UZ").format(price) + " so‘m";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [showAddModal, setShowAddModal] = useState(false);

  /* ================= FETCH ================= */
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Mahsulotlarni yuklab bo‘lmadi");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
      setError("Xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  /* ================= ADD ================= */
  const handleAdd = async (newProduct) => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });
      if (!res.ok) throw new Error();
      const saved = await res.json();
      setProducts((prev) => [saved, ...prev]);
    } catch (err) {
      console.error("Qo‘shishda xatolik:", err);
    }
  };

  /* ================= EDIT ================= */
  const handleUpdate = async (updatedData) => {
    try {
      const res = await fetch(`${API_URL}/${selectedProduct.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      if (!res.ok) throw new Error();
      const updated = await res.json();
      setProducts((prev) =>
        prev.map((p) => (p.id === updated.id ? updated : p))
      );
      setShowEditModal(false);
    } catch (err) {
      console.error("Yangilashda xatolik:", err);
    }
  };

  /* ================= DELETE ================= */
  const openDeleteModal = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await fetch(`${API_URL}/${deleteId}`, { method: "DELETE" });
      setProducts((prev) => prev.filter((p) => p.id !== deleteId));
    } catch (err) {
      console.error("O‘chirishda xatolik:", err);
    } finally {
      setDeleteId(null);
      setShowDeleteModal(false);
    }
  };

  /* ================= RENDER ================= */
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Mahsulotlar</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          + Yangi mahsulot
        </button>
      </div>

      {loading && (
        <div className="py-10 text-center text-gray-500">
          ⏳ Yuklanmoqda...
        </div>
      )}

      {error && (
        <div className="py-10 text-center text-red-500">{error}</div>
      )}

      {!loading && products.length === 0 && (
        <div className="py-10 text-center text-gray-400">
          Mahsulotlar topilmadi
        </div>
      )}

      {!loading && products.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg">
            <thead className="bg-gray-100 text-sm">
              <tr>
                <th className="p-3">Rasm</th>
                <th className="p-3">Nomi</th>
                <th className="p-3">Narxi</th>
                <th className="p-3">Kategoriya</th>
                <th className="p-3">Razmer</th>
                <th className="p-3">Rang</th>
                <th className="p-3 text-right">Amallar</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="p-3">
                    <img
                      src={product.image || "https://via.placeholder.com/100"}
                      alt={product.name}
                      className="w-14 h-14 rounded object-cover"
                      loading="lazy"
                    />
                  </td>
                  <td className="p-3 font-medium">{product.name}</td>
                  <td className="p-3">{formatPrice(product.price)}</td>
                  <td className="p-3">{product.category}</td>
                  <td className="p-3">{product.sizes?.join(", ")}</td>
                  <td className="p-3">{product.colors?.join(", ")}</td>
                  <td className="p-3 text-right space-x-2">
                    <button
                      onClick={() => {
                        setSelectedProduct(product);
                        setShowEditModal(true);
                      }}
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

      {/* ================= MODALS ================= */}
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
