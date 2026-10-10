import { products as fallbackProducts, type Product } from "@/data/products";
import { type AuthUser } from "./Login";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5111/api";

export async function GetProducts(page: Number = 1): Promise<Product[]> {
  try {
    const response = await fetch(`${API_URL}/product?page=${page}`, {
      cache: "no-store",
    });

    if (!response.ok) return fallbackProducts;

    const data: unknown = await response.json();

    return Array.isArray(data) ? (data as Product[]) : fallbackProducts;
  } catch {
    return fallbackProducts;
  }
}

export async function AddProduct(
  formData: FormData,
  user: AuthUser,
  token: string,
): Promise<void> {
  if (user.role != "Admin") {
    throw new Error("Erro você não tem autorização");
  }

  const response = await fetch(`${API_URL}/product`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Erro ao adicionar produto");
  }
}

export async function UpdateProduct(
  id: string,
  formData: FormData,
  user: AuthUser,
  token: string,
): Promise<void> {
  if (user.role != "Admin") {
    throw new Error("Erro você não tem autorização");
  }

  const response = await fetch(`${API_URL}/product/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Erro ao atualizar produto");
  }
}

export async function DeleteProduct(
  id: string,
  user: AuthUser,
  token: string,
): Promise<void> {
  if (user.role != "Admin") {
    throw new Error("Erro você não tem autorização");
  }

  const response = await fetch(`${API_URL}/product/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Erro ao deletar produto");
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
