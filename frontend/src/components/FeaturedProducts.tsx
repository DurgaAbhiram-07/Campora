import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { ProductCard } from './ProductCard';
import { QuickViewModal } from './QuickViewModal';
import { Product } from '../types/product';
import { Sparkles, Package } from 'lucide-react';

export const FeaturedProducts: React.FC = () => {
  const { products } = useProducts();
  const [selectedQuickView, setSelectedQuickView] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState<'All' | 'Books' | 'Electronics' | 'Vehicles' | 'Campus Essentials'>('All');

  const filtered = activeTab === 'All' 
    ? products 
    : products.filter(p => p.category === activeTab);

  return (
    <section className="py-10 sm:py-14 bg-[#E8E1D5] dark:bg-black transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-rose-600 dark:text-rose-400">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Campus Spotlights</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white mt-1">
              Featured Campus Listings
            </h2>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            {(['All', 'Books', 'Electronics', 'Vehicles', 'Campus Essentials'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === tab
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'bg-[#DDD4C3] dark:bg-stone-800 text-stone-900 dark:text-stone-300 hover:bg-[#D4CABA] dark:hover:bg-stone-700 border border-[#C5BBAA] dark:border-stone-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid or Empty State */}
        {filtered.length === 0 ? (
          <div className="py-12 px-6 text-center border border-dashed border-[#CFC4B3] dark:border-stone-800 rounded-xl bg-[#F5EFE6] dark:bg-stone-900/50">
            <div className="w-12 h-12 mx-auto rounded-lg bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-400 mb-3">
              <Package className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-stone-900 dark:text-white mb-1">
              No campus listings posted yet
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 max-w-sm mx-auto mb-4">
              Be the first student to list books, electronics, or college gear on your campus hub.
            </p>
            <Link
              to="/sell"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition-colors shadow-sm"
            >
              + Post First Listing
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setSelectedQuickView(p)}
              />
            ))}
          </div>
        )}

        {/* View All CTA */}
        {products.length > 0 && (
          <div className="mt-10 text-center">
            <Link
              to="/marketplace"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-stone-900 dark:bg-white text-white dark:text-stone-900 font-bold text-xs sm:text-sm hover:opacity-90 transition-opacity shadow-sm"
            >
              <span>Browse All {products.length} Campus Listings</span> →
            </Link>
          </div>
        )}

      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={selectedQuickView}
        onClose={() => setSelectedQuickView(null)}
      />
    </section>
  );
};

