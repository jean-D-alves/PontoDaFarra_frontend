import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import { AuthProvider, useAuth } from "@/context/AuthContext";
// @ts-ignore Next.js handles global CSS imports during compilation.
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ponto da Farra | Distribuidora de bebidas",
  description:
    "Cervejas, destilados, refrigerantes, gelo e carvão a preço de distribuidora. Entrega para festas e eventos.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${bebasNeue.variable} ${inter.variable}`}>
      <body className="flex min-h-screen flex-col bg-page font-sans text-black antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
