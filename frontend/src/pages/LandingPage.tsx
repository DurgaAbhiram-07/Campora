import React from 'react';
import { Hero } from '../components/Hero';
import { CategoriesSection } from '../components/CategoriesSection';
import { HowItWorks } from '../components/HowItWorks';
import { FeaturedProducts } from '../components/FeaturedProducts';
import { SafetySection } from '../components/SafetySection';
import { AppDownload } from '../components/AppDownload';
import { FAQSection } from '../components/FAQSection';

import { CampusRequestsSection } from '../components/CampusRequestsSection';

export const LandingPage: React.FC = () => {
  return (
    <main className="min-h-screen pb-12">
      <Hero />
      <div className="space-y-6 sm:space-y-8">
        <CategoriesSection />
        <FeaturedProducts />
        
        {/* Campus ISO / Wanted Requests Board */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CampusRequestsSection />
        </div>

        <HowItWorks />
        <SafetySection />
        <AppDownload />
        <FAQSection />
      </div>
    </main>
  );
};
