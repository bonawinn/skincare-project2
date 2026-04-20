import { X, Search } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useApp } from '../lib/AppState';
import { getProducts } from '../lib/data';
import type { Product } from '../lib/types';
import { Link } from '../lib/router';

export default function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useApp();
  const [q, setQ] = useState('');
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (searchOpen) getProducts().then(setProducts);
  }, [searchOpen]);

  const results = useMemo(() => {
    if (!q) return [];
    const s = q.toLowerCase();
    return products.filter(
      (p) => p.name.toLowerCase().includes(s) || p.subtitle.toLowerCase().includes(s) || p.ritual.includes(s) || p.sensation.includes(s)
    );
  }, [q, products]);

  if (!searchOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] bg-wash-cocoon animate-fade-in overflow-y-auto">
      <div className="max-w-3xl mx-auto px-6 pt-16 pb-24">
        <div className="flex items-center gap-3 bg-sz-paper rounded-full px-5 py-3 shadow-soft-sm">
          <Search size={20} strokeWidth={1.5} className="text-sz-concrete" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="flex-1 bg-transparent outline-none font-serif italic text-xl placeholder-sz-concrete"
            placeholder="what are you looking for?"
          />
          <button onClick={() => setSearchOpen(false)} className="p-1">
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        {!q && (
          <div className="mt-10">
            <div className="text-xs uppercase tracking-wider text-sz-concrete-dark mb-3">popular searches</div>
            <div className="flex flex-wrap gap-2">
              {['the cream', 'the dew', 'morning ritual', 'subscription', 'CT-24'].map((t) => (
                <button key={t} onClick={() => setQ(t)} className="bg-sz-paper px-4 py-2 rounded-full text-[0.85rem] lowercase hover:bg-sz-beige-warm/60 transition">
                  {t}
                </button>
              ))}
            </div>
          </div>
        )}

        {q && (
          <div className="mt-10 space-y-3">
            <div className="text-xs uppercase tracking-wider text-sz-concrete-dark">suggested</div>
            {results.length === 0 && <div className="text-sz-concrete-dark">no results.</div>}
            {results.map((p) => (
              <Link
                key={p.id}
                to={`/shop/${p.id}`}
                onClick={() => setSearchOpen(false)}
                className="flex items-center gap-4 bg-sz-paper rounded-md p-3 hover:shadow-soft-sm transition"
              >
                <img src={p.image_url} className="w-14 h-14 rounded-sm object-cover" alt="" />
                <div className="flex-1">
                  <div className="lowercase font-medium">{p.name}</div>
                  <div className="text-xs text-sz-concrete-dark">{p.subtitle}</div>
                </div>
                <div className="font-medium">${p.price}</div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
