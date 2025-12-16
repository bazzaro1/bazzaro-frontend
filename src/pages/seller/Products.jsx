import React, { useEffect, useState } from "react";
import api from "../../api";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
  });
  const [editingId, setEditingId] = useState(null);

  // 🔹 Mahsulotlarni olish
  const fetchProducts = async () => {
    try {
      const res = await api.get("/seller/products");
      setProducts(res.data);
    } catch (e) {
      console.error(e);
      alert("❌ Mahsulotlarni yuklashda xatolik!");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 🔹 Forma o‘zgarishi
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔹 Saqlash (qo‘shish yoki tahrirlash)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/seller/products/${editingId}`, form);
        alert("✅ Mahsulot yangilandi!");
      } else {
        await api.post("/seller/products", form);
        alert("✅ Mahsulot qo‘shildi!");
      }
      setForm({ name: "", price: "", stock: "" });
      setEditingId(null);
      fetchProducts();
    } catch (e) {
      alert(e?.response?.data?.message || "❌ Xatolik!");
    }
  };

  // 🔹 Tahrirlash
  const handleEdit = (p) => {
    setForm({ name: p.name, price: p.price, stock: p.stock });
    setEditingId(p._id);
  };

  // 🔹 O‘chirish
  const handleDelete = async (id) => {
    if (!window.confirm("Mahsulotni o‘chirishni xohlaysizmi?")) return;
    try {
      await api.delete(`/seller/products/${id}`);
      alert("🗑️ Mahsulot o‘chirildi!");
      fetchProducts();
    } catch (e) {
      alert("❌ O‘chirishda xatolik!");
    }
  };

  return (
    <div className="page-container">
      <h2 className="page-title">📦 Mahsulotlarim</h2>

      {/* 🔹 Mahsulot qo‘shish / tahrirlash formasi */}
      <form onSubmit={handleSubmit} className="form">
        <input
          name="name"
          placeholder="Mahsulot nomi"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="price"
          type="number"
          placeholder="Narxi"
          value={form.price}
          onChange={handleChange}
          required
        />
        <input
          name="stock"
          type="number"
          placeholder="Soni"
          value={form.stock}
          onChange={handleChange}
          required
        />
        <button type="submit">
          {editingId ? "✏️ Yangilash" : "➕ Qo‘shish"}
        </button>
      </form>

      {/* 🔹 Mahsulotlar ro‘yxati */}
      <table className="table">
        <thead>
          <tr>
            <th>Nomi</th>
            <th>Narxi</th>
            <th>Soni</th>
            <th>Amallar</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((p) => (
              <tr key={p._id}>
                <td>{p.name}</td>
                <td>{p.price} so‘m</td>
                <td>{p.stock} dona</td>
                <td>
                  <button onClick={() => handleEdit(p)}>✏️</button>
                  <button onClick={() => handleDelete(p._id)}>🗑️</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">Mahsulotlar yo‘q</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
