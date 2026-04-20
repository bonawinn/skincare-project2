import { useEffect, useMemo, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../lib/data';
import type { Product } from '../lib/types';
import { Link } from '../lib/router';

const tabs = ['all', 'morning', 'evening', 'refresh', 'travel'] as const;

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [tab, setTab] = useState<string>('all');

  useEffect(() => { getProducts().then(setProducts); }, []);

  const filtered = useMemo(() => {
    if (tab === 'all') return products;
    if (tab === 'travel') return products.filter((p) => p.category === 'body' || p.sensation === 'glow');
    return products.filter((p) => p.ritual === tab || (tab === 'refresh' && p.ritual === 'refresh'));
  }, [tab, products]);

  return (
    <main className="bg-sz-beige-light min-h-screen">
      <section className="max-w-[1320px] mx-auto px-4 md:px-8 pt-12 pb-8">
        <h1 className="font-sans font-medium text-[clamp(1.75rem,3vw,2.5rem)] lowercase">shop</h1>
        <p className="mt-2 text-sz-concrete-dark font-light">twenty-two pieces. four rituals. one sensibility.</p>
      </section>

      <div className="sticky top-[72px] md:top-[100px] z-30 bg-sz-beige-light/95 backdrop-blur border-b border-sz-concrete-soft/40">
        <div className="max-w-[1320px] mx-auto px-4 md:px-8">
          <div className="flex items-center gap-5 overflow-x-auto no-scrollbar py-4">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`lowercase text-[0.95rem] pb-1 border-b-2 transition-colors whitespace-nowrap ${tab === t ? 'border-sz-ink font-medium' : 'border-transparent text-sz-concrete-dark hover:text-sz-ink'}`}
              >
                {t}
              </button>
            ))}
            <div className="flex-1" />
            <div className="hidden md:flex items-center gap-5 text-[0.85rem] text-sz-concrete-dark">
              <button className="inline-flex items-center gap-1 lowercase hover:text-sz-ink transition">format <ChevronDown size={14} strokeWidth={1.5} /></button>
              <button className="inline-flex items-center gap-1 lowercase hover:text-sz-ink transition">price <ChevronDown size={14} strokeWidth={1.5} /></button>
              <button className="inline-flex items-center gap-1 lowercase hover:text-sz-ink transition">sort: featured <ChevronDown size={14} strokeWidth={1.5} /></button>
            </div>
          </div>
        </div>
      </div>

      <section className="max-w-[1320px] mx-auto px-4 md:px-8 py-10 md:py-14">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {filtered.map((p, idx) => (
            <div key={p.id} className="contents">
              <ProductCard product={p} />
              {idx === 3 && filtered.length > 5 && (
                <div className="col-span-2 md:col-span-3 lg:col-span-4 my-4 md:my-8 rounded-xl overflow-hidden relative aspect-[16/6]">
                  <img src="https://images.unsplash.com/photo-1571875257727-256c39da42af?w=1600&q=80&auto=format&fit=crop" alt="" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-sz-ink/30" />
                  <div className="relative h-full flex items-center px-8 md:px-16">
                    <div className="max-w-lg">
                      <div className="text-[0.72rem] uppercase tracking-widest text-sz-paper/80">from the editor</div>
                      <blockquote className="font-serif italic text-xl md:text-2xl text-sz-paper mt-3 leading-snug">
                        "the cleanser her dermatologist actually uses."
                      </blockquote>
                      <Link to="/brand" className="mt-4 inline-block text-sz-paper lowercase underline underline-offset-4">read more</Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-14">
          <button className="border border-sz-ink text-sz-ink px-7 py-3.5 rounded-md lowercase hover:bg-sz-ink hover:text-sz-paper transition">
            load more
          </button>
        </div>
      </section>
    </main>
  );
}
