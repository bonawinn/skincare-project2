import { useEffect, useState } from 'react';

export default function WelcomeWash() {
  const [mounted, setMounted] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const seen = sessionStorage.getItem('sizs-welcome');
    if (seen) return;
    sessionStorage.setItem('sizs-welcome', '1');
    setMounted(true);

    const dismiss = () => {
      setFading(true);
      setTimeout(() => setMounted(false), 700);
    };

    const t = setTimeout(dismiss, 1800);
    const onClick = () => {
      clearTimeout(t);
      dismiss();
    };
    window.addEventListener('click', onClick);
    return () => {
      clearTimeout(t);
      window.removeEventListener('click', onClick);
    };
  }, []);

  if (!mounted) return null;
  return (
    <div
      className="fixed inset-0 z-[200] bg-sz-beige-light flex flex-col items-center justify-center animate-fade-in"
      style={{
        opacity: fading ? 0 : 1,
        transition: 'opacity 700ms ease-in-out',
        pointerEvents: fading ? 'none' : 'auto',
      }}
    >
      <div className="text-center">
        <div className="font-serif italic text-[3rem] md:text-[4rem] text-sz-ink leading-none">SIZS</div>
        <div className="mt-3 text-sm text-sz-concrete-dark animate-fade-up" style={{ animationDelay: '400ms' }}>
          naturally yours.
        </div>
      </div>
    </div>
  );
}
