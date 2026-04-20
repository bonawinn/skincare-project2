import { Plus, Star } from 'lucide-react';
import { Link } from '../lib/router';
import type { Product } from '../lib/types';
import { useApp } from '../lib/AppState';

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useApp();

  return (
    <div className="group">
      <Link to={`/shop/${product.id}`} className="block">
        <div className="relative bg-wash-warmth rounded-lg overflow-hidden shadow-soft-sm group-hover:shadow-soft-md transition-all duration-500 ease-soft aspect-square">
          <img
            src={product.image_url}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-soft group-hover:-translate-y-1"
            loading="lazy"
          />
          {product.badge && (
            <span className="absolute bottom-3 left-3 bg-sz-beige-warm text-sz-ink text-[0.72rem] px-3 py-1 rounded-full lowercase">
              {product.badge}
            </span>
          )}
          <button
            onClick={(e) => {
              e.preventDefault();
              addToCart(product.id, '50ml');
            }}
            className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 bg-sz-ink text-sz-paper text-[0.72rem] px-3 py-1.5 rounded-full flex items-center gap-1 transition-all duration-300 lowercase"
          >
            <Plus size={12} strokeWidth={2} /> add to bag
          </button>
        </div>
      </Link>
      <div className="mt-4">
        <div className="flex justify-between items-start gap-3">
          <Link to={`/shop/${product.id}`} className="lowercase text-[1.05rem] font-medium text-sz-ink hover:text-sz-concrete-dark transition">
            {product.name}
          </Link>
          <span className="text-[0.95rem] font-medium text-sz-ink whitespace-nowrap">${product.price}</span>
        </div>
        <div className="text-[0.85rem] text-sz-concrete-dark font-light mt-1">{product.subtitle}</div>
        <div className="flex items-center gap-1.5 mt-2 text-[0.72rem] text-sz-concrete">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={11} fill={i < Math.round(product.rating) ? '#2B2926' : 'transparent'} strokeWidth={1} className="text-sz-ink" />
            ))}
          </div>
          <span>({product.review_count})</span>
        </div>
      </div>
    </div>
  );
}
