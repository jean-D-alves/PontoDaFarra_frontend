export default function HeroBanner() {
  return (
    <article className="flex h-full flex-col justify-between rounded-2xl bg-black p-4 sm:p-6 md:p-8">
      <h1 className="font-display text-3xl leading-[0.95] tracking-wide text-white sm:text-4xl md:text-5xl">
        CERVEJA GELADA
        <span className="mt-1 block text-gold">
          <span className="text-white">A</span> PREÇO DE DISTRIBUIDORA
        </span>
      </h1>

      <a
        href="#ofertas"
        aria-label="Ver ofertas da semana"
        className="mt-5 inline-flex w-fit items-center justify-center rounded-full bg-gold px-5 py-2 font-display text-base tracking-wide text-black transition duration-200 hover:scale-105 hover:brightness-90 active:scale-100 sm:text-lg"
      >
        Ver ofertas
      </a>
    </article>
  );
}
