import { useEffect, useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

import { getCommunity, getEvents, getShelfTiles, getProducts } from '../lib/data';
import type { CommunityMember, EventItem, ShelfTile, Product } from '../lib/types';
import { Link } from '../lib/router';

export default function Community() {
  const [members, setMembers] = useState<CommunityMember[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [tiles, setTiles] = useState<ShelfTile[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getCommunity().then(setMembers);
    getEvents().then(setEvents);
    getShelfTiles().then(setTiles);
    getProducts().then(setProducts);
  }, []);

  const featured = members.find((m) => m.featured);

  return (
    <main>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[420px] overflow-hidden">
        <img src="https://images.unsplash.com/photo-1528826007177-f38517ce9c17?w=2000&q=80&auto=format&fit=crop" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-sz-ink/35" />
        <div className="relative h-full flex flex-col items-center justify-center text-sz-paper text-center px-6">
          <div className="font-serif italic text-[clamp(2.5rem,6vw,4.5rem)]">community</div>
          <div className="mt-2 font-light">the women who shape the formulas.</div>
        </div>
      </section>

      {/* Featured member */}
      {featured && (
        <section className="bg-sz-paper px-4 md:px-8 py-20">
          <div className="max-w-[1320px] mx-auto grid md:grid-cols-2 gap-10 items-center">
            <div className="rounded-xl overflow-hidden aspect-[3/4] shadow-soft-md">
              <img src={featured.portrait_url} alt={featured.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="text-[0.72rem] uppercase tracking-widest text-sz-concrete-dark">this week</div>
              <h2 className="font-sans font-medium text-[clamp(1.75rem,3vw,2.5rem)] lowercase mt-2">{featured.name.toLowerCase()}</h2>
              <div className="text-sz-concrete-dark">{featured.role} · {featured.location}</div>
              <blockquote className="font-serif italic text-[clamp(1.5rem,2.5vw,2rem)] text-sz-ink mt-6 leading-snug">
                "{featured.quote}"
              </blockquote>
              <p className="mt-6 font-light text-sz-concrete-dark max-w-md">{featured.long_bio}</p>
              <div className="mt-8">
                <div className="text-[0.72rem] uppercase tracking-widest text-sz-concrete-dark mb-3">her 4 pieces</div>
                <div className="grid grid-cols-4 gap-3">
                  {featured.product_ids.slice(0, 4).map((pid) => {
                    const p = products.find((x) => x.id === pid);
                    if (!p) return null;
                    return (
                      <Link key={pid} to={`/shop/${pid}`} className="aspect-square rounded-sm overflow-hidden bg-sz-beige-light">
                        <img src={p.image_url} alt={p.name} className="w-full h-full object-cover" />
                      </Link>
                    );
                  })}
                </div>
                <Link to="/shop" className="mt-6 inline-flex items-center gap-2 text-sm lowercase hover:gap-3 transition-all">
                  shop her ritual <ArrowRight size={14} strokeWidth={1.5} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* The Shelf */}
      <section className="bg-sz-beige-light px-4 md:px-8 py-20">
        <div className="max-w-[1320px] mx-auto">
          <h2 className="font-sans font-medium text-[clamp(1.5rem,2.5vw,2rem)] lowercase mb-2">the shelf</h2>
          <p className="text-sz-concrete-dark font-light mb-10">what's on hers, this season.</p>
          <div className="columns-2 md:columns-4 gap-4 space-y-4">
            {tiles.map((t) => (
              <div key={t.id} className={`relative rounded-md overflow-hidden break-inside-avoid ${t.height_class}`}>
                <img src={t.image_url} alt="" className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-700 ease-soft" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-sz-ink/60 to-transparent text-sz-paper text-xs p-3 opacity-0 hover:opacity-100 transition">
                  {t.caption}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gatherings */}
      <section className="bg-sz-paper px-4 md:px-8 py-20">
        <div className="max-w-[1320px] mx-auto">
          <h2 className="font-sans font-medium text-[clamp(1.5rem,2.5vw,2rem)] lowercase mb-10">gatherings</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {events.map((e) => (
              <div key={e.id} className="bg-sz-beige-light rounded-xl overflow-hidden">
                <div className="aspect-[16/9]">
                  <img src={e.image_url} alt={e.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <div className="text-sm text-sz-concrete-dark">{e.when_text}</div>
                  <div className="text-sm text-sz-concrete-dark">{e.location}</div>
                  <div className="font-serif italic text-2xl mt-3">{e.title}</div>
                  <p className="text-sm text-sz-concrete-dark mt-2 font-light">{e.description}</p>
                  <div className="flex items-center justify-between mt-5">
                    <span className="bg-sz-beige-warm text-sz-ink text-[0.72rem] px-3 py-1 rounded-full lowercase">
                      {e.members_only ? 'members only' : 'open to all'}
                    </span>
                    <button className="text-sm lowercase underline underline-offset-4 hover:text-sz-concrete-dark transition">
                      {e.members_only ? 'rsvp →' : 'register →'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram */}
      <section className="bg-sz-paper px-4 md:px-8 pb-20">
        <div className="max-w-[1320px] mx-auto">
          <div className="text-[0.72rem] uppercase tracking-widest text-sz-concrete-dark mb-5">#naturallySIZS</div>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
            {tiles.slice(0, 8).map((t) => (
              <div key={t.id + '-ig'} className="aspect-square rounded-md overflow-hidden">
                <img src={t.image_url} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Circle */}
      <section className="bg-wash-warmth py-24 px-4 md:px-8">
        <div className="max-w-2xl mx-auto text-center bg-sz-paper rounded-xl p-10 shadow-soft-md">
          <h2 className="font-serif italic text-[clamp(1.75rem,3vw,2.5rem)] text-sz-ink">join the circle</h2>
          <p className="text-sz-concrete-dark font-light mt-2">members get the room.</p>
          <ul className="mt-8 text-left max-w-sm mx-auto space-y-3 text-[0.95rem]">
            {['early access to new launches','private events in nyc, london, milan','complimentary studio treatment','birthday gift','free shipping, always'].map((t) => (
              <li key={t} className="flex gap-3 items-start">
                <Check size={16} strokeWidth={1.5} className="mt-1" /> {t}
              </li>
            ))}
          </ul>
          <Link to="/account" className="mt-8 inline-flex items-center gap-2 bg-sz-ink text-sz-paper px-7 py-3.5 rounded-md lowercase hover:bg-[#3D3936] transition">
            become a member <ArrowRight size={14} strokeWidth={1.5} />
          </Link>
        </div>
      </section>
    </main>
  );
}
