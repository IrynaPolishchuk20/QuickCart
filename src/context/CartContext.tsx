import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

export interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail?: string;
  quantity?: number;
}

interface CartContextType {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  deleteFromCart: (id: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider")
  return context
}

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Product[]>(() => {
    // завантаження з localStorage при першому рендері
    const saved = localStorage.getItem("cart")
    return saved ? JSON.parse(saved) : []
  })

  // збереження у localStorage при зміні cart
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity: (p.quantity ?? 1) + 1 } : p
        )
      } else {
        return [...prev, { ...product, quantity: 1 }]
      }
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prevCart) =>
      prevCart.flatMap((item) =>
        item.id === id
          ? item.quantity && item.quantity > 1
            ? [{ ...item, quantity: item.quantity - 1 }]
            : []
          : [item]
      )
    )
  }

  const deleteFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id))
  }

  const clearCart = () => setCart([])

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, deleteFromCart }}
    >
      {children}
    </CartContext.Provider>
  )
}
