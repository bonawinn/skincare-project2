import { Instagram, Youtube } from 'lucide-react';
import { Link } from '../lib/router';


export default function Footer() {
  return (
    <footer>
      <div className="bg-wash-warmth py-20 md:py-24 text-center px-6">
        <h3 className="font-serif italic text-sz-ink text-[2rem] md:text-[2.5rem]">stay close.</h3>
        <p className="mt-2 text-sz-concrete-dark text-[0.95rem]">one quiet letter, every other sunday.</p>
        <form
          className="mt-6 flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            placeholder="your email"
            className="flex-1 px-4 py-3 rounded-sm bg-sz-paper border border-sz-concrete-soft text-[0.95rem] focus:outline-none focus:border-sz-ink"
          />
          <button className="bg-sz-ink text-sz-paper px-6 py-3 rounded-md text-[0.9rem] lowercase hover:bg-[#3D3936] transition active:scale-[0.99]">
            subscribe
          </button>
        </form>
        <p className="mt-3 text-xs text-sz-concrete-dark">no spam. unsubscribe whenever.</p>
      </div>

      <div className="bg-sz-ink text-sz-paper px-6 md:px-12 py-16">
        <div className="max-w-[1320px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-start gap-10 md:gap-16">
            <div className="md:w-1/4">
              <div className="font-serif italic text-3xl">SIZS</div>
              <div className="text-sm text-sz-paper/70 mt-1">naturally yours.</div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:flex-1 text-sm">
              {[
                { t: 'shop', l: [['the cream','/shop/sz-tc-50'],['the serum','/shop/sz-ts-30'],['the dew','/shop/sz-td-100'],['body','/shop'],['sets','/shop'],['bestsellers','/shop']] },
                { t: 'ritual', l: [['take the quiz','/ritual/quiz'],['morning ritual','/ritual/quiz'],['evening ritual','/ritual/quiz'],['travel ritual','/ritual/quiz']] },
                { t: 'brand', l: [['our story','/brand'],['the lab','/brand'],['the standard','/brand'],['sustainability','/brand'],['press','/brand'],['careers','/brand']] },
                { t: 'help', l: [['contact','/brand'],['shipping','/brand'],['returns','/brand'],['faq','/brand'],['stores','/brand']] },
              ].map((col) => (
                <div key={col.t}>
                  <div className="lowercase text-sz-paper/60 mb-3 text-[0.8rem] tracking-wider">{col.t}</div>
                  <ul className="space-y-2">
                    {col.l.map(([label, to]) => (
                      <li key={label}>
                        <Link to={to} className="text-sz-paper/90 hover:text-sz-paper lowercase">
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-sz-paper/10 mt-12 pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex gap-3">
              <a className="p-2 rounded-full hover:bg-sz-paper/10 transition" aria-label="instagram"><Instagram size={18} strokeWidth={1.5} /></a>
              <a className="p-2 rounded-full hover:bg-sz-paper/10 transition" aria-label="youtube"><Youtube size={18} strokeWidth={1.5} /></a>
            </div>
            <div className="text-xs text-sz-paper/50 space-x-3">
              <span>© 2026 SIZS, inc. · new york · london</span>
            </div>
          </div>
          <div className="text-xs text-sz-paper/40 mt-4 space-x-3 lowercase">
            <a>privacy</a><span>·</span><a>terms</a><span>·</span><a>cookies</a><span>·</span><a>accessibility</a><span>·</span><a>do not sell</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
