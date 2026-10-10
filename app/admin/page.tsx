import HeroBanner from "@/components/HeroBanner";
import ComboBanner from "@/components/ComboBanner";
import ProductGrid from "@/components/ProductGrid";
import EventCTA from "@/components/EventCTA";
import { GetProducts } from "@/handle/Product";
import { useState } from "react";
import Link from "next/link";

export default async function Home() {
  const products = await GetProducts();
  return (
    <div className="h-full w-full max-w-6xl sm:px-6 sm:py-8">
      <p>Bem vindo</p>
    </div>
  );
}
