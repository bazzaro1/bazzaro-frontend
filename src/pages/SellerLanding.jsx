import React from "react";
import { Link } from "react-router-dom";

export default function SellerLanding() {
  return (
    <div className="bg-gray-50">

      {/* Hero bo‘limi */}
      <section className="bg-gradient-to-r from-gray-900 to-black text-white py-24 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Butun O‘zbekiston bo‘ylab savdo qiling
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-6">
          O‘z biznesingizni boshlang, mahsulotlaringizni minglab xaridorlarga taqdim eting va daromadingizni oshiring.
        </p>
        <Link
          to="/seller/register"
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-full"
        >
          🚀 Hozir boshlang
        </Link>
      </section>

      {/* Statistika qisqa raqamlar */}
      <section className="py-12 bg-white text-center">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h2 className="text-3xl font-bold text-indigo-600">10,000+</h2>
            <p className="text-gray-600">Faol sotuvchilar</p>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-indigo-600">823+</h2>
            <p className="text-gray-600">Mahsulot toifalari</p>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-indigo-600">14 kun</h2>
            <p className="text-gray-600">Ishga tushirish muddati</p>
          </div>
        </div>
      </section>

      {/* Afzalliklar */}
      <section className="py-16 bg-indigo-50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12 text-gray-800">
            Nega aynan Bazzaro?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-left">
            {[
              ["Ro‘yxatdan o‘tish oson", "Yagona forma orqali 5 daqiqada boshlang"],
              ["Marketing yordami", "Mahsulotlaringiz reklama qilinadi"],
              ["To‘liq statistika", "Har bir sotuv ustidan nazorat"],
              ["Onlayn boshqaruv", "Panel orqali buyurtmalarni boshqaring"],
            ].map(([title, desc], i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
                <h3 className="text-xl font-semibold mb-2 text-indigo-700">{title}</h3>
                <p className="text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Suratli demo qism */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12 px-4">
          <img
            src="/images/banner1.jpg"
            alt="Sotuvchi paneli"
            className="w-full md:w-1/2 rounded-lg shadow-lg"
          />
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Biznesingizni boshqarish oson!
            </h2>
            <p className="text-gray-600 mb-6">
              Intuitiv boshqaruv paneli orqali mahsulotlar, buyurtmalar va foydalanuvchi statistikasini bir joyda ko‘ring.
            </p>
            <Link
              to="/seller/register"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold"
            >
              💼 Ro‘yxatdan o‘tish
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-orange-500 text-white py-12 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Bugun qo‘shiling va 10% chegirma oling!
        </h2>
        <p className="mb-6">Biznesingizni yangi bosqichga olib chiqing</p>
        <Link
          to="/seller/register"
          className="bg-white text-orange-600 font-semibold px-6 py-3 rounded-full hover:bg-gray-100"
        >
          Bepul ro‘yxatdan o‘tish
        </Link>
      </section>

    </div>
  );
}
