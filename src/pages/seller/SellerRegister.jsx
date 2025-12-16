import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../../api";

const schema = yup.object({
  fullName: yup.string().required("Ism familya kiritilishi shart"),
  shopName: yup.string().required("Do‘kon nomi kiritilishi shart"),
  email: yup.string().email("Email noto‘g‘ri").required("Email kiritilishi shart"),
  phone: yup.string().required("Telefon raqam kiritilishi shart"),
  tin: yup.string().required("STIR (TIN) kiritilishi shart"),
  bank: yup.object({
    account: yup.string().required("Hisob raqam kiritilishi shart"),
    mfo: yup.string().required("MFO kiritilishi shart"),
  }),
  password: yup.string().min(6, "Parol kamida 6 ta belgidan iborat bo‘lishi kerak").required("Parol kiritilishi shart"),
});

export default function SellerRegister() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      await api.post("/sellers/register", data);
      alert("✅ Ro‘yxatdan o‘tildi! Endi login qiling.");
      reset();
      window.location.href = "/seller/login";
    } catch (e) {
      console.error(e);
      alert("❌ Xato: " + (e?.response?.data?.message || "Server xatosi"));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-white">
      <form
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-2xl font-bold text-center text-orange-600 mb-6">
          Sotuvchi Ro‘yxatdan O‘tishi
        </h1>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <input
              className="input"
              placeholder="F.I.O"
              {...register("fullName")}
            />
            <p className="text-red-500 text-sm">{errors.fullName?.message}</p>
          </div>
          <div>
            <input
              className="input"
              placeholder="Do‘kon nomi"
              {...register("shopName")}
            />
            <p className="text-red-500 text-sm">{errors.shopName?.message}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <input
              className="input"
              placeholder="Email"
              {...register("email")}
            />
            <p className="text-red-500 text-sm">{errors.email?.message}</p>
          </div>
          <div>
            <input
              className="input"
              placeholder="Telefon"
              {...register("phone")}
            />
            <p className="text-red-500 text-sm">{errors.phone?.message}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <input
              className="input"
              placeholder="STIR (TIN)"
              {...register("tin")}
            />
            <p className="text-red-500 text-sm">{errors.tin?.message}</p>
          </div>
          <div>
            <input
              className="input"
              placeholder="Hisob raqam"
              {...register("bank.account")}
            />
            <p className="text-red-500 text-sm">{errors.bank?.account?.message}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <input
              className="input"
              placeholder="MFO"
              {...register("bank.mfo")}
            />
            <p className="text-red-500 text-sm">{errors.bank?.mfo?.message}</p>
          </div>
          <div>
            <input
              type="password"
              className="input"
              placeholder="Parol"
              {...register("password")}
            />
            <p className="text-red-500 text-sm">{errors.password?.message}</p>
          </div>
        </div>

        <button
          disabled={isSubmitting}
          type="submit"
          className="w-full bg-orange-600 text-white py-3 rounded-lg mt-6 hover:bg-orange-700 transition disabled:bg-gray-400"
        >
          {isSubmitting ? "⏳ Yuborilmoqda..." : "Ro‘yxatdan o‘tish"}
        </button>
      </form>
    </div>
  );
}
