"use client";

import { useCart } from "@/context/CartContext";
import type { Product } from "@/data/products";

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <button
      type="button"
      onClick={() => addToCart(product)}
      aria-label={`Adicionar ${product.name} ao carrinho`}
      className="w-full rounded-full bg-black px-4 py-3 text-sm font-semibold text-gold transition duration-200 hover:scale-[1.02] hover:bg-neutral-900 active:scale-100 sm:w-auto sm:px-8"
    >
      Adicionar ao carrinho
    </button>
  );
}
