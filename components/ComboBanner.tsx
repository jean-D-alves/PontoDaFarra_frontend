export default function ComboBanner() {
  return (
    <article className="flex h-full flex-col justify-between rounded-2xl bg-gradient-to-br from-gold-light to-gold-dark p-4 sm:p-6 md:p-8">
      <div>
        <h2 className="font-display text-2xl leading-none tracking-wide text-black sm:text-3xl md:text-4xl">
          COMBO CHURRASCO
        </h2>
        <p className="mt-2 text-xs leading-snug text-black/80 sm:text-sm">
          Cerveja, refrigerante, gelo e carvão em um pedido só.
        </p>
      </div>

      <a
        href="#evento"
        aria-label="Montar combo de churrasco pelo WhatsApp"
        className="mt-5 inline-flex w-fit items-center justify-center rounded-full bg-black px-4 py-2 font-display text-sm tracking-wide text-gold transition duration-200 hover:scale-105 hover:bg-neutral-900 active:scale-100 sm:text-base"
      >
        Montar combo
      </a>
    </article>
  );
}
