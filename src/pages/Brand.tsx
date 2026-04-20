import { ArrowRight } from 'lucide-react';

import { Link } from '../lib/router';

export default function Brand() {
  return (
    <main>
      {/* Hero */}
      <section className="relative h-[90vh] min-h-[600px] overflow-hidden">
        <img src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=2000&q=80&auto=format&fit=crop" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-sz-ink/25" />
        <div className="relative h-full flex flex-col items-center justify-center text-center text-sz-paper px-6">
          <div className="font-serif italic text-[clamp(3rem,8vw,6rem)]">SIZS</div>
          <div className="mt-3 font-light text-[1.1rem]">a study in stillness.</div>
        </div>
      </section>

      {/* Narrative */}
      <section className="bg-sz-paper px-4 md:px-8 py-24">
        <div className="max-w-5xl mx-auto grid md:grid-cols-[40%_60%] gap-12">
          <div>
            <div className="text-[0.72rem] uppercase tracking-widest text-sz-concrete-dark">founded 2024</div>
            <div className="text-sz-concrete-dark text-sm">brooklyn, new york</div>
            <div className="mt-5 font-medium">by Dr. Mara Eldin</div>
            <div className="text-sz-concrete-dark text-sm">cosmetic chemist<br />formerly Estée Lauder Companies<br />2009–2023</div>
            <div className="rounded-lg overflow-hidden mt-8 aspect-[4/5]">
              <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=80&auto=format&fit=crop" alt="founder portrait" className="w-full h-full object-cover grayscale-[0.2]" />
            </div>
          </div>
          <div className="font-light text-[1.0625rem] space-y-5 max-w-[60ch]">
            <p>SIZS was born from a question I couldn't stop asking in the lab: why does skincare sold to women like me talk so loudly? The women in my life — surgeons, producers, founders — weren't looking for a new vocabulary. They were looking for something quieter, and more honest.</p>
            <p>We spent fourteen years developing <em className="font-serif">CT-24™</em>, a tri-peptide complex that asks your skin nothing except presence. Everything else on our shelf was built around that one anchor.</p>
            <blockquote className="font-serif italic text-[clamp(1.5rem,2.5vw,2rem)] text-sz-ink leading-snug py-6 border-l-2 border-sz-beige pl-6 my-2">
              "I wanted skincare that asks nothing of you except presence."
            </blockquote>
            <p>We make fewer pieces than we'd like to. We ship them from a warehouse we walk to. We answer every email. This is what the next decade of skincare should feel like.</p>
            <p>You'll find our philosophy — <em className="font-serif">grounded. honest. free.</em> — in every bottle we send you. Nothing more.</p>
          </div>
        </div>
      </section>

      {/* The Lab */}
      <section className="bg-wash-cocoon py-24 px-4 md:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="text-[0.72rem] uppercase tracking-widest text-sz-concrete-dark">meet</div>
          <div className="font-serif italic text-[clamp(3rem,6vw,5rem)] text-sz-ink mt-2">CT-24™</div>
          <p className="mt-6 font-light text-sz-concrete-dark max-w-md mx-auto">
            fourteen years of peptide research in a single tri-peptide complex.
          </p>
          <div className="mt-10 aspect-square max-w-md mx-auto rounded-xl overflow-hidden">
            <img src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1000&q=80&auto=format&fit=crop" alt="" className="w-full h-full object-cover" />
          </div>
          <div className="grid grid-cols-3 gap-4 mt-10">
            {[['94%', 'reported visibly firmer skin'], ['14 years', 'of formulation research'], ['200+', 'independent clinical hours']].map(([n, t]) => (
              <div key={n}>
                <div className="font-serif italic text-[clamp(1.5rem,3vw,2.5rem)]">{n}</div>
                <div className="text-[0.8rem] text-sz-concrete-dark mt-1">{t}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Standard */}
      <section className="bg-sz-paper px-4 md:px-8 py-24">
        <div className="max-w-[1320px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-sans font-medium text-[clamp(1.5rem,2.5vw,2rem)] lowercase">every formula passes four tests</h2>
            <p className="text-sz-concrete-dark font-light mt-2">before it leaves the lab.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              ['01', 'formulation integrity', 'lab-verified ingredient concentration at every batch.'],
              ['02', 'clinical validation', '8-week minimum trial, n>50, third-party reviewed.'],
              ['03', 'the fifty', 'sensory review by 50 women aged 20–40 before launch.'],
              ['04', 'packaging audit', 'refillable, recycled, supply chain tracked.'],
            ].map(([n, t, b]) => (
              <div key={n} className="bg-sz-beige-light rounded-lg p-6">
                <div className="text-sz-concrete text-sm">{n}</div>
                <div className="font-medium mt-1 lowercase">{t}</div>
                <p className="text-sm text-sz-concrete-dark mt-3 font-light">{b}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <div className="inline-flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-sz-beige-warm flex items-center justify-center font-serif italic text-2xl text-sz-ink">✓</div>
              <div className="text-[0.72rem] uppercase tracking-widest text-sz-concrete-dark mt-2">the SIZS standard</div>
              <div className="text-xs text-sz-concrete-dark">look for this seal on every product page</div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="bg-sz-beige-light px-4 md:px-8 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-sans font-medium text-[clamp(1.5rem,2.5vw,2rem)] lowercase mb-12">what we believe</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              ['grounded', 'calm. built on what works, not what trends.'],
              ['honest', 'the ingredient list is the marketing.'],
              ['free', 'no uniform. no script. whatever shape your beauty takes.'],
            ].map(([t, b]) => (
              <div key={t}>
                <div className="font-serif italic text-2xl">{t}</div>
                <p className="text-sz-concrete-dark text-sm mt-3 font-light">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Studio */}
      <section className="bg-wash-warmth px-4 md:px-8 py-24">
        <div className="max-w-[1320px] mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div className="rounded-xl overflow-hidden aspect-[4/3] shadow-soft-md">
            <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&q=80&auto=format&fit=crop" alt="the studio" className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="font-sans font-medium text-[clamp(1.5rem,2.5vw,2rem)] lowercase">visit the studio</h2>
            <div className="text-sz-concrete-dark mt-2">124 wooster st, soho, nyc</div>
            <p className="mt-5 font-light text-sz-concrete-dark max-w-md">
              treatments by appointment with Dr. Eldin and our trained estheticians.
            </p>
            <Link to="/community" className="mt-6 inline-flex items-center gap-2 bg-sz-ink text-sz-paper px-7 py-3.5 rounded-md lowercase hover:bg-[#3D3936] transition">
              book a treatment <ArrowRight size={14} strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
