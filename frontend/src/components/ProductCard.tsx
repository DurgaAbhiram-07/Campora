import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Eye, Tag, Sparkles, Trash2 } from 'lucide-react';
import { Product } from '../types/product';
import { useWishlist } from '../context/WishlistContext';
import { VerificationBadge } from './VerificationBadge';

interface Props {
  product: Product;
  onQuickView?: (product: Product) => void;
  onDelete?: (product: Product) => void;
}

export const ProductCard: React.FC<Props> = ({ product, onQuickView, onDelete }) => {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const wishlisted = isInWishlist(product.id);

  return (
    <div className="group relative bg-[#F5EFE6] dark:bg-stone-900 rounded-xl overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col h-full border border-[#CFC4B3] dark:border-stone-800">
      
      {/* Product Image Box */}
      <div className="relative aspect-[4/3] overflow-hidden bg-stone-100 dark:bg-stone-800">
        <img
          src={product.images[0] || 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&q=80&w=600'}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Top Action Buttons (Delete / Wishlist) */}
        <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
          {onDelete && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onDelete(product);
              }}
              title="Delete Listing"
              className="p-2 rounded-lg bg-rose-600/90 text-white hover:bg-rose-600 active:scale-95 transition-all shadow-md"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className="p-2 rounded-lg bg-white/90 dark:bg-stone-900/90 hover:bg-white dark:hover:bg-stone-900 active:scale-95 transition-all shadow-md"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                wishlisted ? 'fill-rose-600 text-rose-600' : 'text-stone-700 dark:text-stone-200'
              }`}
            />
          </button>
        </div>

        {/* Condition, Discount & Listing Type Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10 max-w-[75%]">
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-rose-600 text-white shadow-sm">
              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
            </span>
          )}

          {product.listingType === 'RENT' ? (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-stone-800 text-white shadow-sm">
              Rent · ₹{product.rentPricePerDay || product.price}/day
            </span>
          ) : product.listingType === 'EXCHANGE' ? (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-600 text-white shadow-sm">
              Trade / Exchange
            </span>
          ) : (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-stone-900/90 backdrop-blur-md text-white">
              {product.condition}
            </span>
          )}

          {product.negotiable && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-500 text-stone-950 flex items-center gap-1 shadow-sm">
              <Tag className="w-3 h-3" /> Negotiable
            </span>
          )}
        </div>

        {/* Quick View Hover Button */}
        {onQuickView && (
          <div className="absolute inset-0 bg-stone-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
            <button
              onClick={() => onQuickView(product)}
              className="px-3.5 py-2 rounded-lg bg-white dark:bg-stone-900 font-bold text-xs text-stone-900 dark:text-white flex items-center gap-1.5 hover:opacity-95 transition-opacity shadow-md"
            >
              <Eye className="w-4 h-4 text-rose-500" />
              <span>Quick Preview</span>
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 justify-between gap-4">
        <div>
          {/* Category & Verified Status */}
          <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 mb-1.5">
            <span className="font-semibold text-rose-600 dark:text-rose-400 uppercase tracking-wider">{product.category}</span>
            {product.sellerVerified && <VerificationBadge showText={false} />}
          </div>

          {/* Title */}
          <Link to={`/products/${product.id}`} className="block group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
            <h3 className="font-bold text-base text-stone-900 dark:text-stone-100 line-clamp-2 leading-snug">
              {product.title}
            </h3>
          </Link>
        </div>

        {/* Price & Location details */}
        <div className="space-y-3 pt-2 border-t border-stone-100 dark:border-stone-800/80">
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-black text-stone-900 dark:text-white">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xs text-stone-400 line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1 text-[11px] text-stone-400">
              <Eye className="w-3 h-3" />
              <span>{product.views} views</span>
            </div>
          </div>

          {/* Location & Seller Link */}
          <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
            <div className="flex items-center gap-1 truncate max-w-[170px]">
              <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
              <span className="truncate">{product.location || 'Campus Main Block'}</span>
            </div>

            {product.sellerName && (
              <Link 
                to={`/profile/${product.sellerId}`}
                className="font-semibold text-emerald-600 dark:text-emerald-400 hover:underline truncate"
              >
                {product.sellerName.split(' ')[0]}
              </Link>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

