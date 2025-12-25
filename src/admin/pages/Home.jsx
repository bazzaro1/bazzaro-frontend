import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

/* =======================
   DEMO MAHSULOTLAR
======================= */
const products = [
  {
    id: 1,
    name: "Mahsulot 1",
    price: 130000,
    oldPrice: 150000,
    image: "https://picsum.photos/600/400?random=1",
  },
  {
    id: 2,
    name: "Mahsulot 2",
    price: 125000,
    oldPrice: 140000,
    image: "https://picsum.photos/600/400?random=2",
  },
  {
    id: 3,
    name: "Mahsulot 3",
    price: 95000,
    oldPrice: 110000,
    image: "https://picsum.photos/600/400?random=3",
  },
  {
    id: 4,
    name: "Mahsulot 4",
    price: 145000,
    oldPrice: 165000,
    image: "https://picsum.photos/600/400?random=4",
  },
];

/* =======================
   BANNERLAR
======================= */
const bannerImages = [
  "https://picsum.photos/id/1018/1600/600",
  "https://picsum.photos/id/1015/1600/600",
];

/* =======================
   SLIDER SOZLAMASI
======================= */
const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  autoplay: true,
  autoplaySpeed: 4000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export default function Home() {
  const dispatch = useDispatch();

  return (
    <div className="bg-gray-50">

      {/* =======================
         HERO / BANNER
      ======================= */}
      <section className="mb-12">
        <Slider {...sliderSettings}>
          {bannerImages.map((img, index) => (
            <div key={index} className="relative">
              <img
                src={img}
                alt="Banner"
                className="w-full h-[420px] object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="text-center text-white px-4">
                  <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    Bazzaro Marketpleysi
                  </h1>
                  <p className="mb-6 text-lg">
                    Eng sifatli mahsulotlar – eng qulay narxlarda
                  </p>
                  <Link
                    to="/shop"
                    className="inline-block bg-white text-indigo-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100"
                  >
                    Xaridni boshlash
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      {/* =======================
         REKLAMA
      ======================= */}
      <section className="bg-indigo-600 text-white py-10 mb-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">🎁 Super taklif!</h2>
            <p>Bugun ro‘yxatdan o‘ting va 10% chegirma oling</p>
          </div>
          <Link
            to="/seller"
            className="mt-4 md:mt-0 bg-white text-indigo-600 px-6 py-3 rounded font-semibold"
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
    <div key={product.id} className="bg-white rounded-xl shadow hover:shadow-lg transition flex flex-col overflow-hidden">
      
      {/* RASM */}
      <div className="w-full aspect-[4/3] bg-gray-100 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* INFO */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-sm mb-2 line-clamp-2">
          {product.name}
        </h3>

        <div className="mb-3">
          <p className="text-xs text-gray-400 line-through">
            {product.oldPrice.toLocaleString()} so‘m
          </p>
          <p className="text-red-600 font-bold">
            {product.price.toLocaleString()} so‘m
          </p>
        </div>

        <button
          onClick={() => dispatch(addToCart(product))}
          className="mt-auto bg-indigo-600 hover:bg-indigo-700 text-white text-sm py-2 rounded"
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
