import { X, Minus, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useApp } from '../lib/AppState';
import { getProducts } from '../lib/data';
import type { Product } from '../lib/types';

export default function CartDrawer() {
  const { cartOpen, setCartOpen, cart, updateQty, removeItem } = useApp();
  const [products, setProducts] = useState<Record<string, Product>>({});

  useEffect(() => {
    getProducts().then((ps) => {
      const map: Record<string, Product> = {};
      ps.forEach((p) => (map[p.id] = p));
      setProducts(map);
    });
  }, []);

  const subtotal = cart.reduce((sum, i) => {
    const p = products[i.product_id];
    return sum + (p ? p.price * i.quantity : 0);
  }, 0);

  const threshold = 95;
  const progress = Math.min(100, (subtotal / threshold) * 100);

  if (!cartOpen) return null;

  return (
    <div className="fixed inset-0 z-[150]" onClick={() => setCartOpen(false)}>
      <div className="absolute inset-0 bg-sz-ink/30 animate-fade-in" />
      <aside
        className="absolute right-0 top-0 bottom-0 w-full sm:w-[460px] bg-sz-paper rounded-l-xl shadow-soft-xl overflow-y-auto animate-fade-up"
        style={{ animationDuration: '400ms' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 flex justify-between items-center border-b border-sz-concrete-soft/40">
          <div>
            <div className="text-[0.75rem] text-sz-concrete uppercase tracking-wider">your bag</div>
            <div className="text-lg lowercase">{cart.length} {cart.length === 1 ? 'piece' : 'pieces'}</div>
          </div>
          <button onClick={() => setCartOpen(false)}>
            <X size={22} strokeWidth={1.5} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {cart.length === 0 && (
            <div className="py-16 text-center text-sz-concrete-dark">your bag is empty.</div>
          )}
          {cart.map((item) => {
            const p = products[item.product_id];
            if (!p) return null;
            return (
              <div key={item.id} className="flex gap-4 pb-4 border-b border-sz-concrete-soft/30">
                <div className="w-16 h-16 rounded-sm overflow-hidden bg-sz-beige-light shrink-0">
                  <img src={p.image_url} alt={p.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between gap-2">
                    <div className="lowercase font-medium">{p.name} ({item.size_label})</div>
                    <div className="font-medium whitespace-nowrap">${p.price * item.quantity}</div>
                  </div>
                  <div className="text-[0.8rem] text-sz-concrete-dark">{p.subtitle}</div>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="bg-sz-beige-light rounded-full flex items-center">
                      <button className="p-1.5 px-2.5 hover:bg-sz-beige-warm/50 rounded-l-full transition" onClick={() => updateQty(item.id, item.quantity - 1)}>
                        <Minus size={12} strokeWidth={2} />
                      </button>
                      <span className="px-3 text-sm font-medium">{item.quantity}</span>
                      <button className="p-1.5 px-2.5 hover:bg-sz-beige-warm/50 rounded-r-full transition" onClick={() => updateQty(item.id, item.quantity + 1)}>
                        <Plus size={12} strokeWidth={2} />
                      </button>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="text-xs text-sz-concrete-dark hover:text-sz-ink underline underline-offset-2">
                      remove
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {cart.length > 0 && (
          <div className="p-6 border-t border-sz-concrete-soft/40 space-y-4">
            <div>
              <div className="text-xs text-sz-ink mb-1.5">
                {subtotal >= threshold ? '✓ free shipping unlocked' : `$${Math.max(0, threshold - subtotal).toFixed(0)} to free shipping`}
              </div>
              <div className="h-1.5 bg-sz-beige-light rounded-full overflow-hidden">
                <div className="h-full bg-sz-ink transition-all duration-700 ease-soft" style={{ width: `${progress}%` }} />
              </div>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-sz-concrete-dark">subtotal</span>
              <span className="font-medium">${subtotal}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-sz-concrete-dark">shipping</span>
              <span className="font-medium">{subtotal >= threshold ? 'free' : '—'}</span>
            </div>

            <button className="w-full bg-sz-ink text-sz-paper rounded-md py-3.5 lowercase font-medium hover:bg-[#3D3936] transition active:scale-[0.99]">
              checkout
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
