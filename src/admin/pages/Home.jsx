import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// 🛍 Chegirmali mahsulotlar
const products = [
  {
    id: 1,
    name: "Mahsulot 1",
    price: 130000,
    oldPrice: 150000,
    image: "https://picsum.photos/300?random=1",
  },
  {
    id: 2,
    name: "Mahsulot 2",
    price: 125000,
    oldPrice: 140000,
    image: "https://picsum.photos/300?random=2",
  },
  {
    id: 3,
    name: "Mahsulot 3",
    price: 95000,
    oldPrice: 100000,
    image: "https://picsum.photos/300?random=3",
  },
  {
    id: 4,
    name: "Mahsulot 4",
    price: 145000,
    oldPrice: 160000,
    image: "https://picsum.photos/300?random=4",
  },
];

// 📸 Banner rasm manzillari
const bannerImages = [
  "/images/banner1.jpg",
  "/images/banner2.jpg",
  "https://picsum.photos/id/1018/1200/500"
];

// ▶️ Slayder sozlamalari
const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  autoplay: true,
  autoplaySpeed: 3000,
  slidesToShow: 1,
  slidesToScroll: 1
};

export default function Home() {
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div>
      {/* 🔹 Banner slider */}
      <section className="py-20">
        <Slider {...sliderSettings}>
          {bannerImages.map((img, index) => (
            <div key={index} className="relative text-white text-center">
              <img
                src={img}
                alt={`Banner ${index}`}
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="z-10 max-w-3xl mx-auto px-4">
                  <h1 className="text-4xl md:text-6xl font-bold mb-4">
                    Bazzaro Marketpleysiga xush kelibsiz
                  </h1>
                  <p className="text-lg md:text-xl mb-6">
                    Siz izlagan mahsulotlarning barchasi shu yerda!
                  </p>
                  <Link
                    to="/shop"
                    className="bg-white text-indigo-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
                  >
                    Hozir xarid qiling
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      {/* 🔸 Reklama banner */}
      <section className="bg-indigo-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0">
            <h2 className="text-3xl font-bold">🎁 Super taklif!</h2>
            <p className="mt-2">Bugun ro‘yxatdan o‘tib 10% chegirma oling.</p>
          </div>
          <Link
            to="/seller"
            className="bg-white text-indigo-600 px-5 py-3 rounded font-semibold hover:bg-gray-100"
          >
            Sotuvchi bo‘lish
          </Link>
        </div>
      </section>

      {/* 🛒 Mahsulotlar ro‘yxati */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Tavsiya etilgan mahsulotlar
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white shadow rounded-lg p-4 flex flex-col">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded mb-4"
              />
              <h3 className="text-lg font-semibold">{product.name}</h3>

              {/* Narxlar */}
              <div className="mb-4">
                <p className="text-gray-500 text-sm line-through">
                  {product.oldPrice?.toLocaleString()} so‘m
                </p>
                <p className="text-red-600 font-bold text-lg">
                  {product.price.toLocaleString()} so‘m
                </p>
              </div>

                {/* Muddatli to‘lov */}
                <p className="text-sm text-green-600 mb-4">💳 Muddatli to‘lov mavjud</p>

              <button
  onClick={() => handleAddToCart(product)}
  className="mt-auto bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded">
  
              Savatchaga qo‘shish
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
