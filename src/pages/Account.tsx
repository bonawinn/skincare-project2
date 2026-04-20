import { useEffect, useState } from 'react';
import { ArrowRight, Check, Star } from 'lucide-react';
import { useApp } from '../lib/AppState';
import { getRitualSteps, getSubscriptions, getOrders, getProducts, getTiers, toggleRitualStep } from '../lib/data';
import type { RitualStep, Subscription, Order, Product, CircleTier } from '../lib/types';
import { Link } from '../lib/router';

const tabs = ['overview', 'orders', 'subscriptions', 'ritual', 'wishlist', 'circle', 'settings'];

export default function Account() {
  const { user, wishlist } = useApp();
  const [tab, setTab] = useState('overview');
  const [steps, setSteps] = useState<RitualStep[]>([]);
  const [subs, setSubs] = useState<Subscription[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [tiers, setTiers] = useState<CircleTier[]>([]);

  useEffect(() => {
    if (!user) return;
    getRitualSteps(user.id).then(setSteps);
    getSubscriptions(user.id).then(setSubs);
    getOrders(user.id).then(setOrders);
    getProducts().then(setProducts);
    getTiers().then(setTiers);
  }, [user]);

  if (!user) return <div className="min-h-screen flex items-center justify-center text-sz-concrete">loading…</div>;

  const productMap = Object.fromEntries(products.map((p) => [p.id, p]));
  const morning = steps.filter((s) => s.time_of_day === 'morning');
  const evening = steps.filter((s) => s.time_of_day === 'evening');
  const nextSub = subs[0];

  const handleToggle = async (step: RitualStep) => {
    const done = !step.completed_today;
    setSteps(steps.map((s) => (s.id === step.id ? { ...s, completed_today: done } : s)));
    await toggleRitualStep(step.id, done);
  };

  return (
    <main className="bg-sz-beige-light min-h-screen">
      <div className="max-w-[1320px] mx-auto px-4 md:px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-5 overflow-x-auto no-scrollbar border-b border-sz-concrete-soft/40 mb-10">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`lowercase text-[0.9rem] pb-3 px-1 border-b-2 whitespace-nowrap transition ${tab === t ? 'border-sz-ink font-medium' : 'border-transparent text-sz-concrete-dark hover:text-sz-ink'}`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Welcome */}
        <div className="mb-10">
          <h1 className="font-serif italic text-[clamp(1.75rem,3.5vw,2.75rem)] text-sz-ink">good morning, {user.first_name}.</h1>
          <div className="mt-2 flex items-center gap-3">
            <span className="bg-sz-beige-warm text-sz-ink text-[0.75rem] px-3 py-1 rounded-full lowercase">member of the circle · {user.tier}</span>
            <span className="text-sm text-sz-concrete-dark">since {user.member_since}</span>
          </div>
        </div>

        {tab === 'overview' && (
          <>
            <div className="grid md:grid-cols-3 gap-5 mb-12">
              {/* Next delivery */}
              <div className="bg-sz-paper rounded-xl p-6">
                <div className="text-[0.72rem] uppercase tracking-widest text-sz-concrete-dark">next delivery</div>
                {nextSub ? (
                  <>
                    <div className="mt-2 text-xl font-medium">on {nextSub.next_delivery}</div>
                    <div className="mt-5 flex items-center gap-3">
                      <img src={productMap[nextSub.product_id]?.image_url} alt="" className="w-14 h-14 rounded-sm object-cover" />
                      <div>
                        <div className="lowercase font-medium">{productMap[nextSub.product_id]?.name}</div>
                        <div className="text-xs text-sz-concrete-dark">{nextSub.size_label}</div>
                      </div>
                    </div>
                    <button onClick={() => setTab('subscriptions')} className="mt-6 text-sm lowercase underline underline-offset-4">
                      manage →
                    </button>
                  </>
                ) : <div className="mt-4 text-sz-concrete-dark text-sm">no active subscriptions.</div>}
              </div>

              {/* Orders */}
              <div className="bg-sz-paper rounded-xl p-6">
                <div className="text-[0.72rem] uppercase tracking-widest text-sz-concrete-dark">open orders</div>
                <div className="mt-2 text-xl font-medium">{orders.filter((o) => o.status !== 'delivered').length} shipping</div>
                {orders[0] && (
                  <>
                    <div className="mt-5 text-sm">#{orders[0].id}</div>
                    <div className="text-xs text-sz-concrete-dark">{orders[0].status} · {orders[0].placed_at}</div>
                    <button onClick={() => setTab('orders')} className="mt-5 text-sm lowercase underline underline-offset-4">track →</button>
                  </>
                )}
              </div>

              {/* Circle */}
              <div className="bg-sz-paper rounded-xl p-6">
                <div className="text-[0.72rem] uppercase tracking-widest text-sz-concrete-dark">your circle</div>
                <div className="mt-2 text-xl font-medium lowercase">{user.tier}</div>
                <div className="mt-4 text-sm">{user.points} points</div>
                <div className="h-1.5 bg-sz-beige-light rounded-full overflow-hidden mt-2">
                  <div className="h-full bg-sz-ink" style={{ width: '80%' }} />
                </div>
                <div className="text-xs text-sz-concrete-dark mt-2">600 to studio</div>
              </div>
            </div>

            {/* Ritual */}
            <section className="bg-sz-paper rounded-xl p-8 mb-10">
              <h2 className="font-sans font-medium text-[clamp(1.25rem,2vw,1.75rem)] lowercase">your ritual</h2>
              <p className="text-sz-concrete-dark text-sm font-light mt-1">the pieces you use, in order.</p>
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                {[['☀', 'morning', morning], ['☾', 'evening', evening]].map(([icon, label, list]) => (
                  <div key={label as string} className="bg-sz-beige-light rounded-lg p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-lg">{icon}</span>
                      <span className="lowercase font-medium">{label as string}</span>
                    </div>
                    <div className="space-y-2">
                      {(list as RitualStep[]).map((s) => {
                        const p = s.product_id ? productMap[s.product_id] : null;
                        return (
                          <button key={s.id} onClick={() => handleToggle(s)} className="w-full flex items-center gap-3 bg-sz-paper rounded-sm p-3 text-left hover:shadow-soft-sm transition">
                            <div className="text-xs text-sz-concrete w-6">{String(s.step_number).padStart(2, '0')}</div>
                            <div className={`w-5 h-5 rounded-xs border flex items-center justify-center ${s.completed_today ? 'bg-sz-ink border-sz-ink' : 'border-sz-concrete'}`}>
                              {s.completed_today && <Check size={12} strokeWidth={2} className="text-sz-paper" />}
                            </div>
                            {p && <img src={p.image_url} alt="" className="w-8 h-8 rounded-sm object-cover" />}
                            <div className="lowercase text-sm">{p?.name ?? s.custom_label}</div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-sm text-sz-concrete-dark">
                you've completed your morning ritual <span className="text-sz-ink font-medium">{user.streak} days running</span> ✦
              </div>
            </section>
          </>
        )}

        {tab === 'orders' && (
          <div className="space-y-4">
            {orders.map((o) => (
              <div key={o.id} className="bg-sz-paper rounded-xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <div className="font-medium">#{o.id}</div>
                  <div className="text-sm text-sz-concrete-dark">{o.status} · {o.placed_at}</div>
                  <div className="text-sm mt-2">{o.items.map((i) => `${i.name} (${i.size})`).join(', ')}</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="font-medium">${o.total}</div>
                  <button className="text-sm lowercase underline underline-offset-4">view →</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'subscriptions' && (
          <div className="space-y-4">
            {subs.map((s) => {
              const p = productMap[s.product_id];
              if (!p) return null;
              return (
                <div key={s.id} className="bg-sz-paper rounded-xl p-6 flex flex-col md:flex-row md:items-center gap-5">
                  <img src={p.image_url} alt="" className="w-20 h-20 rounded-sm object-cover" />
                  <div className="flex-1">
                    <div className="lowercase font-medium">{p.name} · {s.size_label}</div>
                    <div className="text-sm text-sz-concrete-dark">every {s.frequency_days} days · next: {s.next_delivery}</div>
                    <div className="text-sm">${s.price} · 15% off as a subscriber</div>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <button className="text-xs lowercase border border-sz-concrete-soft rounded-full px-4 py-2 hover:border-sz-ink transition">skip next</button>
                    <button className="text-xs lowercase border border-sz-concrete-soft rounded-full px-4 py-2 hover:border-sz-ink transition">change frequency</button>
                    <button className="text-xs lowercase border border-sz-concrete-soft rounded-full px-4 py-2 hover:border-sz-ink transition">pause</button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {tab === 'ritual' && (
          <section className="bg-sz-paper rounded-xl p-8">
            <h2 className="font-sans font-medium text-xl lowercase mb-6">your ritual</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[['morning', morning], ['evening', evening]].map(([label, list]) => (
                <div key={label as string} className="bg-sz-beige-light rounded-lg p-5">
                  <div className="lowercase font-medium mb-4">{label as string}</div>
                  <div className="space-y-2">
                    {(list as RitualStep[]).map((s) => {
                      const p = s.product_id ? productMap[s.product_id] : null;
                      return (
                        <div key={s.id} className="flex items-center gap-3 bg-sz-paper rounded-sm p-3">
                          <div className="text-xs text-sz-concrete w-6">{String(s.step_number).padStart(2, '0')}</div>
                          {p && <img src={p.image_url} alt="" className="w-8 h-8 rounded-sm object-cover" />}
                          <div className="lowercase text-sm">{p?.name}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {tab === 'wishlist' && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {wishlist.map((pid) => {
              const p = productMap[pid];
              if (!p) return null;
              return (
                <Link key={pid} to={`/shop/${pid}`} className="group">
                  <div className="bg-wash-warmth rounded-lg aspect-square overflow-hidden shadow-soft-sm">
                    <img src={p.image_url} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="mt-3 lowercase font-medium">{p.name}</div>
                  <div className="text-sm text-sz-concrete-dark">${p.price}</div>
                </Link>
              );
            })}
            {wishlist.length === 0 && <div className="text-sz-concrete-dark col-span-full">your wishlist is empty.</div>}
          </div>
        )}

        {tab === 'circle' && (
          <div className="grid md:grid-cols-3 gap-5">
            {tiers.map((t) => {
              const active = t.name === user.tier;
              return (
                <div key={t.id} className={`rounded-xl p-6 ${active ? 'bg-sz-paper shadow-soft-md border border-sz-beige-warm' : 'bg-sz-paper'}`}>
                  <div className="w-12 h-12 rounded-full bg-sz-beige-warm flex items-center justify-center">
                    <Star size={18} strokeWidth={1.5} />
                  </div>
                  <div className="font-serif italic text-2xl mt-4">{t.name}</div>
                  <div className="text-sm mt-1">{t.cost}</div>
                  <ul className="mt-5 space-y-2 text-sm">
                    {t.benefits.map((b) => (
                      <li key={b} className="flex gap-2 items-start">
                        <Check size={14} strokeWidth={1.5} className="mt-1 shrink-0" /> {b}
                      </li>
                    ))}
                  </ul>
                  <button className={`mt-6 w-full rounded-md py-3 lowercase text-sm ${active ? 'bg-sz-beige-warm text-sz-ink' : 'bg-sz-ink text-sz-paper hover:bg-[#3D3936] transition'}`}>
                    {active ? 'current tier' : 'join →'}
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {tab === 'settings' && (
          <section className="bg-sz-paper rounded-xl p-8 max-w-2xl">
            <h2 className="font-sans font-medium text-xl lowercase mb-6">settings</h2>
            <div className="space-y-5">
              {[['first name', user.first_name],['last name', user.last_name],['email', user.email]].map(([label, val]) => (
                <div key={label}>
                  <div className="text-[0.8rem] text-sz-concrete-dark lowercase mb-1.5">{label}</div>
                  <input defaultValue={val} className="w-full px-4 py-3 rounded-sm bg-sz-beige-light border border-sz-concrete-soft focus:outline-none focus:border-sz-ink" />
                </div>
              ))}
              <button className="bg-sz-ink text-sz-paper px-6 py-3 rounded-md lowercase hover:bg-[#3D3936] transition">save</button>
            </div>
          </section>
        )}

        <div className="mt-14">
          <div className="flex items-end justify-between mb-5">
            <h2 className="font-sans font-medium text-xl lowercase">recommended for you</h2>
            <Link to="/shop" className="text-sm lowercase inline-flex items-center gap-2 hover:gap-3 transition-all">
              shop all <ArrowRight size={14} strokeWidth={1.5} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products.slice(0, 4).map((p) => (
              <Link key={p.id} to={`/shop/${p.id}`} className="group">
                <div className="bg-wash-warmth rounded-lg aspect-square overflow-hidden shadow-soft-sm">
                  <img src={p.image_url} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="mt-3 lowercase font-medium">{p.name}</div>
                <div className="text-sm text-sz-concrete-dark">${p.price}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
