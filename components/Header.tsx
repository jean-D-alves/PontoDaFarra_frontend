"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import UserMenu from "@/components/UserMenu";
import { GetCategories } from "@/handle/Category";
import type { Category } from "@/data/categories";

const fallbackCategories: Category[] = [
  { id: "Bebidas", name: "Bebidas" },
  { id: "Comidas", name: "Comidas" },
];

type HeaderProp = {
  categoryActive: boolean;
  searchActive: boolean;
};

export default function Header({ categoryActive, searchActive }: HeaderProp) {
  const { count } = useCart();
  const { user } = useAuth();
  const [search, setSearch] = useState<string>("");
  const pathname = usePathname();
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>(fallbackCategories);

  useEffect(() => {
    let active = true;
    GetCategories().then((data) => {
      if (active && data.length > 0) setCategories(data);
    });

    return () => {
      active = false;
    };
  }, []);

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const q = search.trim();
    if (q) router.push(`/produtos/search?q=${encodeURIComponent(q)}`);
  };

  const currentPath = decodeURIComponent(pathname);

  return (
    <header className="sticky top-0 z-50 border-b border-cardline bg-page/95 backdrop-blur">
      <div className="mx-auto w-full max-w-6xl px-4 py-3 sm:px-6">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-3 sm:gap-x-4">
          <Link
            href="/"
            className="shrink-0 font-display text-base leading-none tracking-wide text-black transition hover:text-gold min-[380px]:text-lg sm:text-2xl"
          >
            PONTO DA FARRA
          </Link>

          <div className="ml-auto flex shrink-0 items-center gap-2 sm:ml-0 sm:order-last sm:gap-4">
            {!user ? (
              <Link
                href="/login"
                className="shrink-0 text-xs font-medium text-black transition hover:text-gold sm:text-sm"
              >
                Entrar
              </Link>
            ) : (
              <UserMenu />
            )}

            <Link
              href="/carrinho"
              aria-label={`Abrir carrinho com ${count} ${
                count === 1 ? "item" : "itens"
              }`}
            className="flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-black px-3 py-2 text-xs font-semibold text-gold transition duration-200 hover:scale-105 hover:bg-neutral-900 sm:text-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <circle cx="9" cy="20" r="1.5" />
              <circle cx="18" cy="20" r="1.5" />
              <path d="M2 3h2.5l2.2 11.2a1.5 1.5 0 0 0 1.5 1.2h8.6a1.5 1.5 0 0 0 1.5-1.2L21 7H6" />
            </svg>
            <span className="hidden sm:inline">Carrinho</span>
            <span>({count})</span>
          </Link>
          </div>

          {searchActive ? (
            <form
              role="search"
              aria-label="Busca de produtos"
              onSubmit={handleSearch}
              className="order-last min-w-0 w-full sm:order-none sm:w-auto sm:flex-1"
            >
              <input
                type="search"
                name="q"
                aria-label="Pesquise cervejas, vodka, refrigerante"
                placeholder="Pesquise cervejas, vodka, refrigerante..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-full border border-cardline bg-white px-4 py-2 text-xs text-black placeholder:text-muted sm:text-sm"
              />
            </form>
          ) : null}
        </div>

        {categoryActive ? (
          <nav aria-label="Categorias de produtos" className="mt-3">
            <ul className="no-scrollbar flex items-center gap-4 overflow-x-auto sm :gap-6">
              <li>
                <Link
                  href="/#ofertas"
                  aria-current={currentPath === "/" ? "page" : undefined}
                  className={`block whitespace-nowrap border-b-2 pb-1 text-sm font-medium transition sm:text-base ${
                    currentPath === "/"
                      ? "border-gold text-black"
                      : "border-transparent text-muted hover:text-black"
                  }`}
                >
                  Oferta
                </Link>
              </li>

              {categories.slice(0, 4).map((category) => {
                const href = `/categoria/${encodeURIComponent(category.name)}`;
                const isActive = currentPath === `/categoria/${category.name}`;

                return (
                  <li key={category.id ?? category.name}>
                    <Link
                      href={href}
                      aria-current={isActive ? "page" : undefined}
                      className={`block whitespace-nowrap border-b-2 pb-1 text-sm font-medium transition sm:text-base ${
                        isActive
                          ? "border-gold text-black"
                          : "border-transparent text-muted hover:text-black"
                      }`}
                    >
                      {category.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        ) : null}
      </div>
    </header>
  );
}
