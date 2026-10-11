import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, Upload, MessageSquare, Handshake, CheckCircle2, 
  MapPin, AlertTriangle, ArrowRight, BookOpen, Sparkles, Building2, HelpCircle
} from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Verify Your College Identity',
      desc: 'Sign up with your university email or upload your student ID card. Verification ensures 100% of buyers and sellers are genuine students and faculty from Vizag engineering colleges.',
      badge: 'Student Verification',
      icon: <ShieldCheck className="w-8 h-8 text-rose-600 dark:text-rose-400" />
    },
    {
      num: '02',
      title: 'Post Items with Zero Commission',
      desc: 'Snap photos of your used engineering textbooks, mini drafters, scientific calculators, bicycles, or hostel electronics. Set student-friendly prices and define your handover gate.',
      badge: '0% Brokerage',
      icon: <Upload className="w-8 h-8 text-amber-500" />
    },
    {
      num: '03',
      title: 'Direct Campus Chat',
      desc: 'Negotiate prices and arrange meetup times in real-time without disclosing private phone numbers. Chat safely on our peer messaging platform built specifically for campus trade.',
      badge: 'Real-time Chat',
      icon: <MessageSquare className="w-8 h-8 text-sky-500" />
    },
    {
      num: '04',
      title: 'Safe Campus Handover',
      desc: 'Meet your peer at verified campus points—central library, campus canteen, or main security gate. Inspect the physical item thoroughly before completing payment via UPI or cash.',
      badge: 'Direct Handover',
      icon: <Handshake className="w-8 h-8 text-emerald-500" />
    }
  ];

  const safetyGuidelines = [
    {
      title: 'Meet in Public Campus Spaces',
      desc: 'Always arrange handovers during daylight campus hours at prominent locations such as the Central Library, Department lawns, or College Main Gate.'
    },
    {
      title: 'Inspect Before Payment',
      desc: 'Physically check textbook edition, calculator functionality, drafter scales, and cycle gears prior to making any UPI payment or handing cash.'
    },
    {
      title: 'Verify Roll Numbers',
      desc: 'Check the other student\'s department and verified roll badge on Campora. When in doubt, ask for their college ID card during handover.'
    },
    {
      title: 'Zero Pre-Payments for Unknowns',
      desc: 'Never transfer advance deposits or courier booking fees. All Campora transactions are designed for face-to-face peer exchanges.'
    }
  ];

  const faqs = [
    {
      q: 'Is Campora completely free to use?',
      a: 'Yes! Campora charges zero brokerage, zero listing fees, and zero commissions. You keep 100% of the proceeds from your second-hand gear.'
    },
    {
      q: 'Which colleges are currently supported in Visakhapatnam?',
      a: 'The hub is anchored at Chaitanya Engineering College (Kommadi), and supports students from AU College of Engineering (AUCE), GVPCE, ANITS, Raghu Engineering College (REC), VIIT, and GITAM.'
    },
    {
      q: 'What items can I sell on Campora?',
      a: 'Textbooks (B.S. Grewal, Higher Engineering Math, etc.), Mini Drafters & instruments, Casio FX-991 scientific calculators, bicycles, lab coats & kits, hostel essentials, and laptops.'
    },
    {
      q: 'How does messaging work?',
      a: 'Campora features a built-in real-time socket chat on the /messages page. You can message buyers, make offers, and agree on handover locations directly without sharing personal phone numbers.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#E8E1D5] dark:bg-black text-stone-900 dark:text-stone-100 transition-colors py-10 sm:py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Page Hero */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-rose-100 dark:bg-rose-950/50 border border-rose-300 dark:border-rose-800 text-xs sm:text-sm font-bold text-rose-800 dark:text-rose-300">
            <Building2 className="w-4 h-4 text-rose-600 dark:text-rose-400" />
            <span>Vizag Campus Marketplace Guide</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-stone-900 dark:text-white leading-tight">
            How Campora Works
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-stone-700 dark:text-stone-300 font-medium leading-relaxed">
            The trustworthy, zero-commission exchange network built exclusively for engineering students across Visakhapatnam campuses. Buy, sell, and hand over in 4 simple steps.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              to="/marketplace"
              className="px-6 py-2.5 sm:py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-md shadow-rose-600/25 transition-all"
            >
              Explore Marketplace
            </Link>
            <Link
              to="/sell"
              className="px-6 py-2.5 sm:py-3 rounded-xl bg-[#DDD4C3] dark:bg-stone-800 hover:bg-[#D4CABA] dark:hover:bg-stone-700 text-stone-900 dark:text-stone-200 border border-[#C5BBAA] dark:border-stone-700 font-bold text-sm transition-colors"
            >
              Post an Item
            </Link>
          </div>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div
              key={step.num}
              className="glass-card rounded-2xl p-6 border border-[#CFC4B3] dark:border-stone-800 flex flex-col justify-between space-y-6 shadow-sm hover:border-rose-500/40 transition-colors"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-xl bg-[#DDD4C3] dark:bg-stone-800 flex items-center justify-center">
                    {step.icon}
                  </div>
                  <span className="text-3xl font-black text-stone-300 dark:text-stone-700">{step.num}</span>
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                  {step.badge}
                </span>
                <h3 className="font-bold text-lg text-stone-900 dark:text-white leading-snug">
                  {step.title}
                </h3>
                <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Safety & Handover Guidelines */}
        <div className="p-8 rounded-3xl bg-[#F5EFE6] dark:bg-stone-900 border border-[#CFC4B3] dark:border-stone-800 space-y-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-stone-900 dark:text-white">Campus Safety & Handover Rules</h2>
              <p className="text-xs text-stone-500">Keep transactions 100% risk-free by following verified protocols</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {safetyGuidelines.map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-[#DDD4C3]/40 dark:bg-stone-800/60 border border-[#C5BBAA] dark:border-stone-700/60 space-y-1.5">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <h4 className="font-bold text-sm text-stone-900 dark:text-white">{item.title}</h4>
                </div>
                <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed pl-6">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Frequently Asked Questions */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-rose-600 dark:text-rose-400">Answers</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="p-5 rounded-2xl glass-card border border-stone-200 dark:border-stone-800 space-y-2">
                <h4 className="font-bold text-sm text-stone-900 dark:text-white flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-rose-500 shrink-0" />
                  <span>{faq.q}</span>
                </h4>
                <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed pl-6">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Box */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 dark:from-stone-900 dark:to-stone-950 text-white border border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-black">Ready to trade with your campus peers?</h3>
            <p className="text-xs sm:text-sm text-stone-300 max-w-lg">
              Join students across Chaitanya Engineering College and Vizag campuses exchanging books and gear today.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/signup"
              className="px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm shadow-md transition-colors"
            >
              Sign Up Now
            </Link>
            <Link
              to="/messages"
              className="px-6 py-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-bold text-xs sm:text-sm border border-stone-700 transition-colors"
            >
              Open Messages
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
