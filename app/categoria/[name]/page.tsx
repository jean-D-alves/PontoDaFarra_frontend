import Link from "next/link";
import { notFound } from "next/navigation";
import ProductGrid from "@/components/ProductGrid";
import { GetCategory } from "@/handle/Category";

export default async function CategoriaPage({
  params,
}: {
  params: { name: string };
}) {
  const category = await GetCategory(params.name);

  if (!category) {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-semibold text-muted transition hover:text-black"
      >
        ← Voltar
      </Link>

      <h1 className="mt-6 font-display text-4xl leading-none tracking-wide text-black sm:text-5xl">
        {category.name}
      </h1>

      {category.products.length > 0 ? (
        <ProductGrid products={category.products} />
      ) : (
        <p className="mt-6 text-sm text-muted">
          Nenhum produto nessa categoria.
        </p>
      )}
    </div>
  );
}