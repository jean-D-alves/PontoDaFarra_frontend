import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Entrar | Ponto da Farra",
  description:
    "Acesse sua conta Ponto da Farra para acompanhar pedidos, ofertas e promoções de distribuidora.",
};

export default function LoginLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main id="conteudo" className="flex flex-1 flex-col">
      {children}
    </main>
  );
}
