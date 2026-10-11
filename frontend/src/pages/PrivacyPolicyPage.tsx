import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Lock, Eye, FileText, UserCheck, Bell, Mail, ArrowLeft } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
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

        {/* Header Header */}
        <div className="bg-[#F5EFE6] dark:bg-[#121212] border border-[#CFC4B3] dark:border-stone-800 rounded-2xl p-6 sm:p-10 mb-8 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 flex items-center justify-center border border-rose-200 dark:border-rose-900/40">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500">Legal & Governance</span>
              <h1 className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-white">Privacy Policy</h1>
            </div>
          </div>
          <p className="text-stone-600 dark:text-stone-400 text-sm sm:text-base leading-relaxed">
            Campora is a student-to-student classifieds and marketplace community built specifically for verified engineering colleges across Visakhapatnam, Andhra Pradesh, with primary operations hosted at Chaitanya Engineering College. We take your privacy seriously and handle your academic identity data with absolute responsibility.
          </p>
          <div className="mt-4 pt-4 border-t border-[#CFC4B3] dark:border-stone-800 flex flex-wrap items-center justify-between text-xs text-stone-500">
            <span>Effective Date: {lastUpdated}</span>
            <span>Applicable Law: Digital Personal Data Protection Act (DPDP), Information Technology Act, 2000 (India)</span>
          </div>
        </div>

        {/* Policy Body */}
        <div className="space-y-6">

          {/* Section 1 */}
          <div className="bg-[#F5EFE6] dark:bg-[#121212] border border-[#CFC4B3] dark:border-stone-800 rounded-2xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <UserCheck className="w-5 h-5 text-rose-600" />
              <h2 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-white">1. Information We Collect</h2>
            </div>
            <div className="space-y-3 text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              <p>
                To maintain a safe and closed peer environment exclusively for college students and faculty, we collect only the necessary verification details:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong className="text-stone-800 dark:text-stone-200">Account Credentials:</strong> Full name, college email address, contact phone number (optional for WhatsApp handover), and encrypted authentication tokens.
                </li>
                <li>
                  <strong className="text-stone-800 dark:text-stone-200">Campus Identity:</strong> Selected college (e.g., Chaitanya Engineering College, AUCE, GVPCE), engineering department/branch, roll number, student year, and campus ID card photo submitted for manual verification.
                </li>
                <li>
                  <strong className="text-stone-800 dark:text-stone-200">Listings and Content:</strong> Photographs of physical items you sell, rent, or exchange (academic textbooks, calculators, engineering drafters, lab equipment, bicycles), item condition reports, price details, and campus handover spots.
                </li>
                <li>
                  <strong className="text-stone-800 dark:text-stone-200">In-App Chat Messages:</strong> Real-time messages exchanged between buyers and sellers regarding product questions, price negotiation, and campus meeting points.
                </li>
              </ul>
            </div>
          </div>

          {/* Section 2 */}
          <div className="bg-[#F5EFE6] dark:bg-[#121212] border border-[#CFC4B3] dark:border-stone-800 rounded-2xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <Eye className="w-5 h-5 text-rose-600" />
              <h2 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-white">2. How We Use Your Information</h2>
            </div>
            <div className="space-y-3 text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              <p>We use your information strictly to provide and protect the campus marketplace:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Validating that sellers and buyers are legitimate students or faculty at recognized engineering colleges in Visakhapatnam.</li>
                <li>Displaying department and college affiliations on public listings so buyers can verify who they are meeting on campus.</li>
                <li>Routing in-app notifications and chat messages when another student inquires about your listing.</li>
                <li>Preventing spam, non-student commercial vendors, fraudulent listings, and unauthorized access.</li>
                <li>We do not sell, rent, or trade your personal data to third-party ad networks, telemarketers, or commercial brokers.</li>
              </ul>
            </div>
          </div>

          {/* Section 3 */}
          <div className="bg-[#F5EFE6] dark:bg-[#121212] border border-[#CFC4B3] dark:border-stone-800 rounded-2xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <Lock className="w-5 h-5 text-rose-600" />
              <h2 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-white">3. Direct Peer-to-Peer Transactions & Payments</h2>
            </div>
            <div className="space-y-3 text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              <p>
                Campora is a zero-commission listing platform. <strong>We do not collect, process, or store credit card numbers, debit card PINs, or bank account credentials.</strong>
              </p>
              <p>
                All payments take place directly between students via UPI (PhonePe, Google Pay, Paytm) or cash during the physical handover on campus. Never send advance payments to unverified parties outside campus premises.
              </p>
            </div>
          </div>

          {/* Section 4 */}
          <div className="bg-[#F5EFE6] dark:bg-[#121212] border border-[#CFC4B3] dark:border-stone-800 rounded-2xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <FileText className="w-5 h-5 text-rose-600" />
              <h2 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-white">4. Data Retention & Account Deletion</h2>
            </div>
            <div className="space-y-3 text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              <p>
                Your profile information and listing history remain active as long as you are an enrolled student or choose to maintain your account.
              </p>
              <p>
                You may request immediate account deletion at any time by contacting our campus administration desk. Once requested, your active listings, direct messages, and submitted verification documents are permanently purged within 7 business days, except where retention is mandated by law.
              </p>
            </div>
          </div>

          {/* Section 5 */}
          <div className="bg-[#F5EFE6] dark:bg-[#121212] border border-[#CFC4B3] dark:border-stone-800 rounded-2xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <Mail className="w-5 h-5 text-rose-600" />
              <h2 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-white">5. Campus Grievance Officer & Contact</h2>
            </div>
            <div className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed space-y-2">
              <p>
                If you have privacy inquiries, data modification requests, or report concerns regarding user verification, please contact our Campus Data Administrator:
              </p>
              <div className="bg-[#DDD4C3]/60 dark:bg-stone-900/60 p-4 rounded-xl border border-[#CFC4B3] dark:border-stone-800 font-mono text-xs space-y-1">
                <p><strong>Campus Administrative Lead:</strong> Grievance Officer, Campora Student Platform</p>
                <p><strong>Campus Base:</strong> Chaitanya Engineering College, Kommadi, Madhurawada, Visakhapatnam, Andhra Pradesh 530048</p>
                <p><strong>Email:</strong> privacy@campora.in / admin@cec.ac.in</p>
                <p><strong>Response SLA:</strong> Within 48 business hours</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
