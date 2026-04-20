import type { Kit } from '../lib/types';
import { Link } from '../lib/router';

export default function KitCard({ kit }: { kit: Kit }) {
  const pct = Math.round((kit.savings / kit.individual_total) * 100);
  return (
    <Link to={`/shop`} className="block group">
      <div className="relative bg-wash-warmth rounded-lg overflow-hidden shadow-soft-sm group-hover:shadow-soft-md transition-all duration-500 aspect-[4/5]">
        <img src={kit.image_url} alt={kit.name} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        <div className="absolute bottom-0 left-0 right-0 bg-sz-beige-warm/95 text-sz-ink text-[0.78rem] py-2 text-center lowercase">
          {kit.starter ? '5 pieces' : kit.tsa_ready ? '3 minis · TSA' : '3–4 pieces'} · save {pct}%
        </div>
      </div>
      <div className="mt-4">
        <div className="flex items-baseline gap-3">
          <span className="lowercase text-[1.1rem] font-medium text-sz-ink">{kit.name}</span>
          <span className="text-sz-concrete line-through text-[0.85rem]">${kit.individual_total}</span>
          <span className="text-sz-ink font-medium">${kit.kit_price}</span>
        </div>
        <p className="text-[0.88rem] text-sz-concrete-dark font-light mt-1">{kit.description}</p>
      </div>
    </Link>
  );
}
