"use client";

export default function CartToast({
  message,
  onClose,
}: {
  message: string | null;
  onClose: () => void;
}) {
  if (!message) {
    return null;
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-4 left-1/2 z-[70] flex w-[min(90vw,24rem)] -translate-x-1/2 items-center gap-3 rounded-full border border-gold-dark bg-black px-4 py-3 text-sm font-medium text-gold shadow-lg motion-safe:animate-[toastIn_0.25s_ease-out]"
    >
      <span className="flex-1">{message}</span>

      <button
        type="button"
        onClick={onClose}
        aria-label="Fechar mensagem"
        className="shrink-0 text-gold/70 transition hover:text-gold"
      >
        ✕
      </button>
    </div>
  );
}
