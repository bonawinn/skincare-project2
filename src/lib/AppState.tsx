import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { getMockUser, getCart, addToCart as dbAddToCart, updateCartQty, removeFromCart, getWishlist, addToWishlist, removeFromWishlist } from './data';
import type { MockUser, CartItem } from './types';

type AppStateCtx = {
  user: MockUser | null;
  cart: CartItem[];
  wishlist: string[];
  cartOpen: boolean;
  searchOpen: boolean;
  setCartOpen: (v: boolean) => void;
  setSearchOpen: (v: boolean) => void;
  addToCart: (productId: string, sizeLabel: string, qty?: number) => Promise<void>;
  updateQty: (id: string, qty: number) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  toggleWishlist: (productId: string) => Promise<void>;
  refreshCart: () => Promise<void>;
};

const Ctx = createContext<AppStateCtx | null>(null);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const refreshCart = useCallback(async () => {
    if (!user) return;
    setCart(await getCart(user.id));
  }, [user]);

  const refreshWishlist = useCallback(async () => {
    if (!user) return;
    setWishlist(await getWishlist(user.id));
  }, [user]);

  useEffect(() => {
    (async () => {
      const u = await getMockUser();
      setUser(u);
    })();
  }, []);

  useEffect(() => {
    if (user) {
      refreshCart();
      refreshWishlist();
    }
  }, [user, refreshCart, refreshWishlist]);

  const addToCart = async (productId: string, sizeLabel: string, qty = 1) => {
    if (!user) return;
    await dbAddToCart(user.id, productId, sizeLabel, qty);
    await refreshCart();
    setCartOpen(true);
  };

  const updateQty = async (id: string, qty: number) => {
    await updateCartQty(id, qty);
    await refreshCart();
  };

  const removeItem = async (id: string) => {
    await removeFromCart(id);
    await refreshCart();
  };

  const toggleWishlist = async (productId: string) => {
    if (!user) return;
    if (wishlist.includes(productId)) {
      await removeFromWishlist(user.id, productId);
    } else {
      await addToWishlist(user.id, productId);
    }
    await refreshWishlist();
  };

  return (
    <Ctx.Provider value={{
      user, cart, wishlist, cartOpen, searchOpen,
      setCartOpen, setSearchOpen,
      addToCart, updateQty, removeItem, toggleWishlist, refreshCart,
    }}>
      {children}
    </Ctx.Provider>
  );
}

export function useApp() {
  const v = useContext(Ctx);
  if (!v) throw new Error('AppState missing');
  return v;
}
