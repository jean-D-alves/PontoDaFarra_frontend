"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { DeleteProduct, UpdateProduct } from "@/handle/Product";
import type { Product } from "@/data/products";

export default function ProductMenu({ product }: { product: Product }) {
  const router = useRouter();
  const { user, token } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
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
    setPreview(product.imageUrl || null);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setPreview(null);
    setError(null);
  }

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    setPreview(file ? URL.createObjectURL(file) : product.imageUrl || null);
  }

  async function handleUpdate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    if (!user || !token) {
      setError("Você precisa estar autenticado.");
      return;
    }

    setIsSaving(true);
    setError(null);

    try {
      await UpdateProduct(product.id, data, user, token);
      closeModal();
      router.refresh();
    } catch {
      setError("Não foi possível atualizar o produto. Tente novamente.");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete() {
    if (!window.confirm(`Deseja realmente deletar "${product.name}"?`)) return;

    if (!user || !token) {
      setError("Você precisa estar autenticado.");
      return;
    }

    setIsDeleting(true);
    setError(null);

    try {
      await DeleteProduct(product.id, user, token);
      setIsMenuOpen(false);
      router.refresh();
    } catch {
      setError("Não foi possível deletar o produto. Tente novamente.");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <>
      <div ref={menuRef} className="absolute right-2 top-2 z-20">
        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-haspopup="menu"
          aria-expanded={isMenuOpen}
          aria-label={`Opções de ${product.name}`}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-black/80 text-gold transition hover:bg-black"
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
            className="absolute right-0 top-full z-30 mt-2 w-36 overflow-hidden rounded-xl border border-cardline bg-surface shadow-xl"
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={closeModal}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={`edit-product-title-${product.id}`}
            className="w-full max-w-lg rounded-2xl border border-cardline bg-surface p-6 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h2
                id={`edit-product-title-${product.id}`}
                className="font-display text-2xl leading-none tracking-wide text-black"
              >
                Atualizar produto
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
                  defaultValue={product.name}
                  required
                  className="rounded-xl border border-cardline bg-ph px-3 py-2 text-sm text-black outline-none focus:border-black"
                />
              </label>

              <label className="flex flex-col gap-1 text-sm font-medium text-black">
                Descrição
                <input
                  name="description"
                  defaultValue={product.description}
                  required
                  className="rounded-xl border border-cardline bg-ph px-3 py-2 text-sm text-black outline-none focus:border-black"
                />
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-1 text-sm font-medium text-black">
                  Preço
                  <input
                    name="value"
                    type="number"
                    step="0.01"
                    min="0"
                    defaultValue={product.value}
                    required
                    className="rounded-xl border border-cardline bg-ph px-3 py-2 text-sm text-black outline-none focus:border-black"
                  />
                </label>

                <label className="flex flex-col gap-1 text-sm font-medium text-black">
                  Categoria
                  <input
                    name="categoryName"
                    defaultValue={product.categoryName}
                    required
                    className="rounded-xl border border-cardline bg-ph px-3 py-2 text-sm text-black outline-none focus:border-black"
                  />
                </label>
              </div>

              <label className="flex flex-col gap-1 text-sm font-medium text-black">
                Imagem
                <input
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="rounded-xl border border-cardline bg-ph px-3 py-2 text-sm text-black outline-none file:mr-3 file:rounded-full file:border-0 file:bg-black file:px-4 file:py-1.5 file:text-xs file:font-semibold file:text-gold focus:border-black"
                />
              </label>

              {preview ? (
                <div className="flex justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={preview}
                    alt="Pré-visualização da imagem"
                    className="h-40 w-40 rounded-xl border border-cardline object-cover"
                  />
                </div>
              ) : null}

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
