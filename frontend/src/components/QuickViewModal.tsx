import React from 'react';
import { Link } from 'react-router-dom';
import { X, MapPin, MessageSquare, Phone, ShieldCheck, Heart, Share2 } from 'lucide-react';
import { Product } from '../types/product';
import { useWishlist } from '../context/WishlistContext';

interface Props {
  product: Product | null;
  onClose: () => void;
}

export const QuickViewModal: React.FC<Props> = ({ product, onClose }) => {
  const { toggleWishlist, isInWishlist } = useWishlist();

  if (!product) return null;
  const wishlisted = isInWishlist(product.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-3xl glass-modal rounded-3xl overflow-hidden shadow-2xl border border-stone-200 dark:border-stone-800 flex flex-col md:flex-row max-h-[90vh]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-stone-100/80 dark:bg-stone-800/80 border border-stone-200/80 dark:border-stone-700/80 hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image Preview */}
        <div className="md:w-1/2 bg-stone-900 relative aspect-square md:aspect-auto">
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-full object-cover"
          />
          <span className="absolute bottom-4 left-4 text-xs font-bold px-2.5 py-1 rounded-md bg-stone-900/80 backdrop-blur-md text-white">
            {product.condition}
          </span>
        </div>

        {/* Specs & Seller details */}
        <div className="md:w-1/2 p-6 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-4">
            <div>
              <span className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">{product.category}</span>
              <h2 className="text-xl font-bold text-stone-900 dark:text-white mt-1">{product.title}</h2>
              <div className="text-2xl font-black text-rose-600 dark:text-rose-400 mt-2">
                ₹{product.price.toLocaleString('en-IN')}
                {product.negotiable && <span className="text-xs font-medium text-stone-400 ml-2">(Negotiable)</span>}
              </div>
            </div>

            <p className="text-xs text-stone-600 dark:text-stone-300 line-clamp-3 leading-relaxed">
              {product.description}
            </p>

            {/* Seller Card */}
            <div className="p-3 rounded-2xl bg-stone-100 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={product.sellerAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'}
                  alt={product.sellerName}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="flex items-center gap-1">
                    <p className="font-bold text-xs">{product.sellerName}</p>
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  </div>
                  <p className="text-[11px] text-stone-500">{product.sellerDepartment} • {product.sellerYear || 'Student'}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-stone-500">
              <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
              <span>{product.location}</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="pt-6 border-t border-stone-200 dark:border-stone-800 flex gap-3">
            <Link
              to={`/products/${product.id}`}
              onClick={onClose}
              className="flex-1 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs text-center shadow-sm transition-colors"
            >
              Full Details
            </Link>
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`p-3 rounded-xl border ${
                wishlisted ? 'border-rose-500 bg-rose-500/10 text-rose-500' : 'border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              <Heart className={`w-4 h-4 ${wishlisted ? 'fill-rose-500' : ''}`} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
