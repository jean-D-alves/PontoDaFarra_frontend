import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";
import { formatPrice } from "@/data/products";
import { GetProduct } from "@/handle/Product";

export default async function ProdutoPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await GetProduct(params.id);

  if (!product) {
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

      <div className="mt-6 grid gap-8 md:grid-cols-2 md:items-start">
        <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-cardline bg-ph">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
              priority
            />
          ) : null}
        </div>

        <div className="flex flex-col">
          <span className="text-xs font-semibold uppercase tracking-wide text-muted">
            {product.categoryName}
          </span>

          <h1 className="mt-2 font-display text-4xl leading-none tracking-wide text-black sm:text-5xl">
            {product.name}
          </h1>

          <p className="mt-4 text-sm text-muted sm:text-base">
            {product.description}
          </p>

          <p className="mt-6 text-3xl font-semibold text-black">
            {formatPrice(product.value)}
          </p>

          <div className="mt-8">
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
