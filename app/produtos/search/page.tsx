import ProductGrid from "@/components/ProductGrid";
import { SearchProducts } from "@/handle/Product";

// app/search/page.tsx
export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const products = await SearchProducts(q ?? "");
  return (
    <main className="mx-auto w-full max-w-6xl scroll-mt-28 px-4 py-8 sm:px-6 sm:py-12">
      <ProductGrid products={products} />
    </main>
  );
}
