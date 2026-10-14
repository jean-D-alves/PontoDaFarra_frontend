"use client";

import { useEffect, useState } from "react";
import Slidebar from "@/components/Slidebar";
import { useAuth } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { verifyAdmin } = useAuth();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    let active = true;

    verifyAdmin().then((isAdmin) => {
      if (active) setAuthorized(isAdmin);
    });

    return () => {
      active = false;
    };
  }, [verifyAdmin]);

  if (!authorized) return null;

  return (
    <CartProvider>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-black focus:px-4 focus:py-2 focus:text-sm focus:text-gold"
      >
        Pular para o conteúdo
      </a>
      <div className="flex min-h-screen flex-col md:flex-row">
        <Slidebar />
        <main id="conteudo" className="flex-1">
          {children}
        </main>
      </div>
    </CartProvider>
  );
}