import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";

export default function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Demo mahsulot ma’lumotlari
  const product = {
    id,
    name: `Mahsulot ${id}`,
    price: 130000,
    oldPrice: 150000,
    description: "Bu mahsulot haqida batafsil ma’lumot. Juda sifatli, kafolatli va foydalanuvchilar tomonidan tavsiya etilgan.",
    seller: "Bazzaro Official Store",
    rating: 4.7,
    reviews: [
      { user: "Ali", comment: "Zo‘r mahsulot! Tavsiya qilaman." },
      { user: "Dilnoza", comment: "Narxi va sifati juda mos!" },
    ],
    images: [
      "https://picsum.photos/600/400?random=1",
      "https://picsum.photos/600/400?random=2",
      "https://picsum.photos/600/400?random=3",
    ],
    installmentMonths: [6, 12, 24], // muddatli to‘lov variantlari
  };

  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [selectedInstallment, setSelectedInstallment] = useState(product.installmentMonths[0]);

  const installmentPrice = Math.round(product.price / selectedInstallment);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    navigate("/cart");
  };

  const handleBuyNow = () => {
    dispatch(addToCart(product));
    navigate("/checkout");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Mahsulot rasmi & galereya */}
        <div>
          <img
            src={selectedImage}
            alt={product.name}
            className="w-full h-96 object-cover rounded-xl shadow-md"
          />
          <div className="flex gap-4 mt-4">
            {product.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`thumb-${idx}`}
                className={`w-24 h-24 object-cover rounded-lg border cursor-pointer ${
                  img === selectedImage ? "border-indigo-600" : "border-gray-300"
                }`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Mahsulot ma’lumotlari */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

          <div className="mb-4">
            <p className="text-gray-500 line-through text-sm">
              {product.oldPrice.toLocaleString()} so‘m
            </p>
            <p className="text-red-600 text-2xl font-bold">
              {product.price.toLocaleString()} so‘m
            </p>
          </div>

          <p className="text-gray-700 mb-6">{product.description}</p>

          <p className="mb-2">
            <span className="font-semibold">Sotuvchi:</span>{" "}
            <span className="text-gray-800">{product.seller}</span>
          </p>

          <p className="mb-6">⭐ Reyting: {product.rating} / 5</p>

          {/* Muddatli to‘lov tanlovi */}
          <div className="mb-6">
            <label className="font-semibold mr-2">Muddatli to‘lov:</label>
            <select
              className="border rounded-lg px-3 py-2"
              value={selectedInstallment}
              onChange={(e) => setSelectedInstallment(Number(e.target.value))}
            >
              {product.installmentMonths.map((m) => (
                <option key={m} value={m}>{m} oy</option>
              ))}
            </select>
            <p className="text-sm text-green-700 mt-2">
              Oyiga to‘lov: {installmentPrice.toLocaleString()} so‘m
            </p>
          </div>

          {/* Tugmalar */}
          <div className="flex flex-col gap-3">
            <button
              onClick={handleAddToCart}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold"
            >
              Savatchaga qo‘shish
            </button>
            <button
              onClick={handleBuyNow}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold"
            >
              Sotib olish
            </button>
          </div>
        </div>
      </div>

      {/* Foydalanuvchi sharhlari */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Foydalanuvchi sharhlari</h2>
        <div className="space-y-4">
          {product.reviews.map((review, idx) => (
            <div key={idx} className="bg-white p-4 rounded-xl shadow">
              <p className="font-semibold">{review.user}:</p>
              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
