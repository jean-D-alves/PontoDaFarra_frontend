export type Product = {
  id: string;
  name: string;
  description: string;
  value: number;
  imageUrl: string;
  categoryName: string;
};

export const products: Product[] = [
  {
    id: "01a116be-1cda-7eef-85ea-ff683c2538e0",
    name: "Devassa",
    description: "Cerveja",
    value: 25.99,
    imageUrl:
      "http://localhost:5111/imagens/4b7c776f-3ffe-4d59-8c70-47bbdee3763d.webp",
    categoryName: "Bebida",
  },
];

export const formatPrice = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
