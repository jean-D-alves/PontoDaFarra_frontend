"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AddCategory } from "@/handle/Category";
import { useAuth } from "@/context/AuthContext";

export default function AddCategoryButton() {
  const router = useRouter();
  const { user, token } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleClose() {
    setIsOpen(false);
    setError(null);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
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
      await AddCategory(name, user, token);
      form.reset();
      handleClose();
      router.refresh();
    } catch {
      setError("Não foi possível adicionar a categoria. Tente novamente.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-0 right-0 left-1/4 z-20 bg-gold-dark py-4 text-sm font-semibold text-black transition hover:bg-neutral-900 hover:text-gold sm:text-base"
      >
        Adicione uma categoria
      </button>

      {isOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={handleClose}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-category-title"
            className="w-full max-w-lg rounded-2xl border border-cardline bg-surface p-6 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h2
                id="add-category-title"
                className="font-display text-2xl leading-none tracking-wide text-black"
              >
                Adicione uma categoria
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