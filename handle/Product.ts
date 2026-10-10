import { products as fallbackProducts, type Product } from "@/data/products";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5111/api";

export async function GetProducts(page: Number = 1): Promise<Product[]> {
  try {
    const response = await fetch(`${API_URL}/product?page=${page}`, { cache: "no-store" });

    if (!response.ok) return fallbackProducts;

    const data: unknown = await response.json();

    return Array.isArray(data) ? (data as Product[]) : fallbackProducts;
  } catch {
    return fallbackProducts;
  }
}

export async function GetProduct(id: string): Promise<Product | null> {
  try {
    const response = await fetch(`${API_URL}/product/${id}`, {
      cache: "no-store",
    });

    if (!response.ok) return null;

    const data: unknown = await response.json();

    if (!data || typeof data !== "object" || Array.isArray(data)) return null;

    return data as Product;
  } catch {
    return null;
  }
}
