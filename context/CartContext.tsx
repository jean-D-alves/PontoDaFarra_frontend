"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { formatPrice, type Product } from "@/data/products";
import { normalizeImageUrl } from "@/handle/Product";
import CartToast from "@/components/CartToast";

const WHATSAPP_FALLBACK_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";

export type CartItem = {
  product: Product;
  quantity: number;
};

const CART_STORAGE_KEY = process.env.NEXT_PUBLIC_CART_STORAGE_KEY ?? "";

type CartContextValue = {
  items: CartItem[];
  count: number;
  hydrated: boolean;
  message: string | null;
  addToCart: (product: Product) => void;
  sendToWhatsApp: () => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
};

type StoredCartItem = {
  id?: string;
  name?: string;
  imagem?: string;
  value?: number;
  quantity?: number;
};

function buildAddMessage(product: Product, quantity: number): string {
  if (quantity > 1) {
    return `Mais um ${product.name}! Agora você tem ${quantity} no carrinho.`;
  }

  return `${product.name} foi adicionado ao carrinho! Bom pedido!`;
}

function toStoredItems(items: CartItem[]): StoredCartItem[] {
  return items.map((item) => ({
    id: item.product.id,
    imagem: item.product.imageUrl,
    name: item.product.name,
    value: item.product.value,
    quantity: item.quantity,
  }));
}

function readStoredItems(): CartItem[] {
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed
      .filter(
        (entry): entry is StoredCartItem =>
          Boolean(entry) && typeof entry === "object",
      )
      .map((entry) => ({
        product: {
          id: String(entry.id ?? ""),
          name: String(entry.name ?? ""),
          description: "",
          value: Number(entry.value) || 0,
          imageUrl: normalizeImageUrl(String(entry.imagem ?? "")),
          categoryName: "",
        },
        quantity: Math.max(1, Number(entry.quantity) || 1),
      }))
      .filter((item) => item.product.id !== "");
  } catch {
    return [];
  }
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const messageTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setItems(readStoredItems());
    setHydrated(true);
  }, []);

  useEffect(() => {
    return () => {
      if (messageTimeout.current) {
        clearTimeout(messageTimeout.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    try {
      window.localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify(toStoredItems(items)),
      );
    } catch {
      // Ignora falhas de armazenamento (ex: modo privado).
    }
  }, [items, hydrated]);

  const showMessage = useCallback((text: string) => {
    setMessage(text);

    if (messageTimeout.current) {
      clearTimeout(messageTimeout.current);
    }

    messageTimeout.current = setTimeout(() => setMessage(null), 3000);
  }, []);

  const addToCart = useCallback(
    (product: Product) => {
      const existing = items.find((item) => item.product.id === product.id);
      const quantity = existing ? existing.quantity + 1 : 1;

      setItems((current) =>
        existing
          ? current.map((item) =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            )
          : [...current, { product, quantity: 1 }],
      );

      showMessage(buildAddMessage(product, quantity));
    },
    [items, showMessage],
  );
  const sendToWhatsApp = useCallback(() => {
    const products = readStoredItems();
    if (products.length === 0) return;

    const total = products.reduce(
      (sum, item) => sum + item.product.value * item.quantity,
      0,
    );

    const itemsText = products
      .map(
        (item) =>
          `*${item.quantity}x ${item.product.name}* — ${formatPrice(
            item.product.value * item.quantity,
          )}`,
      )
      .join("\n");

    const now = new Date().toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const text = [
      "*Pedido Ponto da Farra*",
      "---------------------------------------",
      "",
      itemsText,
      "",
      `*Total:* ${formatPrice(total)}`,
      "",
      "---------------------------------------",
      "",
      `_Pedido gerado pelo site Ponto da Farra às ${now}_`,
    ].join("\n");

    const number = WHATSAPP_FALLBACK_NUMBER.replace(/\D/g, "");
    clearCart();
    window.open(
      `https://wa.me/${number}?text=${encodeURIComponent(text)}`,
      "_blank",
    );
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setItems((current) =>
      current.filter((item) => item.product.id !== productId),
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const count = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items],
  );

  const value = useMemo(
    () => ({
      items,
      count,
      hydrated,
      message,
      addToCart,
      sendToWhatsApp,
      removeFromCart,
      clearCart,
    }),
    [
      items,
      count,
      hydrated,
      message,
      addToCart,
      sendToWhatsApp,
      removeFromCart,
      clearCart,
    ],
  );

  return (
    <CartContext.Provider value={value}>
      {children}
      <CartToast message={message} onClose={() => setMessage(null)} />
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart precisa estar dentro de um <CartProvider>");
  }

  return context;
}
