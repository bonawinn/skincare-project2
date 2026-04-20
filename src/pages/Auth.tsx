import { useState } from 'react';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import { Link, useRouter } from '../lib/router';

export function Login() {
  const [show, setShow] = useState(false);
  const { navigate } = useRouter();

  return (
    <AuthShell>
      <h1 className="text-[1.5rem] font-medium">welcome back.</h1>
      <p className="text-sm text-sz-concrete-dark font-light mt-1">sign in to continue your ritual.</p>

      <form className="mt-6 space-y-4" onSubmit={(e) => { e.preventDefault(); navigate('/account'); }}>
        <Field label="email">
          <input type="email" required placeholder="you@example.com" className="w-full bg-sz-beige-light border border-sz-concrete-soft rounded-sm px-4 py-3 text-[0.95rem] focus:outline-none focus:border-sz-ink" />
        </Field>
        <Field label="password">
          <div className="relative">
            <input type={show ? 'text' : 'password'} required defaultValue="••••••••" className="w-full bg-sz-beige-light border border-sz-concrete-soft rounded-sm px-4 py-3 pr-10 text-[0.95rem] focus:outline-none focus:border-sz-ink" />
            <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-sz-concrete">
              {show ? <EyeOff size={16} strokeWidth={1.5} /> : <Eye size={16} strokeWidth={1.5} />}
            </button>
          </div>
        </Field>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="w-4 h-4 rounded-xs accent-sz-ink" /> remember me
          </label>
          <a className="text-sz-concrete-dark hover:text-sz-ink cursor-pointer">forgot password?</a>
        </div>

        <button className="w-full bg-sz-ink text-sz-paper py-3.5 rounded-md lowercase font-medium hover:bg-[#3D3936] transition">
          sign in
        </button>

        <div className="flex items-center gap-3 text-xs text-sz-concrete-dark">
          <div className="flex-1 h-px bg-sz-concrete-soft" />
          or continue with
          <div className="flex-1 h-px bg-sz-concrete-soft" />
        </div>

        <button type="button" className="w-full border border-sz-ink text-sz-ink py-3 rounded-md lowercase hover:bg-sz-ink hover:text-sz-paper transition">
          google
        </button>
        <button type="button" className="w-full border border-sz-ink text-sz-ink py-3 rounded-md lowercase hover:bg-sz-ink hover:text-sz-paper transition">
          apple
        </button>
      </form>

      <div className="mt-7 border-t border-sz-concrete-soft/60 pt-5">
        <div className="text-sm text-sz-concrete-dark">new here?</div>
        <Link to="/register" className="inline-flex items-center gap-2 text-sm lowercase font-medium mt-1">
          create an account <ArrowRight size={14} strokeWidth={1.5} />
        </Link>
      </div>
    </AuthShell>
  );
}

export function Register() {
  const { navigate } = useRouter();
  return (
    <AuthShell>
      <h1 className="text-[1.5rem] font-medium">create your account.</h1>
      <p className="text-sm text-sz-concrete-dark font-light mt-1">start your ritual.</p>

      <form className="mt-6 space-y-4" onSubmit={(e) => { e.preventDefault(); navigate('/account'); }}>
        <div className="grid grid-cols-2 gap-3">
          <Field label="first name"><input className="w-full bg-sz-beige-light border border-sz-concrete-soft rounded-sm px-4 py-3 focus:outline-none focus:border-sz-ink" /></Field>
          <Field label="last name"><input className="w-full bg-sz-beige-light border border-sz-concrete-soft rounded-sm px-4 py-3 focus:outline-none focus:border-sz-ink" /></Field>
        </div>
        <Field label="email"><input type="email" className="w-full bg-sz-beige-light border border-sz-concrete-soft rounded-sm px-4 py-3 focus:outline-none focus:border-sz-ink" /></Field>
        <Field label="password"><input type="password" className="w-full bg-sz-beige-light border border-sz-concrete-soft rounded-sm px-4 py-3 focus:outline-none focus:border-sz-ink" /></Field>
        <Field label="confirm password"><input type="password" className="w-full bg-sz-beige-light border border-sz-concrete-soft rounded-sm px-4 py-3 focus:outline-none focus:border-sz-ink" /></Field>
        <label className="flex items-start gap-2 text-sm text-sz-concrete-dark">
          <input type="checkbox" className="mt-1 accent-sz-ink" /> I'd like ritual notes from SIZS (every other sunday).
        </label>
        <button className="w-full bg-sz-ink text-sz-paper py-3.5 rounded-md lowercase font-medium hover:bg-[#3D3936] transition">
          create account
        </button>
      </form>

      <div className="mt-7 border-t border-sz-concrete-soft/60 pt-5 text-sm">
        already have an account? <Link to="/login" className="lowercase underline underline-offset-4">sign in →</Link>
      </div>
    </AuthShell>
  );
}

function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-wash-cocoon flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-[420px] bg-sz-paper rounded-xl p-8 md:p-10 shadow-soft-lg">
        <div className="text-center mb-6">
          <div className="font-serif italic text-[2rem] text-sz-ink">SIZS</div>
        </div>
        {children}
      </div>
    </main>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="text-[0.8rem] text-sz-concrete-dark lowercase mb-1.5">{label}</div>
      {children}
    </label>
  );
}
