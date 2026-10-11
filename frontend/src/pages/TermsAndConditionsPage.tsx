import React from 'react';
import { Link } from 'react-router-dom';
import { FileCheck, AlertTriangle, ShieldCheck, ShoppingBag, Scale, ArrowLeft, MapPin } from 'lucide-react';

export const TermsAndConditionsPage: React.FC = () => {
  const lastUpdated = 'October 11, 2026';

  return (
    <div className="min-h-screen bg-[#E8E1D5] dark:bg-[#0A0A0A] text-stone-900 dark:text-stone-100 transition-colors py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-stone-600 dark:text-stone-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Marketplace
          </Link>
        </div>

        {/* Header Section */}
        <div className="bg-[#F5EFE6] dark:bg-[#121212] border border-[#CFC4B3] dark:border-stone-800 rounded-2xl p-6 sm:p-10 mb-8 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center border border-amber-200 dark:border-amber-900/40">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500">Legal Agreement</span>
              <h1 className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-white">Terms and Conditions</h1>
            </div>
          </div>
          <p className="text-stone-600 dark:text-stone-400 text-sm sm:text-base leading-relaxed">
            Welcome to Campora. These Terms and Conditions govern access to and use of our platform by students, scholars, and staff at Chaitanya Engineering College and affiliated engineering colleges across Visakhapatnam, Andhra Pradesh. By registering an account or listing items, you agree to comply with these rules.
          </p>
          <div className="mt-4 pt-4 border-t border-[#CFC4B3] dark:border-stone-800 flex flex-wrap items-center justify-between text-xs text-stone-500">
            <span>Last Updated: {lastUpdated}</span>
            <span>Territory: Visakhapatnam, Andhra Pradesh (India)</span>
          </div>
        </div>

        {/* Terms Content */}
        <div className="space-y-6">

          {/* Section 1 */}
          <div className="bg-[#F5EFE6] dark:bg-[#121212] border border-[#CFC4B3] dark:border-stone-800 rounded-2xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <ShieldCheck className="w-5 h-5 text-rose-600" />
              <h2 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-white">1. Eligibility & Student Verification</h2>
            </div>
            <div className="space-y-3 text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              <p>
                Campora is strictly an academic, non-commercial peer community. To register and use the service:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>You must be a currently enrolled student, research candidate, or faculty member at Chaitanya Engineering College, Andhra University College of Engineering, Gayatri Vidya Parishad College of Engineering, ANITS, VIIT, or an authorized engineering institution in the Visakhapatnam region.</li>
                <li>You must supply truthful identity details including your department, year of study, and student registration number. Providing forged student ID cards or misrepresenting student status will lead to immediate permanent ban and notification to college authorities.</li>
                <li>Outside commercial shopkeepers, bulk liquidators, and wholesale brokers are strictly prohibited from creating seller accounts.</li>
              </ul>
            </div>
          </div>

          {/* Section 2 */}
          <div className="bg-[#F5EFE6] dark:bg-[#121212] border border-[#CFC4B3] dark:border-stone-800 rounded-2xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <ShoppingBag className="w-5 h-5 text-rose-600" />
              <h2 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-white">2. Listing Rules & Item Accuracy</h2>
            </div>
            <div className="space-y-3 text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              <p>When creating a listing on Campora:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Real Photos Only:</strong> Listings must contain clear, actual photos of the physical item taken by you. Stock imagery, AI-generated synthetic renderings, and duplicate images from commercial e-commerce websites are disallowed.</li>
                <li><strong>Honest Condition Disclosure:</strong> State genuine working conditions, missing components, battery health (for electronics), and any damage or cosmetic wear honestly in the description.</li>
                <li><strong>Fair Student Pricing:</strong> Prices must be fair, transparent, and in Indian Rupees (₹). Price gouging or speculative resale of mandatory academic course supplies is discouraged.</li>
              </ul>
            </div>
          </div>

          {/* Section 3 */}
          <div className="bg-[#F5EFE6] dark:bg-[#121212] border border-[#CFC4B3] dark:border-stone-800 rounded-2xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <h2 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-white">3. Strictly Prohibited Items</h2>
            </div>
            <div className="space-y-3 text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              <p>The following items are strictly banned from Campora without exception:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-3 bg-[#DDD4C3]/60 dark:bg-stone-900/60 rounded-xl border border-[#CFC4B3] dark:border-stone-800 text-xs">
                  <strong>Academic Malpractice:</strong> Confidential examination papers, solved test leaks, or paid impersonation services.
                </div>
                <div className="p-3 bg-[#DDD4C3]/60 dark:bg-stone-900/60 rounded-xl border border-[#CFC4B3] dark:border-stone-800 text-xs">
                  <strong>Pirated Software:</strong> Cracks, illegal activation keys, or unlicensed engineering CAD/software distributions.
                </div>
                <div className="p-3 bg-[#DDD4C3]/60 dark:bg-stone-900/60 rounded-xl border border-[#CFC4B3] dark:border-stone-800 text-xs">
                  <strong>Dangerous Goods:</strong> Flammable chemicals, illegal substances, alcohol, tobacco, weapons, or hazardous lab reagents.
                </div>
                <div className="p-3 bg-[#DDD4C3]/60 dark:bg-stone-900/60 rounded-xl border border-[#CFC4B3] dark:border-stone-800 text-xs">
                  <strong>Stolen Property:</strong> Any bicycles, laptops, or gadgets without legitimate proof of personal ownership.
                </div>
              </div>
            </div>
          </div>

          {/* Section 4 */}
          <div className="bg-[#F5EFE6] dark:bg-[#121212] border border-[#CFC4B3] dark:border-stone-800 rounded-2xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <MapPin className="w-5 h-5 text-rose-600" />
              <h2 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-white">4. Physical Handover & Safety Protocol</h2>
            </div>
            <div className="space-y-3 text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              <p>
                Campora is a meetup-based campus exchange. For personal safety and satisfaction:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>All handovers should take place on campus during daylight hours at designated public locations (e.g., Central Library, College Canteen, Main Gate, Department quadrangle).</li>
                <li>Buyers are advised to inspect hardware, test laptop chargers, verify textbook editions, and ride bicycles before paying the seller.</li>
                <li>Do not transfer advance payments, token amounts, or booking fees online prior to meeting and inspecting the physical item.</li>
              </ul>
            </div>
          </div>

          {/* Section 5 */}
          <div className="bg-[#F5EFE6] dark:bg-[#121212] border border-[#CFC4B3] dark:border-stone-800 rounded-2xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <FileCheck className="w-5 h-5 text-rose-600" />
              <h2 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-white">5. Platform Role & Disclaimer of Warranties</h2>
            </div>
            <div className="space-y-3 text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              <p>
                Campora acts solely as an introductory venue connecting buyers and sellers within college premises. <strong>Campora is not an auctioneer, retailer, or payment escrow handler.</strong>
              </p>
              <p>
                Contracts of sale are formed exclusively between the student buyer and seller. The platform disclaims any implied warranties of merchantability, fitness for a specific academic purpose, or condition of pre-owned merchandise.
              </p>
            </div>
          </div>

          {/* Section 6 */}
          <div className="bg-[#F5EFE6] dark:bg-[#121212] border border-[#CFC4B3] dark:border-stone-800 rounded-2xl p-6 sm:p-8 shadow-sm">
            <h2 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-white mb-3">6. Dispute Redressal & Jurisdiction</h2>
            <div className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed space-y-2">
              <p>
                Any grievances, fraudulent user reports, or violation of campus ethics may be reported to our peer moderation team. In the event of legal proceedings, disputes shall fall under the exclusive jurisdiction of the competent courts in Visakhapatnam, Andhra Pradesh, India.
              </p>
              <p className="text-xs text-stone-500 pt-2 border-t border-[#CFC4B3] dark:border-stone-800">
                For inquiries or disciplinary reports: <strong>terms@campora.in</strong> (Campus Security & Moderation Wing, Chaitanya Engineering College, Visakhapatnam).
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
