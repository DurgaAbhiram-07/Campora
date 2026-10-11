import React from 'react';
import { 
  X, 
  ShieldCheck, 
  ShoppingBag, 
  Repeat, 
  MessageSquare, 
  CheckCircle2, 
  Sparkles,
  MapPin
} from 'lucide-react';

interface HowItWorksModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HowItWorksModal: React.FC<HowItWorksModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      
      {/* Backdrop listener */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Content */}
      <div className="relative bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl border border-stone-200 dark:border-stone-800 space-y-6 z-10 my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200 dark:border-stone-800">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-stone-900 dark:text-white">How Campora Works</h2>
              <p className="text-xs text-stone-500">The trusted campus marketplace built exclusively for verified students</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 4 Step Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          
          <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-black flex items-center justify-center text-sm shadow-sm">
              1
            </div>
            <h3 className="font-bold text-sm text-stone-900 dark:text-white">Verified Campus Sign In</h3>
            <p className="text-stone-600 dark:text-stone-300 leading-relaxed">
              Sign in with your Google account or College ID. Only verified students from your university network can buy and sell.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-stone-800 text-white font-black flex items-center justify-center text-sm shadow-sm">
              2
            </div>
            <h3 className="font-bold text-sm text-stone-900 dark:text-white">Buy, Rent, or Exchange</h3>
            <p className="text-stone-600 dark:text-stone-300 leading-relaxed">
              Browse textbooks, lab gear, cycles, and electronics. Choose to purchase, rent per day (₹80/day), or trade with peers.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500 text-stone-950 font-black flex items-center justify-center text-sm shadow-sm">
              3
            </div>
            <h3 className="font-bold text-sm text-stone-900 dark:text-white">Real-time Direct Chat</h3>
            <p className="text-stone-600 dark:text-stone-300 leading-relaxed">
              Chat instantly with sellers via our built-in real-time socket chat without sharing personal phone numbers.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-rose-600 text-white font-black flex items-center justify-center text-sm shadow-sm">
              4
            </div>
            <h3 className="font-bold text-sm text-stone-900 dark:text-white">Public Campus Meetups</h3>
            <p className="text-stone-600 dark:text-stone-300 leading-relaxed">
              Meet at safe campus spots (Central Library, Hostel Block, Canteen) to inspect items and hand over securely.
            </p>
          </div>

        </div>

        {/* Safety Banner */}
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
          <div className="text-xs">
            <h4 className="font-bold text-emerald-700 dark:text-emerald-300">100% Student Verified Platform</h4>
            <p className="text-stone-600 dark:text-stone-300 mt-0.5">
              Every listing shows verified college credentials and public profile trust badges to ensure total peace of mind.
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-stone-900 dark:bg-white text-white dark:text-stone-900 font-bold text-xs shadow-md transition-all hover:opacity-90"
        >
          Got it, let's explore!
        </button>

      </div>
    </div>
  );
};
