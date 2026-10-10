import Image from "next/image";
import AddProductButton from "@/components/AddProductButton";
import ProductMenu from "@/components/ProductMenu";
import { formatPrice } from "@/data/products";
import { GetProducts } from "@/handle/Product";

export default async function produtos() {
  const products = await GetProducts();
  return (
    <main
      id="ofertas"
      aria-labelledby="ofertas-title"
      className="mt-10 scroll-mt-28 sm:mt-14"
    >
      <h2 className="text-center font-display text-3xl leading-none tracking-wide text-black sm:text-4xl md:text-5xl">
        Produtos
      </h2>

      <ul className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 min-[430px]:grid-cols-3 md:grid-cols-4">
        {products.map((product) => (
          <li
            key={product.id}
            className="relative flex h-full flex-col rounded-2xl border border-cardline bg-surface p-3"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-ph">
              {product.imageUrl ? (
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  sizes="(min-width: 768px) 25vw, (min-width: 430px) 33vw, 50vw"
                  className="object-cover"
                />
              ) : null}
            </div>

            <div className="mt-3 flex flex-1 flex-col">
              <h3 className="text-sm font-medium leading-snug text-black sm:text-base">
                {product.name}
              </h3>

              <p className="mt-1 text-xs text-muted">{product.description}</p>

              <p className="mt-2 text-base font-semibold text-black sm:text-lg">
                {formatPrice(product.value)}
              </p>
            </div>

            <ProductMenu product={product} />
          </li>
        ))}
      </ul>

      <AddProductButton />
    </main>
  );
}
