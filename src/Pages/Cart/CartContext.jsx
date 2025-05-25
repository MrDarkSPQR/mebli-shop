import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const getInitialCart = () => {
    try {
      const storedCart = localStorage.getItem('cart');
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      console.error("Помилка при читанні кошика з localStorage:", error);
      return [];
    }
  };

  const [cartItems, setCartItems] = useState(getInitialCart);

  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    } catch (error) {
      console.error("Помилка при збереженні кошика в localStorage:", error);
    }
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item._id === product._id);
      if (exists) {
        return prev.map((item) =>
          item._id === product._id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [
          ...prev,
          {
            _id: product._id, 
            name: product.name,
            price: product.price,
            image: product.image,
            description: product.description,
            quantity: 1,
            isSelected: true,
          },
        ];
      }
    });
  };

  const removeFromCart = (_id) => { 
    setCartItems((prev) => prev.filter((item) => item._id !== _id)); 
  };

  const changeQuantity = (_id, delta) => { 
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === _id 
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const toggleSelect = (_id, isSelected) => { 
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === _id ? { ...item, isSelected } : item 
      )
    );
  };

  const clearSelectedItems = () => {
    setCartItems((prev) => prev.filter((item) => !item.isSelected));
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, changeQuantity, toggleSelect, clearSelectedItems }}
    >
      {children}
    </CartContext.Provider>
  );
}