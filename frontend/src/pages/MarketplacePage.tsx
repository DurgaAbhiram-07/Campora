import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, LayoutGrid, List, SlidersHorizontal, RotateCcw, X } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { ProductCard } from '../components/ProductCard';
import { QuickViewModal } from '../components/QuickViewModal';
import { CATEGORIES_LIST } from '../components/CategoriesSection';
import { Product, ProductCategory } from '../types/product';

export const MarketplacePage: React.FC = () => {
  const { products } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState<string>(searchParams.get('category') || 'All');
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(100000);
  const [conditionFilter, setConditionFilter] = useState<string>('All');
  const [negotiableOnly, setNegotiableOnly] = useState<boolean>(false);
  const [verifiedOnly, setVerifiedOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'newest' | 'price-low' | 'price-high' | 'popular'>('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Sync state when URL params change (e.g. from Navbar global search bar)
  React.useEffect(() => {
    const q = searchParams.get('search');
    const cat = searchParams.get('category');
    if (q !== null) setSearch(q);
    if (cat !== null) setSelectedCategory(cat);
  }, [searchParams]);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products.filter((prod) => {
      // Search match
      if (search && !prod.title.toLowerCase().includes(search.toLowerCase()) && !prod.tags.some(t => t.includes(search.toLowerCase()))) {
        return false;
      }
      // Category match
      if (selectedCategory !== 'All' && prod.category !== selectedCategory) {
        return false;
      }
      // Price range
      if (prod.price < minPrice || prod.price > maxPrice) {
        return false;
      }
      // Condition
      if (conditionFilter !== 'All' && prod.condition !== conditionFilter) {
        return false;
      }
      // Negotiable
      if (negotiableOnly && !prod.negotiable) {
        return false;
      }
      // Verified seller
      if (verifiedOnly && !prod.sellerVerified) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'popular') return b.views - a.views;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [search, selectedCategory, minPrice, maxPrice, conditionFilter, negotiableOnly, verifiedOnly, sortBy]);

  const resetFilters = () => {
    setSearch('');
    setSelectedCategory('All');
    setMinPrice(0);
    setMaxPrice(100000);
    setConditionFilter('All');
    setNegotiableOnly(false);
    setVerifiedOnly(false);
    setSortBy('newest');
    setSearchParams({});
  };

  return (
    <div className="min-h-screen py-10 bg-[#E8E1D5] dark:bg-black transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-stone-900 dark:text-white">Campus Marketplace</h1>
            <p className="text-xs text-stone-600 dark:text-stone-400 mt-1">Showing {filteredProducts.length} listings inside campus network</p>
          </div>

            {/* Search & Layout Controls */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 md:w-72">
              <input
                type="text"
                placeholder="Search listings..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-[#F5EFE6] dark:bg-stone-800 border border-[#CFC4B3] dark:border-stone-700 text-xs focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
              <Search className="w-4 h-4 text-stone-500 absolute left-3 top-2.5" />
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center p-1 rounded-lg bg-[#F5EFE6] dark:bg-stone-800 border border-[#CFC4B3] dark:border-stone-700">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-md ${viewMode === 'grid' ? 'bg-rose-600 text-white' : 'text-stone-400'}`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-md ${viewMode === 'list' ? 'bg-rose-600 text-white' : 'text-stone-400'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden p-2 rounded-lg bg-rose-600 text-white flex items-center gap-1.5 text-xs font-bold"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:col-span-3 lg:block space-y-6">
            <div className="glass-card rounded-xl p-6 border border-[#CFC4B3] dark:border-stone-800 space-y-6 sticky top-28">
              
              <div className="flex items-center justify-between border-b border-[#CFC4B3] dark:border-stone-800 pb-3">
                <h3 className="font-bold text-sm text-stone-900 dark:text-white flex items-center gap-2">
                  <Filter className="w-4 h-4 text-rose-500" /> Filters
                </h3>
                <button
                  onClick={resetFilters}
                  className="text-xs text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1 font-semibold"
                >
                  <RotateCcw className="w-3 h-3" /> Reset
                </button>
              </div>

              {/* Sort dropdown */}
              <div>
                <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full p-2.5 rounded-lg bg-[#DDD4C3] dark:bg-stone-800 border border-[#C5BBAA] dark:border-stone-700 text-xs font-semibold"
                >
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="popular">Most Viewed</option>
                </select>
              </div>

              {/* Categories */}
              <div>
                <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-2.5 rounded-lg bg-[#DDD4C3] dark:bg-stone-800 border border-[#C5BBAA] dark:border-stone-700 text-xs font-semibold"
                >
                  <option value="All">All Categories</option>
                  {CATEGORIES_LIST.map(c => (
                    <option key={c.name} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>

              {/* Condition */}
              <div>
                <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-2">Condition</label>
                <div className="space-y-1.5 text-xs font-medium">
                  {['All', 'Like New', 'Good', 'Fair'].map(cond => (
                    <label key={cond} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="condition"
                        checked={conditionFilter === cond}
                        onChange={() => setConditionFilter(cond)}
                        className="accent-rose-600"
                      />
                      <span>{cond}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Toggles */}
              <div className="space-y-3 pt-3 border-t border-stone-100 dark:border-stone-800 text-xs font-semibold">
                <label className="flex items-center justify-between cursor-pointer">
                  <span>Negotiable Only</span>
                  <input
                    type="checkbox"
                    checked={negotiableOnly}
                    onChange={(e) => setNegotiableOnly(e.target.checked)}
                    className="w-4 h-4 accent-rose-600 rounded"
                  />
                </label>
                <label className="flex items-center justify-between cursor-pointer">
                  <span>Verified Sellers Only</span>
                  <input
                    type="checkbox"
                    checked={verifiedOnly}
                    onChange={(e) => setVerifiedOnly(e.target.checked)}
                    className="w-4 h-4 accent-rose-600 rounded"
                  />
                </label>
              </div>

            </div>
          </aside>

          {/* Product Listings Column */}
          <main className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="glass-card rounded-xl p-12 text-center border border-stone-200 dark:border-stone-800 space-y-4">
                <div className="w-16 h-16 rounded-full bg-rose-500/10 text-rose-500 mx-auto flex items-center justify-center">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-lg text-stone-900 dark:text-white">No Campus Listings Found</h3>
                <p className="text-xs text-stone-500 max-w-sm mx-auto">Try clearing your search query or expanding your category and price filters.</p>
                <button
                  onClick={resetFilters}
                  className="px-5 py-2.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs shadow-sm transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={(p) => setQuickViewProduct(p)}
                  />
                ))}
              </div>
            )}
          </main>

        </div>

      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
};

