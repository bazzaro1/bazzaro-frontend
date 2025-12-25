import React, { useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

/* ================= UTIL ================= */
const formatPrice = (price) =>
  new Intl.NumberFormat("uz-UZ").format(price) + " so‘m";

/* ================= DATA ================= */
const products = [
  {
    id: 1,
    name: "Mahsulot 1",
    price: 130000,
    oldPrice: 150000,
    image: "https://picsum.photos/400?random=1",
  },
  {
    id: 2,
    name: "Mahsulot 2",
    price: 125000,
    oldPrice: 140000,
    image: "https://picsum.photos/400?random=2",
  },
  {
    id: 3,
    name: "Mahsulot 3",
    price: 95000,
    oldPrice: 100000,
    image: "https://picsum.photos/400?random=3",
  },
  {
    id: 4,
    name: "Mahsulot 4",
    price: 145000,
    oldPrice: 160000,
    image: "https://picsum.photos/400?random=4",
  },
];

const bannerImages = [
  "/images/banner1.jpg",
  "/images/banner2.jpg",
  "https://picsum.photos/id/1018/1200/500",
];

/* ================= COMPONENT ================= */
export default function Home() {
  const dispatch = useDispatch();

  const sliderSettings = useMemo(
    () => ({
      dots: true,
      infinite: true,
      speed: 600,
      autoplay: true,
      autoplaySpeed: 3500,
      arrows: false,
      slidesToShow: 1,
      slidesToScroll: 1,
    }),
    []
  );

  const handleAddToCart = useCallback(
    (product) => {
      dispatch(addToCart(product));
    },
    [dispatch]
  );

  return (
    <div className="bg-gray-50">
      {/* ================= SLIDER ================= */}
      <section className="relative">
        <Slider {...sliderSettings}>
          {bannerImages.map((img, index) => (
            <div key={index} className="relative">
              <img
                src={img}
                alt={`Banner ${index}`}
                loading="lazy"
                className="w-full h-[260px] md:h-[420px] object-cover"
              />

              <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-center">
                <div className="max-w-3xl px-4">
                  <h1 className="text-2xl md:text-5xl font-bold text-white mb-4">
                    Bazzaro Marketpleysiga xush kelibsiz
                  </h1>
                  <p className="text-white/90 mb-6">
                    Siz izlagan mahsulotlarning barchasi shu yerda!
                  </p>
                  <Link
                    to="/shop"
                    className="inline-block bg-white text-indigo-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-white"
                  >
                    Hozir xarid qiling
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      {/* ================= PROMO ================= */}
      <section className="bg-indigo-600 text-white py-10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold">🎁 Super taklif!</h2>
            <p className="mt-2 opacity-90">
              Bugun ro‘yxatdan o‘tib 10% chegirma oling.
            </p>
          </div>
          <Link
            to="/seller"
            className="mt-4 md:mt-0 bg-white text-indigo-600 px-6 py-3 rounded font-semibold hover:bg-gray-100 transition"
          >
            Sotuvchi bo‘lish
          </Link>
        </div>
      </section>

      {/* ================= PRODUCTS ================= */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <h2 className="text-2xl font-bold text-center mb-8">
          Tavsiya etilgan mahsulotlar
        </h2>

        {products.length === 0 ? (
          <div className="text-center text-gray-500 py-20">
            Hozircha mahsulotlar mavjud emas
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow hover:shadow-lg transition flex flex-col"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  className="w-full h-44 object-cover rounded-t-xl"
                />

                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-semibold text-lg mb-1">
                    {product.name}
                  </h3>

                  <p className="text-sm text-gray-500 line-through">
                    {formatPrice(product.oldPrice)}
                  </p>
                  <p className="text-lg font-bold text-red-600">
                    {formatPrice(product.price)}
                  </p>

                  <p className="text-sm text-green-600 mt-2">
                    💳 Muddatli to‘lov mavjud
                  </p>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className="mt-auto bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] transition text-white py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  >
                    Savatchaga qo‘shish
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
