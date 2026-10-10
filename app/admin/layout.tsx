"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Slidebar from "@/components/Slidebar";
import { useAuth } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { user, loading } = useAuth();
  const router = useRouter();

  const isAdmin = user?.role === "Admin";

  useEffect(() => {
    if (loading) return;
    if (!user) router.replace("/login");
    else if (!isAdmin) router.replace("/");
  }, [loading, user, isAdmin, router]);

  if (loading || !isAdmin) return null;

  return (
    <CartProvider>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-black focus:px-4 focus:py-2 focus:text-sm focus:text-gold"
      >
        Pular para o conteúdo
      </a>
      <div className="flex min-h-screen">
        <Slidebar />
        <main id="conteudo" className="flex-1">
          {children}
        </main>
      </div>
    </CartProvider>
  );
}