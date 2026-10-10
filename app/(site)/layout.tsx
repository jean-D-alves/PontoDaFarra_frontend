import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";

export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <CartProvider>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-black focus:px-4 focus:py-2 focus:text-sm focus:text-gold"
      >
        Pular para o conteúdo
      </a>
      <Header categoryActive={true} searchActive={true}/>
      <main id="conteudo" className="flex-1">
        {children}
      </main>
      <Footer />
    </CartProvider>
  );
}
