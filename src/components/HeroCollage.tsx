import { useEffect, useState, useCallback } from 'react';
import { getHeroCollageImages } from '../lib/data';
import { useRouter } from '../lib/router';
import type { HeroCollageImage } from '../lib/types';

const LAYOUT_SLOTS: { top: string; left: string; w: string; h: string }[] = [
  { top: '0%', left: '0%', w: '46%', h: '52%' },
  { top: '2%', left: '44%', w: '34%', h: '40%' },
  { top: '0%', left: '72%', w: '28%', h: '48%' },
  { top: '54%', left: '0%', w: '30%', h: '46%' },
  { top: '44%', left: '28%', w: '38%', h: '56%' },
  { top: '50%', left: '64%', w: '36%', h: '50%' },
  { top: '40%', left: '80%', w: '20%', h: '36%' },
];

export default function HeroCollage() {
  const [images, setImages] = useState<HeroCollageImage[]>([]);
  const [loaded, setLoaded] = useState<Set<string>>(new Set());
  const { navigate } = useRouter();

  useEffect(() => {
    getHeroCollageImages().then(setImages);
  }, []);

  const markLoaded = useCallback((id: string) => {
    setLoaded((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }, []);

  if (images.length === 0) {
    return (
      <div className="rounded-xl overflow-hidden shadow-soft-md aspect-[5/4] bg-sz-beige animate-pulse" />
    );
  }

  return (
    <div className="relative w-full aspect-[5/4] rounded-xl overflow-hidden shadow-soft-md bg-sz-beige-light">
      {images.slice(0, LAYOUT_SLOTS.length).map((img, i) => {
        const slot = LAYOUT_SLOTS[i];
        const isVisible = loaded.has(img.id);

        return (
          <div
            key={img.id}
            className="absolute transition-all duration-700 ease-soft"
            style={{
              top: slot.top,
              left: slot.left,
              width: slot.w,
              height: slot.h,
              zIndex: img.z_index,
              transform: `rotate(${img.rotation_deg}deg)`,
              padding: '3px',
            }}
          >
            <div
              className={`w-full h-full bg-white rounded-sm shadow-soft-sm overflow-hidden${img.product_id ? ' cursor-pointer group/card' : ''}`}
              style={{
                padding: '4px 4px 16px 4px',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'scale(1)' : 'scale(0.92)',
                transition: `opacity 600ms ease ${i * 120}ms, transform 600ms ease ${i * 120}ms`,
              }}
              onClick={img.product_id ? () => navigate(`/product/${img.product_id}`) : undefined}
              role={img.product_id ? 'link' : undefined}
              tabIndex={img.product_id ? 0 : undefined}
              onKeyDown={img.product_id ? (e) => { if (e.key === 'Enter') navigate(`/product/${img.product_id}`); } : undefined}
            >
              <img
                src={img.image_url}
                alt={img.alt_text}
                className={`w-full h-full object-cover transition-transform duration-300${img.product_id ? ' group-hover/card:scale-105' : ''}`}
                loading={i < 3 ? 'eager' : 'lazy'}
                onLoad={() => markLoaded(img.id)}
              />
            </div>
          </div>
        );
      })}

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 50%, rgba(239,232,221,0.4) 100%)',
        }}
      />
    </div>
  );
}
