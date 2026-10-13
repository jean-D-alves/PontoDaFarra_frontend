"use client";

import { useState } from "react";
import Link from "next/link";

const links = [
  { href: "/admin/produtos", label: "Produtos" },
  { href: "/admin/categorias", label: "Categorias" },
];

export default function Slidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const close = () => setIsOpen(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Abrir menu"
        aria-expanded={isOpen}
        className="fixed left-4 top-4 z-40 flex h-10 w-10 items-center justify-center rounded-full bg-black text-gold shadow-lg transition hover:bg-neutral-900 md:hidden"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="h-5 w-5"
          aria-hidden="true"
        >
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {isOpen ? (
        <div
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          onClick={close}
          aria-hidden="true"
        />
      ) : null}

      <div
        className={`fixed inset-0 z-50 flex flex-col gap-4 bg-black p-8 text-ph transition-transform duration-300 md:sticky md:inset-auto md:top-0 md:z-10 md:h-screen md:w-1/4 md:shrink-0 md:translate-x-0 md:gap-2 md:border-r-2 md:border-black md:p-10 md:py-20 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          type="button"
          onClick={close}
          aria-label="Fechar menu"
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full text-2xl leading-none text-ph transition hover:text-gold md:hidden"
        >
          ×
        </button>

        <Link
          href="/"
          onClick={close}
          className="shrink-0 font-display text-2xl leading-none tracking-wide text-ph transition hover:text-gold sm:text-2xl"
        >
          PONTO DA FARRA
        </Link>

        <nav className="mt-4 flex flex-col gap-4 md:mt-0 md:gap-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={close}
              className="shrink-0 text-lg font-medium transition hover:text-gold md:text-sm"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
