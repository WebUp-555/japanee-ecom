import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set) => ({
      cartItems: [],
      addToCart: (product) =>
        set((state) => {
          const existing = state.cartItems.find(
            (item) =>
              item.id === product.id &&
              item.color === product.color &&
              item.size === product.size
          );
          if (existing) {
            return {
              cartItems: state.cartItems.map((item) =>
                item === existing
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          } else {
            return {
              cartItems: [...state.cartItems, { ...product, quantity: 1 }],
            };
          }
        }),
      removeFromCart: (productId) =>
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.id !== productId),
        })),
      increaseQuantity: (productId) =>
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.id === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        })),
      decreaseQuantity: (productId) =>
        set((state) => ({
          cartItems: state.cartItems
            .map((item) =>
              item.id === productId && item.quantity > 1
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
            .filter((item) => item.quantity > 0),
        })),
    }),
    {
      name: 'cart-storage', // key in localStorage
    }
  )
);