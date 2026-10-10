const fallbackNumber = "5584996554409";

const whatsappNumber = (
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? fallbackNumber
).replace(/\D/g, "");

export default function EventCTA() {
  return (
    <section
      id="evento"
      aria-labelledby="evento-title"
      className="mt-10 flex scroll-mt-28 flex-col gap-4 rounded-2xl bg-event p-5 sm:mt-14 sm:p-8 md:flex-row md:items-center md:justify-between"
    >
      <div>
        <h2
          id="evento-title"
          className="font-display text-2xl leading-none tracking-wide text-black sm:text-3xl md:text-4xl"
        >
          PEDIDO GRANDE OU EVENTO?
        </h2>
        <p className="mt-2 text-xs text-muted sm:text-sm">
          fale com a gente no WhatsApp
        </p>
      </div>

      <a
        href={`https://wa.me/${whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chamar a Ponto da Farra no WhatsApp"
        className="inline-flex w-fit shrink-0 items-center justify-center rounded-full bg-black px-5 py-3 font-display text-base tracking-wide text-gold transition duration-200 hover:scale-105 hover:bg-neutral-900 active:scale-100 sm:text-lg"
      >
        Chamar no WhatsApp
      </a>
    </section>
  );
}
