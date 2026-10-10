import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";

export default function CategoriaLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <CartProvider>
      <Header searchActive={true} categoryActive={true} />
      <main id="conteudo" className="flex-1">
        {children}
      </main>
      <Footer />
    </CartProvider>
  );
}
