import { Search, User, ShoppingBag, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useRouter } from '../lib/router';
import { useApp } from '../lib/AppState';

export default function Masthead() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { cart, setCartOpen, setSearchOpen } = useApp();
  const { navigate } = useRouter();
  const count = cart.reduce((n, i) => n + i.quantity, 0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'shop', to: '/shop' },
    { label: 'ritual', to: '/ritual/quiz' },
    { label: 'brand', to: '/brand' },
    { label: 'community', to: '/community' },
  ];

  return (
    <>
      <div className="w-full bg-sz-paper text-sz-ink text-[0.75rem] font-light py-2 text-center border-b border-sz-concrete-soft/40">
        complimentary delivery on $95+ &nbsp;·&nbsp; <Link to="/ritual/quiz" className="underline-offset-2 hover:underline">take the ritual quiz</Link>
      </div>
      <header className={`sticky top-0 z-50 transition-colors duration-500 ease-soft ${scrolled ? 'bg-sz-beige-light/95 backdrop-blur' : 'bg-sz-paper'} border-b border-sz-concrete-soft/30`}>
        <div className="max-w-[1320px] mx-auto px-4 md:px-8 h-16 md:h-20 flex items-center justify-between gap-6">
          <button className="md:hidden p-2 -ml-2" onClick={() => setMenuOpen(true)} aria-label="open menu">
            <Menu size={22} strokeWidth={1.5} />
          </button>
          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <Link key={l.to} to={l.to} className="text-[0.9rem] lowercase text-sz-ink hover:text-sz-concrete-dark transition-colors">
                {l.label}
              </Link>
            ))}
          </nav>
          <Link to="/" className="font-serif italic text-[1.65rem] md:text-[1.85rem] text-sz-ink leading-none">
            SIZS
          </Link>
          <div className="flex items-center gap-1 md:gap-2">
            <button onClick={() => setSearchOpen(true)} className="p-2 hover:opacity-70 transition" aria-label="search">
              <Search size={20} strokeWidth={1.5} />
            </button>
            <button onClick={() => navigate('/account')} className="p-2 hover:opacity-70 transition hidden md:inline-flex" aria-label="account">
              <User size={20} strokeWidth={1.5} />
            </button>
            <button onClick={() => setCartOpen(true)} className="p-2 relative hover:opacity-70 transition" aria-label="bag">
              <ShoppingBag size={20} strokeWidth={1.5} />
              {count > 0 && (
                <span className="absolute -top-0 -right-0 min-w-[18px] h-[18px] px-1 flex items-center justify-center text-[0.65rem] bg-sz-beige-warm text-sz-ink rounded-full font-medium">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu sheet */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 z-[100]" onClick={() => setMenuOpen(false)}>
          <div className="absolute inset-0 bg-sz-ink/20" />
          <div className="absolute bottom-0 left-0 right-0 bg-sz-beige-light rounded-t-xl p-6 animate-fade-up" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <span className="font-serif italic text-2xl">SIZS</span>
              <button onClick={() => setMenuOpen(false)} className="p-1">
                <X size={22} strokeWidth={1.5} />
              </button>
            </div>
            <div className="flex flex-col gap-1">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setMenuOpen(false)}
                  className="bg-sz-paper rounded-md px-5 py-4 text-lg lowercase flex items-center justify-between"
                >
                  {l.label} <span className="text-sz-concrete">→</span>
                </Link>
              ))}
              <Link to="/account" onClick={() => setMenuOpen(false)} className="bg-sz-paper rounded-md px-5 py-4 text-lg lowercase flex items-center justify-between mt-2">
                account <span className="text-sz-concrete">→</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
