"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AddProduct } from "@/handle/Product";
import { useAuth } from "@/context/AuthContext";

export default function AddProductButton() {
  const router = useRouter();
  const { user, token } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    setPreview(file ? URL.createObjectURL(file) : null);
  }

  function handleClose() {
    setIsOpen(false);
    setPreview(null);
    setError(null);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
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
      await AddProduct(data, user, token);
      form.reset();
      handleClose();
      router.refresh();
    } catch {
      setError("Não foi possível adicionar o produto. Tente novamente.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-0 left-0 right-0 z-20 bg-gold-dark py-4 text-sm font-semibold text-black transition hover:bg-neutral-900 hover:text-gold sm:text-base md:left-1/4"
      >
        Adicione um produto
      </button>

      {isOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={handleClose}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-product-title"
            className="w-full max-w-lg rounded-2xl border border-cardline bg-surface p-6 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h2
                id="add-product-title"
                className="font-display text-2xl leading-none tracking-wide text-black"
              >
                Adicione um produto
              </h2>
              <button
                type="button"
                onClick={handleClose}
                aria-label="Fechar"
                className="text-xl leading-none text-muted transition hover:text-black"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
              <label className="flex flex-col gap-1 text-sm font-medium text-black">
                Nome
                <input
                  name="name"
                  required
                  className="rounded-xl border border-cardline bg-ph px-3 py-2 text-sm text-black outline-none focus:border-black"
                />
              </label>

              <label className="flex flex-col gap-1 text-sm font-medium text-black">
                Descrição
                <input
                  name="description"
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
                    required
                    className="rounded-xl border border-cardline bg-ph px-3 py-2 text-sm text-black outline-none focus:border-black"
                  />
                </label>

                <label className="flex flex-col gap-1 text-sm font-medium text-black">
                  Categoria
                  <input
                    name="categoryName"
                    required
                    className="rounded-xl border border-cardline bg-ph px-3 py-2 text-sm text-black outline-none focus:border-black"
                  />
                </label>
              </div>

              <label className="flex flex-col gap-1 text-sm font-medium text-black">
                Imagem
                <input
                  name="imagem"
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
                  onClick={handleClose}
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
