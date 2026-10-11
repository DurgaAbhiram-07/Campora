import React from 'react';
import { ShieldCheck, Upload, MessageSquare, Handshake } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Verify College ID',
      desc: 'Sign up with your university email or ID card. Instant verification keeps the network 100% campus exclusive.',
      icon: <ShieldCheck className="w-7 h-7 text-blue-500" />,
    },
    {
      num: '02',
      title: 'Post Listing in 60s',
      desc: 'Upload clear photos, set student-friendly pricing, specify item condition, and choose your preferred campus pickup location.',
      icon: <Upload className="w-7 h-7 text-rose-500" />,
    },
    {
      num: '03',
      title: 'Chat & Negotiate',
      desc: 'Direct real-time messaging with campus peers. Agree on prices, check item conditions, and set handover points.',
      icon: <MessageSquare className="w-7 h-7 text-cyan-500" />,
    },
    {
      num: '04',
      title: 'Safe Campus Handover',
      desc: 'Meet at library lawns, department blocks, or campus canteens. Inspect items in-person and pay via UPI or cash.',
      icon: <Handshake className="w-7 h-7 text-emerald-500" />,
    },
  ];

  return (
    <section className="py-10 sm:py-14 bg-[#E8E1D5] dark:bg-[#0A0A0A] transition-colors border-y border-[#CFC4B3] dark:border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-rose-600 dark:text-rose-400">Simple & Secure</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white">
            How Campora Works For You
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            No shipping fees, no stranger danger, zero commission. Trade directly with peers you see every day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, idx) => (
            <div key={step.num} className="relative glass-card rounded-3xl p-6 border border-[#CFC4B3] dark:border-stone-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#DDD4C3] dark:bg-stone-800 flex items-center justify-center">
                    {step.icon}
                  </div>
                  <span className="text-3xl font-black text-stone-300 dark:text-stone-700">{step.num}</span>
                </div>
                <h3 className="font-bold text-lg text-stone-900 dark:text-white mb-2">{step.title}</h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
