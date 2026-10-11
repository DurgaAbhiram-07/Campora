import React from 'react';
import { ShieldCheck, MapPin, UserCheck, Eye, AlertTriangle } from 'lucide-react';

export const SafetySection: React.FC = () => {
  return (
    <section id="safety" className="py-10 sm:py-14 bg-[#DFD7CB] dark:bg-black text-stone-900 dark:text-white relative overflow-hidden transition-colors border-t border-[#CFC4B3] dark:border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-semibold border border-emerald-500/30">
              <ShieldCheck className="w-4 h-4" />
              <span>Campus Safety Protocol</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black leading-tight text-stone-900 dark:text-white">
              100% Safe Campus Environment
            </h2>
            <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
              Unlike public classifieds filled with commercial spammers, Campora is exclusively restricted to verified students and faculty of engineering colleges in Visakhapatnam.
            </p>

            <div className="p-4 rounded-2xl glass-card border border-[#CFC4B3] dark:border-stone-800 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <p className="text-xs text-stone-800 dark:text-stone-300">
                <strong>Pro Tip:</strong> Always meet during daylight hours at well-lit campus spots like the Central Library, Student Activity Center (SAC), or Main Canteen.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl glass-card border border-[#CFC4B3] dark:border-stone-800 space-y-3">
              <UserCheck className="w-8 h-8 text-rose-500" />
              <h3 className="font-bold text-base text-stone-900 dark:text-white">College ID Verified</h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">Every account is manually audited against student rolls & university emails before selling access is granted.</p>
            </div>

            <div className="p-6 rounded-3xl glass-card border border-[#CFC4B3] dark:border-stone-800 space-y-3">
              <MapPin className="w-8 h-8 text-amber-500" />
              <h3 className="font-bold text-base text-stone-900 dark:text-white">On-Campus Handshake</h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">No shipping delays or postal risks. Simply walk across campus or department blocks to test and collect your item.</p>
            </div>

            <div className="p-6 rounded-3xl glass-card border border-[#CFC4B3] dark:border-stone-800 space-y-3">
              <Eye className="w-8 h-8 text-rose-400" />
              <h3 className="font-bold text-base text-stone-900 dark:text-white">In-Person Inspection</h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">Inspect laptops, books, or bikes in hand before making payment via UPI or cash.</p>
            </div>

            <div className="p-6 rounded-3xl glass-card border border-[#CFC4B3] dark:border-stone-800 space-y-3">
              <ShieldCheck className="w-8 h-8 text-emerald-500" />
              <h3 className="font-bold text-base text-stone-900 dark:text-white">Zero Commission</h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">Keep 100% of your earnings. No listing fees, transaction charges, or middleman fees.</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
