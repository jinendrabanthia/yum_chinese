import { create } from 'zustand';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'qty'>) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getSubtotal: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  addItem: (item) => set((state) => {
    const existing = state.items.find((i) => i.id === item.id);
    if (existing) {
      return { items: state.items.map((i) => i.id === item.id ? { ...i, qty: i.qty + 1 } : i) };
    }
    return { items: [...state.items, { ...item, qty: 1 }] };
  }),
  removeItem: (id) => set((state) => {
    const existing = state.items.find((i) => i.id === id);
    if (existing && existing.qty > 1) {
      return { items: state.items.map((i) => i.id === id ? { ...i, qty: i.qty - 1 } : i) };
    }
    return { items: state.items.filter((i) => i.id !== id) };
  }),
  clearCart: () => set({ items: [] }),
  getTotalItems: () => get().items.reduce((acc, item) => acc + item.qty, 0),
  getSubtotal: () => get().items.reduce((acc, item) => acc + item.price * item.qty, 0),
}));
