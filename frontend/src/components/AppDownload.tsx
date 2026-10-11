import React, { useState } from 'react';
import { Smartphone, Download, QrCode, CheckCircle, X, Copy, ExternalLink, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

export const AppDownload: React.FC = () => {
  const [showQRModal, setShowQRModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const campusUrl = typeof window !== 'undefined' ? window.location.origin : 'https://campora.campus.edu';
  const qrCodeImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(campusUrl)}&color=000000&bgcolor=ffffff&margin=1`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(campusUrl);
    setCopied(true);
    toast.success('Campus URL copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInstallPWA = () => {
    toast.success('PWA App ready! Tap "Add to Home Screen" in your browser menu.', {
      duration: 4000,
    });
  };

  return (
    <section className="py-10 sm:py-14 bg-[#E8E1D5] dark:bg-[#0A0A0A] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-[#F5EFE6] dark:bg-stone-900 rounded-xl p-6 sm:p-10 border border-[#CFC4B3] dark:border-stone-800 shadow-sm relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-rose-600 dark:text-rose-400">Mobile PWA Ready</span>
              <h2 className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-white">
                Take Campora Everywhere On Your Phone
              </h2>
              <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed max-w-xl">
                Install our Progressive Web App (PWA) directly to your iOS or Android home screen for instant push notifications on chat messages, price drops, and wishlist updates.
              </p>

              <div className="space-y-2 text-xs font-semibold text-stone-700 dark:text-stone-300">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>Instant push notifications for new offers</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>Offline mode to browse saved wishlist items</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>Camera integration for quick item photo uploads</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <button 
                  onClick={handleInstallPWA}
                  className="px-6 py-3 rounded-xl bg-stone-900 text-white dark:bg-white dark:text-stone-900 font-bold text-xs flex items-center gap-2 shadow-md hover:opacity-90 transition-opacity"
                >
                  <Download className="w-4 h-4" />
                  <span>Install PWA Web App</span>
                </button>

                <button 
                  onClick={() => setShowQRModal(true)}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white dark:bg-stone-800 text-xs font-bold text-stone-900 dark:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors border border-stone-300/80 dark:border-stone-700"
                >
                  <QrCode className="w-4 h-4 text-rose-500" />
                  <span>Scan QR Code on Campus</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="w-64 h-[420px] rounded-3xl bg-stone-900 border-4 border-stone-800 p-3 shadow-2xl relative flex flex-col justify-between overflow-hidden">
                <div className="w-24 h-4 bg-stone-800 rounded-full mx-auto mb-2" />
                <div className="flex-1 bg-stone-800/80 rounded-2xl p-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="w-full h-24 rounded-xl bg-rose-600/30 flex items-center justify-center text-white font-bold text-xs">
                      Campora Mobile
                    </div>
                    <div className="w-3/4 h-3 bg-stone-700 rounded-full" />
                    <div className="w-1/2 h-3 bg-stone-700 rounded-full" />
                  </div>
                  <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 text-[10px] font-bold text-center">
                    Seller replied: "Available at Campus Library!"
                  </div>
                </div>
              </div>
            </div>

          </div> 

        </div>

      </div>

      {/* Interactive Campus QR Code Modal */}
      {showQRModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-md glass-modal rounded-3xl p-6 sm:p-8 shadow-2xl border border-stone-200 dark:border-stone-800 text-center space-y-6">
            
            <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-4">
              <div className="flex items-center gap-2 text-left">
                <div className="p-2 rounded-xl bg-rose-500/10 text-rose-500">
                  <QrCode className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-stone-900 dark:text-white">Campus App QR Code</h3>
                  <p className="text-xs text-stone-500">Scan to open Campora on your mobile device</p>
                </div>
              </div>
              <button 
                onClick={() => setShowQRModal(false)}
                className="p-1.5 rounded-xl hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors"
              >
                <X className="w-5 h-5 text-stone-500" />
              </button>
            </div>

            {/* Real Scannable Campus QR Code */}
            <div className="p-6 rounded-2xl bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800 inline-block shadow-inner">
              <div className="w-56 h-56 mx-auto bg-white p-3 rounded-2xl shadow-md border border-stone-100 dark:border-stone-800 flex items-center justify-center relative overflow-hidden">
                <img
                  src={qrCodeImageUrl}
                  alt="Scannable Campus App QR Code"
                  className="w-full h-full object-contain rounded-xl"
                />
              </div>

              <div className="mt-4 flex items-center justify-center gap-1.5 text-xs font-bold text-rose-600 dark:text-rose-400">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Scan with Camera to Open App</span>
              </div>
            </div>

            {/* Link Copy Box */}
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-2xl bg-stone-100 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 text-xs">
                <span className="font-mono text-stone-600 dark:text-stone-300 truncate mr-2">{campusUrl}</span>
                <button
                  onClick={handleCopyLink}
                  className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold flex items-center gap-1 shrink-0 transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copied ? 'Copied!' : 'Copy Link'}</span>
                </button>
              </div>

              <button
                onClick={() => setShowQRModal(false)}
                className="w-full py-3 rounded-2xl bg-stone-900 text-white dark:bg-white dark:text-stone-900 font-bold text-xs hover:opacity-90 transition-opacity"
              >
                Close QR Code
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
