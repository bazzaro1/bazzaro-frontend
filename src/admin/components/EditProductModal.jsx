import React, { useState, useEffect } from "react";
import { CATEGORIES } from "../constants/categories";

const EditProductModal = ({ show, onClose, onSave, product }) => {
  const SIZE_OPTIONS = ["S", "M", "L", "XL"];
  const COLOR_OPTIONS = ["Qora", "Oq", "Yashil", "Ko‘k"];

  const [form, setForm] = useState({
    name: "", price: "", parentCategory: "", subCategory: "",
    sizes: [], colors: [], imageFile: null, imagePreview: ""
  });

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name,
        price: product.price,
        parentCategory: product.category?.parent || "",
        subCategory: product.category?.sub || "",
        sizes: product.sizes || [],
        colors: product.colors || [],
        imageFile: null,
        imagePreview: product.image || ""
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "sizes" || name === "colors") {
      setForm(f => ({
        ...f,
        [name]: checked
          ? [...f[name], value]
          : f[name].filter(v => v !== value)
      }));
    } else {
      setForm(f => ({ ...f, [name]: value }));
      if (name === "parentCategory") {
        setForm(f => ({ ...f, subCategory: "" }));
      }
    }
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setForm(f => ({
      ...f,
      imageFile: file,
      imagePreview: URL.createObjectURL(file)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.parentCategory || !form.subCategory) {
      alert("Iltimos, barcha kategoriya bo‘limlarini tanlang");
      return;
    }
    onSave({
      name: form.name,
      price: form.price,
      category: { parent: form.parentCategory, sub: form.subCategory },
      sizes: form.sizes,
      colors: form.colors,
      image: form.imagePreview
    });
    onClose();
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded w-full max-w-lg shadow space-y-4"
      >
        <h2 className="text-xl font-bold">Mahsulotni tahrirlash</h2>

        <input
          name="name" placeholder="Nomi" required
          value={form.name} onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          name="price" placeholder="Narxi" required
          value={form.price} onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <select
          name="parentCategory"
          required
          value={form.parentCategory}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Katta kategoriya tanlang</option>
          {Object.keys(CATEGORIES).map(k => (
            <option key={k} value={k}>{k}</option>
          ))}
        </select>

        <select
          name="subCategory"
          required
          disabled={!form.parentCategory}
          value={form.subCategory}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Kichik kategoriya tanlang</option>
          {form.parentCategory && CATEGORIES[form.parentCategory].map(sub => (
            <option key={sub} value={sub}>{sub}</option>
          ))}
        </select>

        {/* checkboxlar razmer va rang */}
        <div>
          <span className="font-medium">Razmerlar:</span>
          <div className="flex flex-wrap space-x-2">
            {SIZE_OPTIONS.map(sz => (
              <label key={sz} className="inline-flex items-center space-x-1">
                <input type="checkbox" name="sizes" value={sz}
                  checked={form.sizes.includes(sz)}
                  onChange={handleChange}
                  className="form-checkbox"
                />
                <span>{sz}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <span className="font-medium">Ranglar:</span>
          <div className="flex flex-wrap space-x-2">
            {COLOR_OPTIONS.map(clr => (
              <label key={clr} className="inline-flex items-center space-x-1">
                <input type="checkbox" name="colors" value={clr}
                  checked={form.colors.includes(clr)}
                  onChange={handleChange}
                  className="form-checkbox"
                />
                <span>{clr}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <input type="file" accept="image/*" onChange={handleFile} className="mb-2" />
          {form.imagePreview && (
            <img src={form.imagePreview} alt="Preview"
              className="w-32 h-32 object-cover border rounded" />
          )}
        </div>

        <div className="flex justify-end space-x-2">
          <button type="button"
                  onClick={onClose}
                  className="bg-gray-300 px-4 py-2 rounded">
            Bekor
          </button>
          <button type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded">
            Saqlash
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProductModal;
