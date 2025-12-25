import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

/* =======================
   Demo mahsulotlar
======================= */
const products = [
  {
    id: 1,
    name: "Mahsulot 1 juda sifatli va ishonchli",
    price: 130000,
    oldPrice: 150000,
    image: "https://picsum.photos/500?random=1",
  },
  {
    id: 2,
    name: "Mahsulot 2 kundalik foydalanish uchun",
    price: 125000,
    oldPrice: 140000,
    image: "https://picsum.photos/500?random=2",
  },
  {
    id: 3,
    name: "Mahsulot 3 arzon va qulay",
    price: 95000,
    oldPrice: 100000,
    image: "https://picsum.photos/500?random=3",
  },
  {
    id: 4,
    name: "Mahsulot 4 yangi model",
    price: 145000,
    oldPrice: 160000,
    image: "https://picsum.photos/500?random=4",
  },
];

/* =======================
   Banner rasmlar
======================= */
const bannerImages = [
  "https://picsum.photos/id/1018/1600/500",
  "https://picsum.photos/id/1015/1600/500",
  "https://picsum.photos/id/1019/1600/500",
];

/* =======================
   Slider sozlamalari
======================= */
const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 600,
  autoplay: true,
  autoplaySpeed: 3500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

/* =======================
   Helper: narx format
======================= */
const formatPrice = (price) =>
  price ? price.toLocaleString("uz-UZ") + " so‘m" : "";

export default function Home() {
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="bg-gray-50">
      {/* =======================
          BANNER SLIDER
      ======================= */}
      <section className="max-w-7xl mx-auto px-4 pt-6">
        <Slider {...sliderSettings}>
          {bannerImages.map((img, index) => (
            <div key={index} className="relative rounded-xl overflow-hidden">
              <img
                src={img}
                alt={`Banner ${index}`}
                className="w-full h-[420px] object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center">
                <div className="px-8 text-white max-w-xl">
                  <h1 className="text-4xl font-bold mb-3">
                    Bazzaro Marketpleys
                  </h1>
                  <p className="mb-5">
                    Eng ishonchli mahsulotlar – qulay narxlarda
                  </p>
                  <Link
                    to="/seller"
                    className="inline-block bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-lg font-semibold"
                  >
                    Sotuvchi bo‘lish
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      {/* =======================
          SUPER TAKLIF
      ======================= */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="bg-indigo-600 text-white rounded-xl p-6 flex flex-col md:flex-row items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">🎁 Super taklif!</h2>
            <p className="mt-1">
              Bugun ro‘yxatdan o‘ting va 10% chegirma oling
            </p>
          </div>
          <Link
            to="/seller/register"
            className="mt-4 md:mt-0 bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold"
          >
            Sotuvchi bo‘lish
          </Link>
        </div>
      </section>

      {/* =======================
          MAHSULOTLAR
      ======================= */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <h2 className="text-2xl font-bold mb-6">
          Tavsiya etilgan mahsulotlar
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition flex flex-col"
            >
              {/* IMAGE */}
              <div className="relative w-full aspect-square bg-gray-100 overflow-hidden rounded-t-xl">
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-contain p-3"
                />

                {/* Chegirma badge */}
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                  Chegirma
                </span>
              </div>

              {/* CONTENT */}
              <div className="p-4 flex flex-col flex-1">
                <h3 className="font-semibold text-sm line-clamp-2 mb-2">
                  {product.name}
                </h3>

                <p className="text-xs text-gray-400 line-through">
                  {formatPrice(product.oldPrice)}
                </p>

                <p className="text-lg font-bold text-red-600">
                  {formatPrice(product.price)}
                </p>

                <p className="text-xs text-green-600 mt-1">
                  💳 Muddatli to‘lov mavjud
                </p>

                <button
                  onClick={() => handleAddToCart(product)}
                  className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg text-sm"
                >
                  Savatchaga qo‘shish
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
