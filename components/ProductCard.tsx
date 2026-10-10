"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice, type Product } from "@/data/products";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <li className="flex h-full flex-col rounded-2xl border border-cardline bg-surface p-3">
      <Link
        href={`/produtos/${product.id}`}
        className="flex flex-1 flex-col transition hover:opacity-90"
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-ph">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              sizes="(min-width: 768px) 25vw, (min-width: 430px) 33vw, 50vw"
              className="object-cover"
            />
          ) : null}
        </div>

        <div className="mt-3 flex flex-1 flex-col">
          <h3 className="text-sm font-medium leading-snug text-black sm:text-base">
            {product.name}
          </h3>

          <p className="mt-1 text-xs text-muted">{product.description}</p>

          <p className="mt-2 text-base font-semibold text-black sm:text-lg">
            {formatPrice(product.value)}
          </p>
        </div>
      </Link>

      <button
        type="button"
        onClick={() => addToCart(product)}
        aria-label={`Adicionar ${product.name} ao carrinho`}
        className="mt-3 w-full rounded-full bg-black px-2 py-2 text-[11px] font-semibold leading-tight text-gold transition duration-200 hover:scale-[1.02] hover:bg-neutral-900 active:scale-100 sm:px-3 sm:text-xs"
      >
        Adicionar ao carrinho
      </button>
    </li>
  );
}
