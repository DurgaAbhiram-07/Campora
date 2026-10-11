import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Who can register and trade on Campora?',
      a: 'Campora is exclusively designed for currently enrolled students, research scholars, and faculty members of verified engineering colleges across Visakhapatnam, including Chaitanya Engineering College, AUCE, GVPCE, ANITS, and VIIT. You must register using your student credentials.',
    },
    {
      q: 'How does the Student & Faculty ID verification process work?',
      a: 'During signup, you provide your college roll number and department. Campus student moderators review and verify your details to maintain a safe, trusted community of genuine engineering peers.',
    },
    {
      q: 'Are there any hidden fees or listing charges?',
      a: 'Zero! Campora is 100% free for campus peers. We do not charge listing fees, transaction cuts, or messaging fees.',
    },
    {
      q: 'Where do buyers and sellers meet for item handovers?',
      a: 'Because transactions happen locally on campus, handovers occur at public spots such as the Central Library lawns, college canteens, department quadrangles, or main campus gates during daytime hours.',
    },
    {
      q: 'How do payments work between students?',
      a: 'All transactions are direct peer-to-peer. Buyers inspect items in person on campus and pay the seller directly via UPI (PhonePe, Google Pay, Paytm) or cash. Campora never charges middleman fees.',
    },
  ];

  return (
    <section id="faq" className="py-10 sm:py-14 bg-[#DFD7CB] dark:bg-[#0A0A0A] transition-colors border-t border-[#CFC4B3] dark:border-stone-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-8 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#DDD4C3] dark:bg-stone-800/80 border border-[#C5BBAA] dark:border-stone-700 text-xs font-bold text-stone-900 dark:text-stone-300">
            <HelpCircle className="w-4 h-4 text-rose-600" />
            <span>Campus Questions & Answers</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="glass-card rounded-2xl border border-[#CFC4B3] dark:border-stone-800 overflow-hidden transition-colors"
            >
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full p-5 text-left font-bold text-sm sm:text-base text-stone-900 dark:text-white flex items-center justify-between gap-4"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-stone-500 transition-transform duration-300 shrink-0 ${openIdx === idx ? 'rotate-180 text-rose-500' : ''}`} />
              </button>

              {openIdx === idx && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed border-t border-[#CFC4B3] dark:border-stone-800/80 pt-4 animate-in fade-in">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
