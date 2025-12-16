import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import api from "../../api";

// ✅ Validatsiya sxemasi
const schema = yup.object({
  email: yup.string().email("Email noto‘g‘ri").required("Email kiritilishi shart"),
  password: yup.string().min(6, "Parol kamida 6 belgidan iborat bo‘lishi kerak").required("Parol kiritilishi shart"),
});

export default function SellerLogin() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      const res = await api.post("/sellers/login", data);

      // Tokenni saqlash
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("seller", JSON.stringify(res.data.seller));

      navigate("/seller/dashboard");
    } catch (e) {
      console.error(e);
      alert("❌ Login xatosi: " + (e?.response?.data?.message || "Serverga ulanishda muammo"));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md"
      >
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Sotuvchi Login
        </h1>

        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className="w-full border border-gray-300 px-4 py-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <p className="text-red-500 text-sm">{errors.email?.message}</p>
        </div>

        <div className="mb-4">
          <input
            type="password"
            placeholder="Parol"
            {...register("password")}
            className="w-full border border-gray-300 px-4 py-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <p className="text-red-500 text-sm">{errors.password?.message}</p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
        >
          {isSubmitting ? "⏳ Kirilmoqda..." : "Kirish"}
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Akkauntingiz yo‘qmi?{" "}
          <a href="/seller/register" className="text-blue-600 hover:underline">
            Ro‘yxatdan o‘ting
          </a>
        </p>
      </form>
    </div>
  );
}
