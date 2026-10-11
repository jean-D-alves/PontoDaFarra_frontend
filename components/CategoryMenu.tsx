"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { DeleteCategory, UpdateCategory } from "@/handle/Category";
import type { Category } from "@/data/categories";

export default function CategoryMenu({ category }: { category: Category }) {
  const router = useRouter();
  const { user, token } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isMenuOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  function openModal() {
    setIsMenuOpen(false);
    setError(null);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setError(null);
  }

  async function handleUpdate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const name = new FormData(form).get("name")?.toString().trim() ?? "";

    if (!user || !token) {
      setError("Você precisa estar autenticado.");
      return;
    }

    setIsSaving(true);
    setError(null);

    try {
      await UpdateCategory(category.id, name, user, token);
      closeModal();
      router.refresh();
    } catch {
      setError("Não foi possível atualizar a categoria. Tente novamente.");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete() {
    if (
      !window.confirm(`Deseja realmente deletar a categoria "${category.name}"?`)
    )
      return;

    if (!user || !token) {
      setError("Você precisa estar autenticado.");
      return;
    }

    setIsDeleting(true);
    setError(null);

    try {
      await DeleteCategory(category.id, user, token);
      setIsMenuOpen(false);
      router.refresh();
    } catch {
      setError("Não foi possível deletar a categoria. Tente novamente.");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <>
      <div ref={menuRef} className="relative z-20">
        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-haspopup="menu"
          aria-expanded={isMenuOpen}
          aria-label={`Opções de ${category.name}`}
          className="relative flex h-8 w-8 items-center justify-center rounded-full bg-black/80 text-gold transition hover:bg-black"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <circle cx="5" cy="12" r="2" />
            <circle cx="12" cy="12" r="2" />
            <circle cx="19" cy="12" r="2" />
          </svg>
        </button>

        {isMenuOpen && !isModalOpen ? (
          <div
            role="menu"
            className="absolute right-0 top-0 z-50 w-36 overflow-hidden rounded-xl border border-cardline bg-surface shadow-xl"
          >
            <button
              type="button"
              role="menuitem"
              onClick={openModal}
              className="block w-full px-4 py-2 text-left text-sm font-medium text-black transition hover:bg-ph"
            >
              Atualizar
            </button>
            <button
              type="button"
              role="menuitem"
              onClick={handleDelete}
              disabled={isDeleting}
              className="block w-full px-4 py-2 text-left text-sm font-medium text-red-600 transition hover:bg-ph disabled:opacity-60"
            >
              {isDeleting ? "Deletando..." : "Deletar"}
            </button>
          </div>
        ) : null}
      </div>

      {isModalOpen ? (
        <div
          className="fixed inset-0 z-80 flex items-center justify-center bg-black/60 p-4"
          onClick={closeModal}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={`edit-category-title-${category.id}`}
            className="w-full max-w-lg rounded-2xl border border-cardline bg-surface p-6 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h2
                id={`edit-category-title-${category.id}`}
                className="font-display text-2xl leading-none tracking-wide text-black"
              >
                Atualizar categoria
              </h2>
              <button
                type="button"
                onClick={closeModal}
                aria-label="Fechar"
                className="text-xl leading-none text-muted transition hover:text-black"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleUpdate} className="mt-6 flex flex-col gap-4">
              <label className="flex flex-col gap-1 text-sm font-medium text-black">
                Nome
                <input
                  name="name"
                  defaultValue={category.name}
                  required
                  className="rounded-xl border border-cardline bg-ph px-3 py-2 text-sm text-black outline-none focus:border-black"
                />
              </label>

              {error ? (
                <p className="text-sm font-medium text-red-600">{error}</p>
              ) : null}

              <div className="mt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-full px-5 py-2 text-sm font-semibold text-muted transition hover:text-black"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="rounded-full bg-black px-6 py-2 text-sm font-semibold text-gold transition hover:bg-neutral-900 disabled:opacity-60"
                >
                  {isSaving ? "Salvando..." : "Salvar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}