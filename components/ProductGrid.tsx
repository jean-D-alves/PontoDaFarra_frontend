import ProductCard from "@/components/ProductCard";
import type { Product } from "@/data/products";

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <ul className="mt-6 grid max-h-[70vh] grid-cols-2 gap-3 overflow-y-auto pr-1 sm:gap-4 min-[430px]:grid-cols-3 md:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </ul>
  );
}