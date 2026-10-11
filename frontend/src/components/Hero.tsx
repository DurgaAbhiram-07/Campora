import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Building2, ArrowRight, ShieldCheck, Zap, 
  Search, TrendingUp, Tag, BookOpen, Laptop, Bike, FileText, ChevronDown
} from 'lucide-react';

export const Hero: React.FC = () => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/marketplace?search=${encodeURIComponent(query)}&category=${encodeURIComponent(selectedCategory)}`);
    } else {
      navigate(`/marketplace?category=${encodeURIComponent(selectedCategory)}`);
    }
  };

  return (
    <section className="relative overflow-hidden bg-hero-gradient min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center py-8 sm:py-10 lg:py-12 px-4 transition-colors">
      <div className="max-w-5xl mx-auto w-full relative z-10 text-center flex flex-col items-center">
        
        {/* Campus Network Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-rose-100 dark:bg-rose-950/50 border border-rose-300 dark:border-rose-800 text-xs sm:text-sm font-bold text-rose-800 dark:text-rose-300 shadow-xs mb-3 sm:mb-4">
          <Building2 className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
          <span>Visakhapatnam Engineering Colleges Network</span>
        </div>

        {/* Clear, Grounded Headline with Balanced Two-Line Flow */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-black tracking-tight text-stone-900 dark:text-white leading-[1.2] max-w-4xl mx-auto [text-wrap:balance]">
          Campus Marketplace for Engineering Students <br className="hidden sm:inline" />
          in Visakhapatnam
        </h1>

        {/* Honest, Direct Subtitle */}
        <p className="text-sm sm:text-base md:text-lg text-stone-700 dark:text-stone-300 font-medium leading-relaxed max-w-3xl mx-auto mt-3 sm:mt-4 [text-wrap:balance]">
          Buy and sell second-hand engineering textbooks, scientific calculators, mini drafters, electronics, and cycles directly with peers across Vizag campuses. Zero commission fees and safe handovers at your college gate.
        </p>

        {/* Search Box */}
        <form onSubmit={handleSearch} className="w-full max-w-4xl mx-auto mt-6 sm:mt-7 p-2 sm:p-2.5 rounded-2xl bg-[#F5EFE6] dark:bg-stone-900 border-2 border-[#CFC4B3] dark:border-stone-800 shadow-md space-y-2 sm:space-y-0 sm:flex items-center gap-2">
          <div className="relative flex-1 flex items-center pl-3">
            <Search className="w-5 h-5 text-stone-500 mr-3 shrink-0" />
            <input
              type="text"
              placeholder="Search B.S. Grewal, Drafter, Casio FX-991, cycle, hostel lamp..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full py-2.5 sm:py-3 bg-transparent text-sm sm:text-base text-stone-900 dark:text-white focus:outline-none placeholder:text-stone-500 font-medium"
            />
          </div>

          {/* Category Select */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-[#DDD4C3] dark:bg-stone-800 text-stone-900 dark:text-stone-200 text-xs sm:text-sm font-bold px-3.5 py-2.5 sm:py-3 rounded-xl border border-[#C5BBAA] dark:border-stone-700 focus:outline-none cursor-pointer shrink-0"
          >
            <option value="All">All Categories</option>
            <option value="Books">Academic Books</option>
            <option value="Electronics">Electronics & Gadgets</option>
            <option value="Vehicles">Cycles</option>
            <option value="Campus Essentials">Hostel Essentials</option>
            <option value="Notes">Notes & PYQs</option>
            <option value="Lab Equipment">Lab Equipment</option>
          </select>

          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-2.5 sm:py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-sm transition-colors flex items-center justify-center gap-2 shrink-0"
          >
            <span>Search</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Popular Categories Links */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 text-xs sm:text-sm font-medium text-stone-600 dark:text-stone-400 mt-3 sm:mt-4">
          <span className="inline-flex items-center gap-1.5 font-bold text-stone-800 dark:text-stone-200 text-xs sm:text-sm mr-1">
            <TrendingUp className="w-3.5 h-3.5 text-rose-600" />
            <span>Popular:</span>
          </span>
          <Link
            to="/marketplace?category=Books"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-100 hover:bg-rose-200/90 text-rose-900 dark:bg-rose-950/50 dark:hover:bg-rose-900/60 dark:text-rose-300 border border-rose-300 dark:border-rose-800/60 text-xs font-semibold transition-colors shadow-2xs"
          >
            <BookOpen className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
            <span>Engineering Mathematics</span>
          </Link>
          <Link
            to="/marketplace?category=Electronics"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-100 hover:bg-amber-200/90 text-amber-900 dark:bg-amber-950/50 dark:hover:bg-amber-900/60 dark:text-amber-300 border border-amber-300 dark:border-amber-800/60 text-xs font-semibold transition-colors shadow-2xs"
          >
            <Laptop className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>Calculators & Laptops</span>
          </Link>
          <Link
            to="/marketplace?category=Vehicles"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-100 hover:bg-emerald-200/90 text-emerald-900 dark:bg-emerald-950/50 dark:hover:bg-emerald-900/60 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800/60 text-xs font-semibold transition-colors shadow-2xs"
          >
            <Bike className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Bicycles</span>
          </Link>
          <Link
            to="/marketplace?category=Lab Equipment"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-100 hover:bg-sky-200/90 text-sky-900 dark:bg-sky-950/50 dark:hover:bg-sky-900/60 dark:text-sky-300 border border-sky-300 dark:border-sky-800/60 text-xs font-semibold transition-colors shadow-2xs"
          >
            <FileText className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
            <span>Drafter Sets & Lab Kits</span>
          </Link>
        </div>

        {/* Value Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 max-w-4xl w-full mx-auto mt-6 sm:mt-7">
          <div className="p-3.5 sm:p-4 rounded-xl bg-[#F7EFE9] dark:bg-stone-900 border border-[#E5CEC2] dark:border-stone-800 flex items-center gap-3.5 text-left shadow-2xs">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/20 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h4 className="font-bold text-xs sm:text-sm text-stone-900 dark:text-white leading-tight">Verified Roll Numbers</h4>
              <p className="text-xs text-stone-600 dark:text-stone-400 mt-0.5">College ID check required</p>
            </div>
          </div>

          <div className="p-3.5 sm:p-4 rounded-xl bg-[#F8F4E6] dark:bg-stone-900 border border-[#E6DAC0] dark:border-stone-800 flex items-center gap-3.5 text-left shadow-2xs">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/20 flex items-center justify-center shrink-0">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h4 className="font-bold text-xs sm:text-sm text-stone-900 dark:text-white leading-tight">Direct Campus Handover</h4>
              <p className="text-xs text-stone-600 dark:text-stone-400 mt-0.5">Meet at gates or library</p>
            </div>
          </div>

          <div className="p-3.5 sm:p-4 rounded-xl bg-[#EDF5EE] dark:bg-stone-900 border border-[#CCE3CF] dark:border-stone-800 flex items-center gap-3.5 text-left shadow-2xs">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0">
              <Tag className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h4 className="font-bold text-xs sm:text-sm text-stone-900 dark:text-white leading-tight">Zero Brokerage / Cuts</h4>
              <p className="text-xs text-stone-600 dark:text-stone-400 mt-0.5">Direct peer-to-peer</p>
            </div>
          </div>
        </div>

        {/* Campuses Covered Banner */}
        <div className="max-w-4xl w-full mx-auto mt-5 sm:mt-6 pt-3 border-t border-[#CFC4B3] dark:border-stone-800/60 text-xs sm:text-sm text-stone-700 dark:text-stone-400">
          <span className="font-bold text-stone-900 dark:text-stone-200">Default Campus:</span> Chaitanya Engineering College (Kommadi) · Supporting AUCE, GVPCE, ANITS, VIIT, REC & GITAM
        </div>

        {/* Subtle Scroll Down Prompt */}
        <div className="mt-4 sm:mt-5 flex justify-center">
          <a 
            href="#categories" 
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors"
          >
            <span>Scroll to explore categories</span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </a>
        </div>

      </div>
    </section>
  );
};


