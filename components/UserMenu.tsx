"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function UserMenu() {
  const { user, signOut, me } = useAuth();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;


    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);


  function handleSignOut() {
    signOut();
    setIsOpen(false);
    router.push("/login");
  }

  return (
    <div ref={menuRef} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        className="flex flex-col items-center gap-1 rounded-2xl border-2 border-transparent p-2 text-black transition hover:border-black"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
          aria-hidden="true"
        >
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21a8 8 0 0 1 16 0" />
        </svg>
        <span className="max-w-[10rem] truncate text-xs font-medium sm:text-sm">
          {user?.name}
        </span>
      </button>

      {isOpen ? (
        <div
          role="menu"
          className="absolute right-0 top-full z-50 mt-2 w-56 rounded-2xl border border-cardline bg-surface p-4 shadow-xl"
        >
          <p className="truncate font-display text-lg leading-none tracking-wide text-black">
            {user?.name}
          </p>
          <p className="mt-1 truncate text-xs text-muted">{user?.role}</p>
          <p className="mt-1 truncate text-xs text-muted">{user?.email}</p>
          {user?.role === "Admin" ? (
            <Link
              href="/admin"
              className="mt-4 w-full rounded-full text-sm font-semibold text-black transition hover:text-gold"
            >
              Pagina de admin
            </Link>
          ) : null}
      
          <button
            type="button"
            role="menuitem"
            onClick={handleSignOut}
            className="mt-4 w-full rounded-full bg-black px-4 py-2 text-sm font-semibold text-gold transition hover:bg-neutral-900"
          >
            Sair
          </button>
        </div>
      ) : null}
    </div>
  );
}
