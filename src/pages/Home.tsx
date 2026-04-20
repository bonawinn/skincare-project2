import { useEffect, useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

import ProductCard from '../components/ProductCard';
import KitCard from '../components/KitCard';
import HeroCollage from '../components/HeroCollage';
import { Link } from '../lib/router';
import { getProducts, getKits, getCommunity } from '../lib/data';
import type { Product, Kit, CommunityMember } from '../lib/types';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [kits, setKits] = useState<Kit[]>([]);
  const [community, setCommunity] = useState<CommunityMember[]>([]);

  useEffect(() => {
    getProducts().then(setProducts);
    getKits().then(setKits);
    getCommunity().then(setCommunity);
  }, []);

  return (
    <main>
      {/* Block 01 — Hero */}
      <section className="bg-wash-morning px-4 md:px-8 pt-10 pb-20 md:pt-16 md:pb-28">
        <div className="max-w-[1320px] mx-auto grid md:grid-cols-[60%_40%] gap-8 md:gap-14 items-center">
          <div className="animate-fade-in">
            <HeroCollage />
          </div>
          <div className="animate-fade-up">
            <div className="uppercase tracking-[0.14em] text-[0.72rem] text-sz-concrete-dark">spring drop</div>
            <h1 className="font-serif italic text-[clamp(2.5rem,5.2vw,4.5rem)] leading-[1.05] mt-3 text-sz-ink">the dew.</h1>
            <p className="mt-5 text-[1.0625rem] text-sz-concrete-dark max-w-md font-light">
              the hydrating mist for the pause between meetings, layovers, and 4pm light.
            </p>
            <div className="mt-3 text-[0.95rem] text-sz-ink">$65 · 100ml</div>
            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <Link to="/shop/sz-td-100" className="bg-sz-ink text-sz-paper text-[0.92rem] lowercase px-7 py-3.5 rounded-md inline-flex items-center gap-2 hover:bg-[#3D3936] transition active:scale-[0.99]">
                shop the dew <ArrowRight size={14} strokeWidth={1.5} />
              </Link>
              <Link to="/ritual/quiz" className="border border-sz-ink text-sz-ink text-[0.92rem] lowercase px-7 py-3.5 rounded-md inline-flex items-center justify-center hover:bg-sz-ink hover:text-sz-paper transition">
                explore the ritual
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Block 03 — Bestsellers */}
      <section className="bg-sz-paper px-4 md:px-8 py-20 md:py-24">
        <div className="max-w-[1320px] mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div>
              <h2 className="font-sans font-medium text-[clamp(1.5rem,2.5vw,2.25rem)] lowercase">bestsellers</h2>
              <p className="text-sz-concrete-dark mt-2 font-light">the eight pieces our women come back for.</p>
            </div>
            <Link to="/shop" className="text-[0.9rem] lowercase inline-flex items-center gap-2 hover:gap-3 transition-all">
              shop all bestsellers <ArrowRight size={14} strokeWidth={1.5} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {products.slice(0, 8).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Block 04 — Quiz CTA */}
      <section className="bg-wash-warmth px-4 md:px-8 py-20 md:py-28">
        <div className="max-w-[1320px] mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="font-serif italic text-[clamp(2rem,4vw,3rem)] text-sz-ink">six questions.<br />one ritual.</h2>
            <p className="mt-5 text-sz-concrete-dark max-w-md font-light">
              tell us about your skin, your mornings, your travel — and we'll build the four pieces that belong on your shelf.
            </p>
            <div className="mt-4 text-[0.85rem] text-sz-concrete uppercase tracking-wider">takes 90 seconds</div>
            <Link to="/ritual/quiz" className="mt-7 inline-flex items-center gap-2 bg-sz-ink text-sz-paper px-7 py-3.5 rounded-md lowercase hover:bg-[#3D3936] transition">
              take the ritual quiz <ArrowRight size={14} strokeWidth={1.5} />
            </Link>
          </div>
          <div className="rounded-xl overflow-hidden shadow-soft-md aspect-[4/3]">
            <img src="https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1200&q=80&auto=format&fit=crop" alt="" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Block 05 — Kits */}
      <section className="bg-sz-paper px-4 md:px-8 py-20 md:py-24">
        <div className="max-w-[1320px] mx-auto">
          <div className="mb-12">
            <h2 className="font-sans font-medium text-[clamp(1.5rem,2.5vw,2.25rem)] lowercase">start with a kit</h2>
            <p className="text-sz-concrete-dark mt-2 font-light">pre-curated rituals — three pieces, one ceremony.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {kits.map((k) => <KitCard key={k.id} kit={k} />)}
          </div>
        </div>
      </section>

      {/* Block 06 — Founder strip (ink) */}
      <section className="bg-sz-ink text-sz-paper px-4 md:px-8 py-24 md:py-32">
        <div className="max-w-[1320px] mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="rounded-xl overflow-hidden aspect-[4/5]">
            <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=1200&q=80&auto=format&fit=crop" alt="founder" className="w-full h-full object-cover grayscale-[0.2]" />
          </div>
          <div>
            <div className="text-[0.72rem] uppercase tracking-widest text-sz-paper/60">the founder</div>
            <blockquote className="font-serif italic text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.2] mt-4 text-sz-paper">
              "we built SIZS for the ten minutes a day when most women are alone."
            </blockquote>
            <div className="mt-6 text-sz-paper/80 text-sm">— Dr. Mara Eldin, Founder</div>
            <Link to="/brand" className="mt-8 inline-flex items-center gap-2 text-sz-paper lowercase hover:gap-3 transition-all">
              read her story <ArrowRight size={14} strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </section>

      {/* Block 07 — Community */}
      <section className="bg-sz-beige-light px-4 md:px-8 py-20 md:py-24">
        <div className="max-w-[1320px] mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <h2 className="font-sans font-medium text-[clamp(1.5rem,2.5vw,2.25rem)] lowercase">she speaks</h2>
              <p className="text-sz-concrete-dark mt-2 font-light">the women who shaped the formulas.</p>
            </div>
            <Link to="/community" className="text-[0.9rem] lowercase inline-flex items-center gap-2 hover:gap-3 transition-all">
              meet the community <ArrowRight size={14} strokeWidth={1.5} />
            </Link>
          </div>
          <div className="flex gap-5 overflow-x-auto no-scrollbar snap-x snap-mandatory -mx-4 md:-mx-8 px-4 md:px-8 pb-2">
            {community.map((m) => (
              <div key={m.id} className="snap-start bg-sz-paper rounded-lg p-6 min-w-[300px] max-w-[320px] shadow-soft-sm">
                <div className="flex items-center gap-3">
                  <img src={m.portrait_url} alt={m.name} className="w-20 h-20 rounded-full object-cover" />
                  <div>
                    <div className="font-medium lowercase">{m.name.toLowerCase()}</div>
                    <div className="text-[0.8rem] text-sz-concrete-dark">{m.role}</div>
                  </div>
                </div>
                <p className="mt-4 font-serif italic text-[1.1rem] text-sz-ink leading-[1.4]">"{m.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Block 08 — Subscribe & save */}
      <section className="bg-wash-warmth px-4 md:px-8 py-24">
        <div className="max-w-3xl mx-auto bg-sz-paper rounded-xl p-10 md:p-14 shadow-soft-md text-center">
          <h2 className="font-sans font-medium text-[clamp(1.75rem,3vw,2.5rem)] lowercase">subscribe &amp; save</h2>
          <p className="mt-3 text-sz-concrete-dark font-light">the cream, on your schedule. 15% off, always.</p>
          <ul className="mt-8 text-left max-w-sm mx-auto space-y-3 text-[0.95rem]">
            {['delivered every 30, 60, or 90 days','skip, swap, or pause anytime','free standard shipping','early access to new launches'].map((t) => (
              <li key={t} className="flex gap-3 items-start">
                <Check size={16} strokeWidth={1.5} className="mt-1 text-sz-ink" /> {t}
              </li>
            ))}
          </ul>
          <Link to="/account" className="mt-8 inline-flex items-center gap-2 bg-sz-ink text-sz-paper px-7 py-3.5 rounded-md lowercase hover:bg-[#3D3936] transition">
            start your subscription <ArrowRight size={14} strokeWidth={1.5} />
          </Link>
        </div>
      </section>

    </main>
  );
}
