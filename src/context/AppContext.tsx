import { createContext, useState, useContext, useEffect } from "react";
import { Product } from "../types/Product";
const AppContext = createContext<any>(null); // create context

// provider
export const AppProvider = ({ children }: { children: React.ReactNode }) => {

  // load from localStorage
  const [cart, setCart] = useState<Product[]>(() => {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : []; // check if cart is empty
  });

  // save to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // add to cart in localStorage
  const addToCart = (product: Product) => {
    setCart((prev) => {

      const existingProduct = prev.find((p) => p.id === product.id);
      // check if product already exist then no need to add only we can update quantity
      if (existingProduct) {
        // already exists → increase quantity
        return prev.map((p) => p.id === product.id ? { ...p, quantity: 1 } : p);
      }

      // new product → add with quantity 1
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // remove from cart in local storage
  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  // update product quantity from cart page
  const updateQuantity = (id: number, change: number) => {
    setCart((prev) => prev.map((p) => p.id === id ? { ...p, quantity: Math.max(1, p.quantity + change) } : p));
  };

  // provider
  return (
    <AppContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </AppContext.Provider>
  );
};

// custom hook
export const useCart = () => useContext(AppContext);