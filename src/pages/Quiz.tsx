import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { getProducts } from '../lib/data';
import type { Product } from '../lib/types';
import { Link } from '../lib/router';

const questions = [
  { q: 'how would you describe your mornings?', a: ['rushed', 'slow', 'variable', 'ritualistic'] },
  { q: 'what does your skin ask for, lately?', a: ['calm', 'firmness', 'glow', 'clarity', 'all of these'] },
  { q: 'how many steps fit your routine?', a: ['one or two', 'three to four', 'five plus', "I'm building one"] },
  { q: 'when does it react?', a: ['rarely', 'with cold weather', 'with stress', 'often'] },
  { q: 'where will the ritual live?', a: ['home only', 'home + travel', 'mostly travel'] },
  { q: "what's a comfortable monthly spend on your shelf?", a: ['under $100', '$100–$250', '$250–$500', '$500+'] },
];

export default function Quiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => { getProducts().then(setProducts); }, []);

  const pick = (v: string) => {
    const next = [...answers];
    next[step] = v;
    setAnswers(next);
    setTimeout(() => {
      if (step + 1 < questions.length) setStep(step + 1);
      else setDone(true);
    }, 250);
  };

  const recommended = products.slice(0, 4);
  const total = recommended.reduce((s, p) => s + p.price, 0);
  const pct = Math.round(((step + (done ? 1 : 0)) / questions.length) * 100);

  if (done) {
    return (
      <main className="min-h-screen bg-wash-morning px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <div className="font-serif italic text-[clamp(2.5rem,5vw,4rem)] text-sz-ink">your ritual.</div>
          <p className="mt-4 text-sz-concrete-dark font-light">four pieces. one ceremony. yours.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-12">
            {recommended.map((p) => (
              <Link key={p.id} to={`/shop/${p.id}`} className="bg-sz-paper rounded-lg p-4 hover:shadow-soft-md transition">
                <div className="aspect-square rounded-sm overflow-hidden bg-sz-beige-light">
                  <img src={p.image_url} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="mt-3 lowercase font-medium text-sm">{p.name}</div>
                <div className="text-xs text-sz-concrete-dark">${p.price}</div>
              </Link>
            ))}
          </div>
          <button className="mt-10 bg-sz-ink text-sz-paper px-8 py-4 rounded-md lowercase font-medium hover:bg-[#3D3936] transition">
            add the ritual — ${total}
          </button>
          <div className="mt-4 space-x-4 text-sm">
            <Link to="/account" className="lowercase underline underline-offset-4">save this to my account →</Link>
            <button onClick={() => { setStep(0); setAnswers([]); setDone(false); }} className="lowercase text-sz-concrete-dark hover:text-sz-ink">retake the quiz</button>
          </div>
        </div>
      </main>
    );
  }

  const current = questions[step];

  return (
    <main className="min-h-screen bg-wash-morning px-4 py-8 flex flex-col">
      <div className="flex items-center justify-between max-w-3xl mx-auto w-full">
        <button onClick={() => step > 0 && setStep(step - 1)} className="text-sm text-sz-concrete-dark lowercase inline-flex items-center gap-1.5 disabled:opacity-40" disabled={step === 0}>
          <ArrowLeft size={14} strokeWidth={1.5} /> back
        </button>
        <div className="text-xs text-sz-concrete-dark">{step + 1} / {questions.length}</div>
        <Link to="/" className="text-sm text-sz-concrete-dark lowercase">skip</Link>
      </div>
      <div className="max-w-3xl mx-auto w-full mt-3">
        <div className="h-0.5 bg-sz-beige-warm/50 rounded-full overflow-hidden">
          <div className="h-full bg-sz-ink transition-all duration-500 ease-soft" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center max-w-3xl mx-auto w-full">
        <h1 className="font-serif italic text-[clamp(1.75rem,4vw,3rem)] text-sz-ink text-center lowercase leading-tight">
          {current.q}
        </h1>
        <div className="mt-12 flex flex-wrap gap-3 justify-center">
          {current.a.map((v) => {
            const active = answers[step] === v;
            return (
              <button
                key={v}
                onClick={() => pick(v)}
                className={`px-6 py-3.5 rounded-full text-[0.95rem] lowercase transition-all ${active ? 'bg-sz-ink text-sz-paper scale-[0.98]' : 'bg-sz-paper text-sz-ink hover:bg-sz-beige-warm/60'}`}
              >
                {v}
              </button>
            );
          })}
        </div>
        {answers[step] && (
          <button onClick={() => { if (step + 1 < questions.length) setStep(step + 1); else setDone(true); }} className="mt-12 inline-flex items-center gap-2 text-sm lowercase text-sz-concrete-dark hover:text-sz-ink">
            continue <ArrowRight size={14} strokeWidth={1.5} />
          </button>
        )}
      </div>
    </main>
  );
}
