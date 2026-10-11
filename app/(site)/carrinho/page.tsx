"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data/products";

function BeerEmptyIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M24 22h40v46a6 6 0 0 1-6 6H30a6 6 0 0 1-6-6V22Z"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <path
        d="M64 32h6a8 8 0 0 1 8 8v8a8 8 0 0 1-8 8h-6"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <path
        d="M32 58h24"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeDasharray="4 6"
      />
    </svg>
  );
}

export default function CarrinhoPage() {
  const { items, count, hydrated, removeFromCart,sendToWhatsApp, clearCart } = useCart();

  const total = items.reduce(
    (sum, item) => sum + item.product.value * item.quantity,
    0,
  );

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-semibold text-muted transition hover:text-black"
      >
        ← Continuar comprando
      </Link>

      <h1 className="mt-6 font-display text-4xl leading-none tracking-wide text-black sm:text-5xl">
        Meu carrinho
      </h1>

      {!hydrated ? null : items.length === 0 ? (
        <div className="mt-8 flex flex-col items-center justify-center rounded-2xl border border-dashed border-cardline bg-surface px-6 py-16 text-center">
          <BeerEmptyIcon className="h-24 w-24 text-muted" />

          <h2 className="mt-6 font-display text-2xl tracking-wide text-black sm:text-3xl">
            Seu carrinho está vazio
          </h2>

          <p className="mt-2 max-w-sm text-sm text-muted">
            Você ainda não tem nenhum produto no carrinho. Bora garantir uma
            gelada?
          </p>

          <Link
            href="/"
            className="mt-6 rounded-full bg-black px-6 py-3 text-sm font-semibold text-gold transition duration-200 hover:scale-[1.02] hover:bg-neutral-900 active:scale-100"
          >
            Ver produtos
          </Link>
        </div>
      ) : (
        <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-start">
          <ul className="flex flex-1 flex-col gap-3 sm:gap-4">
            {items.map((item) => (
              <li
                key={item.product.id}
                className="flex items-center gap-3 rounded-2xl border border-cardline bg-surface p-3 sm:gap-4 sm:p-4"
              >
                <Link
                  href={`/produtos/${item.product.id}`}
                  className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-ph sm:h-24 sm:w-24"
                >
                  {item.product.imageUrl ? (
                    <Image
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  ) : null}
                </Link>

                <div className="min-w-0 flex-1">
                  <Link
                    href={`/produtos/${item.product.id}`}
                    className="block truncate text-sm font-medium text-black transition hover:text-gold sm:text-base"
                  >
                    {item.product.name}
                  </Link>

                  <p className="mt-1 text-xs text-muted">
                    Quantidade: {item.quantity}
                  </p>

                  <p className="mt-1 text-sm font-semibold text-black sm:text-base">
                    {formatPrice(item.product.value)}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => removeFromCart(item.product.id)}
                  aria-label={`Remover ${item.product.name} do carrinho`}
                  className="shrink-0 rounded-full border border-cardline px-3 py-2 text-xs font-semibold text-muted transition hover:border-black hover:text-black"
                >
                  Remover
                </button>
              </li>
            ))}
          </ul>

          <aside className="w-full rounded-2xl border border-cardline bg-surface p-4 sm:p-6 lg:w-72">
            <h2 className="font-display text-xl tracking-wide text-black">
              Resumo
            </h2>

            <dl className="mt-4 flex flex-col gap-2 text-sm">
              <div className="flex items-center justify-between text-muted">
                <dt>Itens</dt>
                <dd>{count}</dd>
              </div>

              <div className="flex items-center justify-between border-t border-cardline pt-2 text-base font-semibold text-black">
                <dt>Total</dt>
                <dd>{formatPrice(total)}</dd>
              </div>
            </dl>

            <button
              type="button"
              onClick={clearCart}
              className="mt-6 w-full rounded-full border border-cardline px-4 py-3 text-sm font-semibold text-muted transition hover:border-black hover:text-black"
            >
              Limpar carrinho
            </button>
            <button
              type="button"
              onClick={sendToWhatsApp}
              className="mt-6 w-full rounded-full border shadow-[0px_4px_6px_0px_rgba(0,0,0,0.1)] bg-gold px-4 py-3 text-sm font-semibold text-black transition hover:border-black"
            >
              Comprar
            </button>
          </aside>
        </div>
      )}
    </div>
  );
}
