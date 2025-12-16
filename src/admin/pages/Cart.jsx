import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateQuantity, removeFromCart } from "../../store/cartSlice";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">🛒 Savatcha</h2>

      {cart.length === 0 ? (
        <p className="text-gray-600 text-lg">Savatchangiz bo‘sh...</p>
      ) : (
        <div className="space-y-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border rounded-lg p-4 shadow bg-white"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={item.image || "https://via.placeholder.com/100"}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-gray-500">
                    {item.price.toLocaleString()} so‘m
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() =>
                    dispatch(
                      updateQuantity({ id: item.id, qty: item.quantity - 1 })
                    )
                  }
                  disabled={item.quantity <= 1}
                  className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-lg"
                >
                  -
                </button>
                <span className="font-semibold text-lg">{item.quantity}</span>
                <button
                  onClick={() =>
                    dispatch(
                      updateQuantity({ id: item.id, qty: item.quantity + 1 })
                    )
                  }
                  className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-lg"
                >
                  +
                </button>
              </div>

              <p className="font-bold text-orange-600">
                {(item.price * item.quantity).toLocaleString()} so‘m
              </p>

              <button
                onClick={() => dispatch(removeFromCart(item.id))}
                className="text-red-600 hover:text-red-800 font-semibold"
              >
                ❌
              </button>
            </div>
          ))}

          <div className="flex justify-between items-center border-t pt-4 mt-6">
            <h3 className="text-xl font-bold">Umumiy summa:</h3>
            <p className="text-2xl font-bold text-orange-600">
              {totalPrice.toLocaleString()} so‘m
            </p>
          </div>

          <button
            onClick={() => navigate("/checkout")}
            className="mt-4 w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-3 rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl transition-transform hover:scale-105"
          >
            Buyurtma berish
          </button>
        </div>
      )}
    </div>
  );
}
