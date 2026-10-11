import React, { useState, useMemo } from 'react';
import { 
  Users, ShoppingBag, ShieldCheck, AlertTriangle, TrendingUp, 
  BarChart2, Trash2, Megaphone, CheckCircle 
} from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import toast from 'react-hot-toast';

export const AdminPage: React.FC = () => {
  const { products } = useProducts();
  const [reports, setReports] = useState<any[]>([]);
  const [announcementText, setAnnouncementText] = useState('');

  const registeredUsersCount = useMemo(() => {
    try {
      const saved = localStorage.getItem('campora_registered_users');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed.length;
      }
    } catch (e) {}
    return 0;
  }, []);

  const totalSold = useMemo(() => {
    return products.filter(p => p.status === 'SOLD').length;
  }, [products]);

  const categories = ['Books', 'Electronics', 'Vehicles', 'Campus Essentials'];
  const categoryDistribution = useMemo(() => {
    return categories.map(cat => ({
      category: cat,
      count: products.filter(p => p.category === cat).length
    }));
  }, [products]);

  const maxCategoryCount = useMemo(() => {
    const counts = categoryDistribution.map(c => c.count);
    return Math.max(...counts, 1);
  }, [categoryDistribution]);

  const handleDismissReport = (id: string) => {
    setReports(prev => prev.filter(r => r.id !== id));
    toast.success('Report dismissed.');
  };

  const handlePublishAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!announcementText.trim()) return;
    toast.success('Campus announcement broadcasted!');
    setAnnouncementText('');
  };

  return (
    <div className="min-h-screen py-10 bg-[#E8E1D5] dark:bg-black transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Admin Header */}
        <div className="bg-[#F5EFE6] dark:bg-stone-900 rounded-xl p-6 border border-[#CFC4B3] dark:border-stone-800 flex items-center justify-between shadow-sm">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" /> Campus Moderator Control Panel
            </div>
            <h1 className="text-2xl font-black text-stone-900 dark:text-white mt-1">Dean Student Affairs Portal</h1>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
            System Admin Access
          </span>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#F5EFE6] dark:bg-stone-900 rounded-xl p-5 border border-[#CFC4B3] dark:border-stone-800 space-y-2 shadow-sm">
            <div className="flex items-center justify-between text-rose-500">
              <Users className="w-5 h-5" />
              <span className="text-xs font-bold text-emerald-500">Verified</span>
            </div>
            <div className="text-2xl font-black text-stone-900 dark:text-white">{registeredUsersCount}</div>
            <p className="text-xs text-stone-500">Registered Campus Users</p>
          </div>

          <div className="bg-[#F5EFE6] dark:bg-stone-900 rounded-xl p-5 border border-[#CFC4B3] dark:border-stone-800 space-y-2 shadow-sm">
            <div className="flex items-center justify-between text-amber-500">
              <ShoppingBag className="w-5 h-5" />
              <span className="text-xs font-bold text-emerald-500">Live</span>
            </div>
            <div className="text-2xl font-black text-stone-900 dark:text-white">{products.length}</div>
            <p className="text-xs text-stone-500">Total Listings</p>
          </div>

          <div className="bg-[#F5EFE6] dark:bg-stone-900 rounded-xl p-5 border border-[#CFC4B3] dark:border-stone-800 space-y-2 shadow-sm">
            <div className="flex items-center justify-between text-emerald-500">
              <TrendingUp className="w-5 h-5" />
              <span className="text-xs font-bold text-emerald-500">Settled</span>
            </div>
            <div className="text-2xl font-black text-stone-900 dark:text-white">{totalSold}</div>
            <p className="text-xs text-stone-500">Completed Exchanges</p>
          </div>
        </div>

        {/* Charts & Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Category Distribution Bar Graph */}
          <div className="lg:col-span-7 bg-[#F5EFE6] dark:bg-stone-900 rounded-xl p-6 border border-[#CFC4B3] dark:border-stone-800 space-y-6 shadow-sm">
            <h3 className="font-bold text-base text-stone-900 dark:text-white flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-rose-500" /> Category Breakdown
            </h3>
            <div className="space-y-4">
              {categoryDistribution.map(cat => (
                <div key={cat.category} className="space-y-1.5 text-xs">
                  <div className="flex justify-between font-semibold">
                    <span>{cat.category}</span>
                    <span className="text-stone-500">{cat.count} listings</span>
                  </div>
                  <div className="w-full h-2.5 rounded-md bg-stone-100 dark:bg-stone-800 overflow-hidden">
                    <div
                      className="h-full bg-rose-600 rounded-md transition-all duration-300"
                      style={{ width: products.length > 0 ? `${(cat.count / maxCategoryCount) * 100}%` : '0%' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Broadcast Announcement */}
          <div className="lg:col-span-5 bg-[#F5EFE6] dark:bg-stone-900 rounded-xl p-6 border border-[#CFC4B3] dark:border-stone-800 space-y-4 shadow-sm">
            <h3 className="font-bold text-base text-stone-900 dark:text-white flex items-center gap-2">
              <Megaphone className="w-5 h-5 text-amber-500" /> Broadcast Announcement
            </h3>
            <p className="text-xs text-stone-500">Send an emergency alert banner across the student web app.</p>
            <form onSubmit={handlePublishAnnouncement} className="space-y-3">
              <textarea
                rows={4}
                placeholder="e.g. Annual campus book sale organized at Central Library Grounds this Saturday..."
                value={announcementText}
                onChange={(e) => setAnnouncementText(e.target.value)}
                className="w-full p-3 rounded-lg bg-[#DDD4C3] dark:bg-stone-800 border border-[#C5BBAA] dark:border-stone-700 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-rose-500"
              />
              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-sm transition-colors"
              >
                Broadcast to All Students
              </button>
            </form>
          </div>

        </div>

        {/* Reported Products / Moderation Table */}
        <div className="bg-[#F5EFE6] dark:bg-stone-900 rounded-xl p-6 border border-[#CFC4B3] dark:border-stone-800 space-y-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-stone-900 dark:text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-rose-500" /> Reported Campus Listings ({reports.length})
            </h3>
            <span className="text-xs font-semibold text-stone-500">Active Flags</span>
          </div>

          {reports.length === 0 ? (
            <div className="text-center py-8 space-y-2">
              <CheckCircle className="w-8 h-8 text-emerald-500 mx-auto" />
              <p className="text-xs font-semibold text-stone-600 dark:text-stone-300">All clean! No reported listings pending review.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {reports.map(report => (
                <div key={report.id} className="p-4 rounded-lg bg-stone-100 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs font-bold text-stone-900 dark:text-white">
                      <span>Listing: {report.productTitle}</span>
                      <span className="px-2 py-0.5 rounded-md bg-rose-500/10 text-rose-600 dark:text-rose-400 text-[10px] font-bold">
                        {report.reason}
                      </span>
                    </div>
                    <p className="text-xs text-stone-500">Reported by <strong>{report.reporterName}</strong> • {report.createdAt}</p>
                  </div>
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => handleDismissReport(report.id)}
                      className="flex-1 sm:flex-none px-3.5 py-1.5 rounded-lg bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-stone-200 text-xs font-semibold hover:bg-stone-300 transition-colors"
                    >
                      Dismiss Flag
                    </button>
                    <button
                      onClick={() => handleDismissReport(report.id)}
                      className="flex-1 sm:flex-none px-3.5 py-1.5 rounded-lg bg-rose-600 text-white text-xs font-semibold hover:bg-rose-700 transition-colors flex items-center justify-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Remove Listing
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

