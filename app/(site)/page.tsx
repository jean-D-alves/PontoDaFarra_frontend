import HeroBanner from "@/components/HeroBanner";
import ComboBanner from "@/components/ComboBanner";
import ProductGrid from "@/components/ProductGrid";
import EventCTA from "@/components/EventCTA";
import { GetProducts } from "@/handle/Product";
import { useAuth } from "@/context/AuthContext";

export default async function Home() {
  const products = await GetProducts();
  

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-5 sm:px-6 sm:py-8">
      <section
        aria-label="Promoções em destaque"
        className="grid gap-3 sm:gap-4 md:min-h-[300px] md:grid-cols-[3fr_2fr]"
      >
        <HeroBanner />
        <ComboBanner />
      </section>

      <section
        id="ofertas"
        aria-labelledby="ofertas-title"
        className="mt-10 scroll-mt-28 sm:mt-14"
      >
        <h2
          id="ofertas-title"
          className="text-center font-display text-3xl leading-none tracking-wide text-black sm:text-4xl md:text-5xl"
        >
          OFERTAS DA SEMANA
        </h2>

        <ProductGrid products={products} />
      </section>

      <EventCTA />
    </div>
  );
}
