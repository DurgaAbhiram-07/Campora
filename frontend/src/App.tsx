import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext';
import { ProductProvider } from './context/ProductContext';
import { ChatProvider } from './context/ChatContext';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProtectedRoute } from './components/ProtectedRoute';

import { LandingPage } from './pages/LandingPage';
import { MarketplacePage } from './pages/MarketplacePage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { SellPage } from './pages/SellPage';
import { DashboardPage } from './pages/DashboardPage';
import { AdminPage } from './pages/AdminPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { MessagesPage } from './pages/MessagesPage';
import { HowItWorksPage } from './pages/HowItWorksPage';

import { PublicProfilePage } from './pages/PublicProfilePage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsAndConditionsPage } from './pages/TermsAndConditionsPage';

import { CampusProvider } from './context/CampusContext';
import { PeoplePage } from './pages/PeoplePage';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CampusProvider>
          <WishlistProvider>
            <ProductProvider>
              <ChatProvider>
                <Router>
                  <ScrollToTop />
                  <div className="flex flex-col min-h-screen">
                    <Navbar />
                    <div className="flex-1">
                      <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/marketplace" element={<MarketplacePage />} />
                        <Route path="/people" element={<PeoplePage />} />
                        <Route path="/how-it-works" element={<HowItWorksPage />} />
                        <Route path="/messages" element={<ProtectedRoute><MessagesPage /></ProtectedRoute>} />
                        <Route path="/products/:id" element={<ProductDetailsPage />} />
                        <Route path="/profile/:id" element={<PublicProfilePage />} />
                        <Route path="/sell" element={<ProtectedRoute><SellPage /></ProtectedRoute>} />
                        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
                        <Route path="/wishlist" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
                        <Route path="/my-listings" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
                        <Route path="/admin" element={<ProtectedRoute requiredRole="ADMIN"><AdminPage /></ProtectedRoute>} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/signup" element={<SignupPage />} />
                        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                        <Route path="/privacy" element={<PrivacyPolicyPage />} />
                        <Route path="/terms" element={<TermsAndConditionsPage />} />
                      </Routes>
                    </div>
                    <Footer />
                  </div>
                  <Toaster position="bottom-right" reverseOrder={false} />
                </Router>
              </ChatProvider>
            </ProductProvider>
          </WishlistProvider>
        </CampusProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
