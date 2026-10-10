import type { Category, CategoryWithProducts } from "@/data/categories";
import type { Product } from "@/data/products";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5111/api";

export async function GetCategories(): Promise<Category[]> {
  try {
    const response = await fetch(`${API_URL}/category`, { cache: "no-store" });

    if (!response.ok) return [];

    const data: unknown = await response.json();

    return Array.isArray(data) ? (data as Category[]) : [];
  } catch {
    return [];
  }
}

export async function GetCategory(
  name: string,
): Promise<CategoryWithProducts | null> {
  try {
    const response = await fetch(
      `${API_URL}/category/${encodeURIComponent(name)}`,
      { cache: "no-store" },
    );

    if (!response.ok) return null;

    const data: unknown = await response.json();

    if (Array.isArray(data)) {
      return { id: name, name, products: data as Product[] };
    }

    if (data && typeof data === "object") {
      const record = data as Record<string, unknown>;

      return {
        id: typeof record.id === "string" ? record.id : name,
        name: typeof record.name === "string" ? record.name : name,
        products: Array.isArray(record.products)
          ? (record.products as Product[])
          : [],
      };
    }

    return null;
  } catch {
    return null;
  }
}
