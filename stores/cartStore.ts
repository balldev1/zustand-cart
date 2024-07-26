// stores/cartStore.ts
import create from 'zustand';
import { persist } from 'zustand/middleware';

interface CartState {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    reduceItem: (id: string) => void;
    removeItem: (id: string) => void;
    clearCart: () => void;
    getTotal: () => number;
}

interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

export const useCartStore = create<CartState>(
    persist(
        (set) => ({
            items: [],
            // +1
            addItem: (item) => set((state) => {
                const existingItem = state.items.find(i => i.id === item.id);
                if (existingItem) {
                    return {
                        items: state.items.map(i =>
                            i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
                        )
                    };
                }
                return { items: [...state.items, item] };
            }),
            // -1
            reduceItem: (id) => set((state) => {
                const existingItem = state.items.find(i => i.id === id);
                if (existingItem && existingItem.quantity > 1) {
                    return {
                        items: state.items.map(i =>
                            i.id === id ? { ...i, quantity: i.quantity - 1 } : i
                        )
                    };
                }
                return { items: state.items.filter(i => i.id !== id) };
            }),
            // - Item
            removeItem: (id) => set((state) => ({
                items: state.items.filter(item => item.id !== id)
            })),
            // - Cart
            clearCart: () => set({ items: [] }),
            // Result
            getTotal: () => useCartStore.getState!().items.reduce((total, item) => total + item.price * item.quantity, 0),
        }),
        {
            // ชื่อของ storage ที่จะใช้ใน localStorage
            name: 'cart-storage',
        }
    )
);
