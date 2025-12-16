import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';

export default function ProductCard({ product }) {
  const dispatch = useDispatch();

  const handleAdd = () => {
    console.log('Clicked product:', product);
    dispatch(addToCart(product));
  };

  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>{product.price.toLocaleString()} so‘m</p>
      <button
        className="mt-2 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
        onClick={handleAdd}
      >
        Savatchaga qo‘shish
      </button>
    </div>
  );
}