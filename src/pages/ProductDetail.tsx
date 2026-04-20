import { useEffect, useState } from 'react';
import { Heart, Star, ChevronDown, ChevronUp } from 'lucide-react';
import { getProduct, getProductSizes, getReviews, getProducts } from '../lib/data';
import type { Product, ProductSize, Review } from '../lib/types';
import { useApp } from '../lib/AppState';
import { Link } from '../lib/router';
import ProductCard from '../components/ProductCard';

export default function ProductDetail({ id }: { id: string }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [sizes, setSizes] = useState<ProductSize[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [related, setRelated] = useState<Product[]>([]);
  const [selected, setSelected] = useState<string>('');
  const [open, setOpen] = useState<string | null>('how');
  const { addToCart, toggleWishlist, wishlist } = useApp();

  useEffect(() => {
    (async () => {
      const p = await getProduct(id);
      setProduct(p);
      if (p) {
        const s = await getProductSizes(id);
        setSizes(s);
        const def = s.find((x) => x.is_default) ?? s[0];
        if (def) setSelected(def.label);
        setReviews(await getReviews(id));
        const all = await getProducts();
        setRelated(all.filter((x) => x.id !== id).slice(0, 4));
      }
    })();
  }, [id]);

  if (!product) return <div className="min-h-screen flex items-center justify-center text-sz-concrete">loading…</div>;

  const currentPrice = sizes.find((s) => s.label === selected)?.price ?? product.price;
  const isWished = wishlist.includes(product.id);

  const sections = [
    { key: 'how', label: 'how to use', body: 'warm a pea-size amount between palms, press gently into cleansed skin upward. follow with SPF in the morning.' },
    { key: 'clinical', label: 'clinical results', body: '94% reported visibly firmer skin after 12 weeks. 200+ independent clinical hours across 2 trials.' },
    { key: 'ingredients', label: 'ingredients', body: product.key_ingredients.join(', ') + '. full INCI on packaging.' },
    { key: 'shipping', label: 'shipping & returns', body: 'complimentary shipping on orders over $95. 30-day skin-satisfaction guarantee.' },
  ];

  return (
    <main className="bg-sz-beige-light">
      <div className="max-w-[1320px] mx-auto px-4 md:px-8 py-10 grid lg:grid-cols-[60%_40%] gap-10 lg:gap-14">
        {/* Gallery */}
        <div className="space-y-6">
          <div className="bg-wash-warmth rounded-xl overflow-hidden aspect-square shadow-soft-md">
            <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div className="rounded-lg overflow-hidden aspect-[4/5]">
              <img src={product.lifestyle_image_url} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="rounded-lg overflow-hidden aspect-[4/5]">
              <img src="https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=900&q=80&auto=format&fit=crop" alt="" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="bg-sz-paper rounded-lg p-6 flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-sz-beige-warm flex items-center justify-center text-sz-ink font-serif italic text-xl">✓</div>
            <div>
              <div className="text-[0.72rem] uppercase tracking-widest text-sz-concrete-dark">the SIZS standard</div>
              <div className="text-sm mt-0.5">every formula passes four tests before it leaves the lab.</div>
            </div>
          </div>
        </div>

        {/* Info panel */}
        <div className="lg:sticky lg:top-32 self-start space-y-5">
          {product.badge && (
            <span className="inline-block bg-sz-beige-warm text-sz-ink text-[0.72rem] px-3 py-1 rounded-full lowercase">
              {product.badge}
            </span>
          )}
          <div>
            <h1 className="font-sans font-medium lowercase text-[clamp(1.75rem,3vw,2.5rem)] leading-tight">{product.name}</h1>
            <div className="text-sz-concrete-dark mt-1 font-light">{product.subtitle}</div>
          </div>
          <div className="flex items-center gap-2 text-sm text-sz-concrete-dark">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={13} fill={i < Math.round(product.rating) ? '#2B2926' : 'transparent'} strokeWidth={1} className="text-sz-ink" />
              ))}
            </div>
            <span>{product.rating} · {product.review_count} reviews</span>
          </div>

          <div className="text-2xl font-medium">${currentPrice}</div>

          {sizes.length > 1 && (
            <div>
              <div className="text-[0.8rem] text-sz-concrete-dark lowercase mb-2">size</div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {sizes.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelected(s.label)}
                    className={`rounded-md px-3 py-3 text-sm text-left border transition ${selected === s.label ? 'bg-sz-ink text-sz-paper border-sz-ink' : 'bg-sz-paper border-sz-concrete-soft hover:border-sz-ink'}`}
                  >
                    <div className="lowercase">{s.label}</div>
                    <div className={`text-xs mt-0.5 ${selected === s.label ? 'text-sz-paper/70' : 'text-sz-concrete-dark'}`}>${s.price}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={() => addToCart(product.id, selected)}
            className="w-full bg-sz-ink text-sz-paper py-4 rounded-md lowercase font-medium hover:bg-[#3D3936] transition active:scale-[0.99]"
          >
            add to bag — ${currentPrice}
          </button>

          {product.subscribable && (
            <div className="bg-sz-paper rounded-md p-4 text-sm">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium">subscribe &amp; save 15%</span>
                  <span className="text-sz-concrete-dark ml-1">→</span>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between bg-sz-beige-light rounded-sm px-3 py-2 text-xs">
                deliver every 60 days
                <ChevronDown size={14} strokeWidth={1.5} />
              </div>
            </div>
          )}

          <button
            onClick={() => toggleWishlist(product.id)}
            className={`inline-flex items-center gap-2 text-sm lowercase ${isWished ? 'text-sz-ink' : 'text-sz-concrete-dark hover:text-sz-ink'} transition`}
          >
            <Heart size={16} strokeWidth={1.5} fill={isWished ? '#2B2926' : 'transparent'} />
            {isWished ? 'saved to wishlist' : 'add to wishlist'}
          </button>

          <div className="border-t border-sz-concrete-soft/40 pt-5">
            <div className="text-[0.8rem] text-sz-concrete-dark lowercase mb-2">the formula</div>
            <ul className="space-y-1 text-[0.95rem]">
              {product.key_ingredients.map((k) => <li key={k}>• {k}</li>)}
            </ul>
          </div>

          <div className="border-t border-sz-concrete-soft/40 pt-2">
            {sections.map((s) => (
              <div key={s.key} className="border-b border-sz-concrete-soft/30">
                <button
                  onClick={() => setOpen(open === s.key ? null : s.key)}
                  className="w-full py-3.5 flex items-center justify-between text-[0.95rem] lowercase"
                >
                  {s.label}
                  {open === s.key ? <ChevronUp size={16} strokeWidth={1.5} /> : <ChevronDown size={16} strokeWidth={1.5} />}
                </button>
                {open === s.key && (
                  <p className="text-sm text-sz-concrete-dark pb-4 font-light">{s.body}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* The Ritual */}
      <section className="bg-sz-paper px-4 md:px-8 py-20">
        <div className="max-w-[1320px] mx-auto">
          <h2 className="font-sans font-medium text-[clamp(1.5rem,2.5vw,2rem)] lowercase mb-10">the ritual</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { n: '01.', t: 'warm.', b: 'warm a pea-size amount between palms for 10 seconds.' },
              { n: '02.', t: 'press.', b: 'press gently into cleansed skin, upward, no dragging.' },
              { n: '03.', t: 'rest.', b: 'allow 30 seconds before your next step.' },
            ].map((s) => (
              <div key={s.n} className="bg-sz-beige-light rounded-lg p-6">
                <div className="text-sz-concrete-dark text-sm">{s.n}</div>
                <div className="font-serif italic text-2xl mt-1">{s.t}</div>
                <p className="text-sm text-sz-concrete-dark mt-3 font-light">{s.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Science */}
      <section className="bg-wash-warmth py-24 text-center px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-sans font-medium text-[clamp(1.5rem,2.5vw,2rem)] lowercase mb-12">the science</h2>
          <div className="grid grid-cols-3 gap-6">
            {[
              { n: '94%', t: 'reported firmer skin' },
              { n: '12-week', t: 'double-blind clinical trial' },
              { n: '3×', t: 'hydration vs leading brand' },
            ].map((s) => (
              <div key={s.n}>
                <div className="font-serif italic text-[clamp(2rem,4vw,3.5rem)] text-sz-ink">{s.n}</div>
                <div className="text-[0.85rem] text-sz-concrete-dark mt-2">{s.t}</div>
              </div>
            ))}
          </div>
          <div className="text-xs text-sz-concrete-dark mt-8">n=84, 2025 study</div>
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-sz-paper px-4 md:px-8 py-20">
        <div className="max-w-[1320px] mx-auto grid md:grid-cols-[320px_1fr] gap-10">
          <div className="bg-sz-beige-light rounded-lg p-6 h-fit">
            <div className="text-[0.72rem] uppercase tracking-widest text-sz-concrete-dark">reviews</div>
            <div className="mt-2 flex items-end gap-3">
              <div className="text-4xl font-medium">{product.rating}</div>
              <div className="flex gap-0.5 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} fill={i < Math.round(product.rating) ? '#2B2926' : 'transparent'} strokeWidth={1} className="text-sz-ink" />
                ))}
              </div>
            </div>
            <div className="text-xs text-sz-concrete-dark">{product.review_count} reviews</div>
          </div>

          <div className="space-y-4">
            {reviews.map((r) => (
              <div key={r.id} className="bg-sz-beige-light rounded-lg p-5">
                <div className="flex items-center justify-between">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={12} fill={i < r.rating ? '#2B2926' : 'transparent'} strokeWidth={1} className="text-sz-ink" />
                    ))}
                  </div>
                  <div className="text-xs text-sz-concrete-dark">{r.author_name} · {r.age_range}</div>
                </div>
                {r.title && <div className="font-medium mt-2 lowercase">{r.title}</div>}
                <p className="text-sm text-sz-concrete-dark mt-1.5 font-light">{r.body}</p>
              </div>
            ))}
            {reviews.length === 0 && <div className="text-sz-concrete-dark text-sm">no reviews yet.</div>}
          </div>
        </div>
      </section>

      {/* Pairs well with */}
      <section className="bg-sz-beige-light px-4 md:px-8 py-20">
        <div className="max-w-[1320px] mx-auto">
          <h2 className="font-sans font-medium text-[clamp(1.5rem,2.5vw,2rem)] lowercase mb-10">pairs well with</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>
    </main>
  );
}
