import type { Product } from "@/data/products";

export type Category = {
  id: string;
  name: string;
};

export type CategoryWithProducts = Category & {
  products: Product[];
};
