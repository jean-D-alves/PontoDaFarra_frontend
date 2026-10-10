export default function Footer() {
  return (
    <footer className="mt-12 w-full bg-black">
      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <p className="font-display text-3xl leading-none tracking-wide text-gold sm:text-4xl">
          PONTO DA FARRA
        </p>

        <p className="mt-2 text-sm text-white sm:text-base">
          Distribuidora de bebidas desde 2016
        </p>

        <hr className="my-5 border-neutral-700" />

        <p className="text-xs text-muted sm:text-sm">
          Venda proibida para menores de 18 anos. Beba com moderação
        </p>
      </div>
    </footer>
  );
}
