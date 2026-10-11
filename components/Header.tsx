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
        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/"
            className="shrink-0 font-display text-lg leading-none tracking-wide text-black transition hover:text-gold sm:text-2xl"
          >
            PONTO DA FARRA
          </Link>
          {searchActive ? (
            <form
              role="search"
              aria-label="Busca de produtos"
              onSubmit={handleSearch}
              className="min-w-0 flex-1"
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
            className="shrink-0 rounded-full bg-black px-3 py-2 text-xs font-semibold text-gold transition duration-200 hover:scale-105 hover:bg-neutral-900 sm:text-sm"
          >
            Carrinho({count})
          </Link>
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
