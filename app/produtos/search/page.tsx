import ProductGrid from "@/components/ProductGrid";
import { SearchProducts } from "@/handle/Product";

// app/search/page.tsx
export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const products = await SearchProducts(q);
  return (
    <main className="m-10 scroll-mt-28 sm:mt-14">
      <ProductGrid products={products} />
    </main>
  );
}
