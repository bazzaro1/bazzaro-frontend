import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Home() {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://api.bazzaro.uz/api/products") // API manzilni tekshir
      .then((res) => {
        setProducts(res.data.data || res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Products error:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* HERO */}
      <div className="max-w-7xl mx-auto px-4 pt-6">
        <div className="rounded-2xl overflow-hidden relative">
          <img
            src="https://picsum.photos/1200/400"
            alt="Hero"
            className="w-full h-[220px] sm:h-[300px] object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white">
            <h1 className="text-2xl sm:text-4xl font-bold mb-2 text-center">
              Bazzaro Marketpleysiga xush kelibsiz
            </h1>
            <p className="text-sm sm:text-base mb-4">
              Siz izlagan mahsulotlarning barchasi shu yerda
            </p>
            <Link
              to="/products"
              className="bg-white text-black px-5 py-2 rounded-full font-semibold hover:bg-gray-200"
            >
              Hozir xarid qiling
            </Link>
          </div>
        </div>
      </div>

      {/* SUPER TAKLIF */}
      <div className="max-w-7xl mx-auto px-4 py-6 text-center">
        🎁 <span className="font-semibold">Super taklif!</span>
        <p className="text-sm text-gray-600">
          Bugun ro‘yxatdan o‘ting va 10% chegirma oling
        </p>
        <Link
          to="/seller"
          className="text-indigo-600 text-sm font-medium"
        >
          Sotuvchi bo‘lish
        </Link>
      </div>

      {/* MAHSULOTLAR */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        <h2 className="text-xl font-bold mb-4">
          Tavsiya etilgan mahsulotlar
        </h2>

        {loading ? (
          <div className="text-center py-20">Yuklanmoqda...</div>
        ) : (
          <div
            className="
              grid
              grid-cols-2
              sm:grid-cols-3
              md:grid-cols-4
              lg:grid-cols-5
              gap-4
            "
          >
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow hover:shadow-lg transition flex flex-col overflow-hidden"
              >
                {/* RASM */}
                <div className="w-full h-[180px] bg-gray-100 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* INFO */}
                <div className="p-3 flex flex-col flex-1">
                  <h3 className="text-sm font-medium line-clamp-2 mb-2">
                    {product.name}
                  </h3>

                  <div className="mb-3">
                    {product.oldPrice && (
                      <p className="text-xs text-gray-400 line-through">
                        {product.oldPrice.toLocaleString()} so‘m
                      </p>
                    )}
                    <p className="text-red-600 font-bold text-sm">
                      {product.price.toLocaleString()} so‘m
                    </p>
                  </div>

                  <button
                    onClick={() => dispatch(addToCart(product))}
                    className="mt-auto bg-indigo-600 hover:bg-indigo-700 text-white text-xs py-2 rounded-lg"
                  >
                    Savatchaga
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
