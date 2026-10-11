import Link from "next/link";

export default function Slidebar() {
  return (
    <div className="sticky top-0 z-10 flex flex-col h-screen w-1/4 shrink-0 p-10 py-20 gap-2 bg-black text-ph border-black border-r-2">
      <Link
        href="/"
        className="shrink-0 font-display text-lg leading-none tracking-wide text-ph transition hover:text-gold sm:text-2xl"
      >
        PONTO DA FARRA
      </Link>
      <Link
        href="/admin/produtos"
        className="shrink-0 text-xs font-medium transition hover:text-gold sm:text-sm"
      >
        Produtos
      </Link>
      <Link
        href="/admin/categorias"
        className="shrink-0 text-xs font-medium transition hover:text-gold sm:text-sm"
      >
        Categorias
      </Link>
    </div>
  );
}
