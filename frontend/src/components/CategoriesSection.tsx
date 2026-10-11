import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, Laptop, Armchair, Home, Bike, FileText, 
  FlaskConical, Trophy, Shirt, Wrench, FolderGit2, Grid 
} from 'lucide-react';
import { ProductCategory } from '../types/product';
import { useProducts } from '../context/ProductContext';

interface CategoryItem {
  name: ProductCategory;
  icon: React.ReactNode;
  color: string;
}

export const CATEGORIES_LIST: CategoryItem[] = [
  { name: 'Books', icon: <BookOpen className="w-6 h-6" />, color: 'from-rose-600 to-amber-500' },
  { name: 'Electronics', icon: <Laptop className="w-6 h-6" />, color: 'from-amber-500 to-yellow-500' },
  { name: 'Campus Essentials', icon: <Home className="w-6 h-6" />, color: 'from-rose-500 to-rose-700' },
  { name: 'Vehicles', icon: <Bike className="w-6 h-6" />, color: 'from-emerald-500 to-teal-600' },
  { name: 'Notes', icon: <FileText className="w-6 h-6" />, color: 'from-amber-500 to-orange-500' },
  { name: 'Lab Equipment', icon: <FlaskConical className="w-6 h-6" />, color: 'from-rose-600 to-amber-600' },
  { name: 'Furniture', icon: <Armchair className="w-6 h-6" />, color: 'from-rose-500 to-amber-600' },
  { name: 'Sports', icon: <Trophy className="w-6 h-6" />, color: 'from-yellow-500 to-amber-600' },
  { name: 'Fashion', icon: <Shirt className="w-6 h-6" />, color: 'from-rose-400 to-amber-500' },
  { name: 'Services', icon: <Wrench className="w-6 h-6" />, color: 'from-teal-500 to-emerald-600' },
  { name: 'Projects', icon: <FolderGit2 className="w-6 h-6" />, color: 'from-rose-600 to-amber-600' },
  { name: 'Others', icon: <Grid className="w-6 h-6" />, color: 'from-stone-500 to-stone-700' },
];

export const CategoriesSection: React.FC = () => {
  const { products } = useProducts();

  return (
    <section id="categories" className="py-10 sm:py-14 bg-[#DFD7CB] dark:bg-black transition-colors border-t border-[#CFC4B3] dark:border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-rose-600 dark:text-rose-400">Explore Categories</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white mt-1">
              Everything You Need For Campus Life
            </h2>
          </div>
          <Link
            to="/marketplace"
            className="text-sm font-bold text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1"
          >
            <span>View All Categories</span> →
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
          {CATEGORIES_LIST.map((cat) => {
            const liveCount = products.filter(p => p.category === cat.name).length;
            return (
              <Link
                key={cat.name}
                to={`/marketplace?category=${encodeURIComponent(cat.name)}`}
                className="group glass-card rounded-2xl p-5 card-hover flex flex-col items-center text-center justify-between gap-4 border border-[#CFC4B3] dark:border-stone-800"
              >
                {/* Category Icon */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-tr ${cat.color} text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300`}>
                  {cat.icon}
                </div>

                {/* Title & Real Count */}
                <div>
                  <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-stone-400 mt-1">
                    {liveCount > 0 ? `${liveCount} item${liveCount === 1 ? '' : 's'}` : 'View items'}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
};

