type Props = {
  text: string;
  variant?: 'ink' | 'warm' | 'paper';
  italic?: boolean;
  speed?: number;
};

export default function Marquee({ text, variant = 'ink', italic = true, speed = 40 }: Props) {
  const bg = variant === 'ink' ? 'bg-sz-ink text-sz-paper' : variant === 'warm' ? 'bg-sz-beige-warm text-sz-ink' : 'bg-sz-paper text-sz-ink';
  const font = italic ? 'font-serif italic' : 'font-sans lowercase';
  const items = Array.from({ length: 8 }).map((_, i) => (
    <span key={i} className={`${font} text-2xl md:text-[1.5rem] px-6 whitespace-nowrap flex items-center gap-6`}>
      {text}
      <span className="opacity-60">◆</span>
    </span>
  ));
  return (
    <div className={`marquee-wrap overflow-hidden w-full ${bg} py-5 md:py-6 border-y border-sz-ink/5`}>
      <div className="marquee-track" style={{ animationDuration: `${speed}s` }}>
        {items}
        {items}
      </div>
    </div>
  );
}
