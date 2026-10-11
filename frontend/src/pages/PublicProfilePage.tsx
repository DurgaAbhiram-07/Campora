import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  CheckCircle2, 
  MapPin, 
  GraduationCap, 
  Building2, 
  MessageSquare, 
  ShieldCheck, 
  Calendar, 
  Star, 
  Package, 
  ArrowLeft,
  Share2,
  Mail,
  Phone
} from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { useChat } from '../context/ChatContext';
import { ProductCard } from '../components/ProductCard';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export const PublicProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products } = useProducts();
  const { startOrGetChat } = useChat();
  const { user: currentUser } = useAuth();

  // Find user listings
  const userListings = useMemo(() => {
    if (!id) return [];
    return products.filter(p => p.sellerId === id);
  }, [id, products]);

  // Retrieve user metadata (from listings or registered users cache)
  const profileUser = useMemo(() => {
    if (!id) return null;

    if (currentUser && (currentUser.id === id || id === 'me')) {
      return currentUser;
    }

    // Try finding in products
    const sampleProduct = products.find(p => p.sellerId === id);
    if (sampleProduct) {
      return {
        id: sampleProduct.sellerId,
        name: sampleProduct.sellerName,
        collegeId: '2023CS4401',
        email: `${sampleProduct.sellerName.toLowerCase().replace(/\s+/g, '.')}@campora.edu`,
        department: 'Computer Science & Eng.',
        year: '3rd Year',
        hosteller: true,
        verified: sampleProduct.sellerVerified ?? true,
        profilePhoto: sampleProduct.sellerAvatar,
        role: 'STUDENT' as const,
        createdAt: '2024-08-15T00:00:00.000Z',
        collegeName: sampleProduct.sellerCollege || 'Chaitanya Engineering College',
      };
    }

    // Check registered user cache
    try {
      const saved = localStorage.getItem('campora_registered_users');
      if (saved) {
        const list = JSON.parse(saved);
        const match = list.find((u: any) => u.id === id);
        if (match) return match;
      }
    } catch (e) {}

    // Fallback default student profile
    return {
      id: id,
      name: 'Campus Student',
      collegeId: '2024EX991',
      email: 'student@campora.edu',
      department: 'Electrical Engineering',
      year: '2nd Year',
      hosteller: true,
      verified: true,
      profilePhoto: undefined,
      role: 'STUDENT' as const,
      createdAt: '2024-09-01T00:00:00.000Z',
      collegeName: 'Chaitanya Engineering College',
    };
  }, [id, products, currentUser]);

  if (!profileUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#E8E1D5] dark:bg-black">
        <p className="text-stone-500">Student profile not found.</p>
      </div>
    );
  }

  const isSelf = currentUser?.id === profileUser.id;

  const handleShareProfile = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Profile link copied to clipboard!');
  };

  const handleStartChatWithUser = () => {
    if (userListings.length > 0) {
      const chatId = startOrGetChat(userListings[0]);
      navigate(`/messages?chatId=${chatId}`);
    } else {
      navigate('/messages');
    }
  };

  return (
    <div className="min-h-screen py-10 bg-[#E8E1D5] dark:bg-black text-stone-900 dark:text-stone-100 transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-xs font-semibold text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Marketplace
        </button>

        {/* Profile Card Header */}
        <div className="bg-[#F5EFE6] dark:bg-stone-900 rounded-3xl p-6 sm:p-8 border border-[#CFC4B3] dark:border-stone-800 shadow-sm relative overflow-hidden mb-8">
          
          {/* Background Accent */}
          <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-r from-stone-800 via-stone-700 to-stone-900 opacity-90" />

          <div className="relative pt-12 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
            
            {/* Avatar & Key Info */}
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5">
              <div className="relative">
                {profileUser.profilePhoto ? (
                  <img
                    src={profileUser.profilePhoto}
                    alt={profileUser.name}
                    className="w-28 h-28 rounded-3xl object-cover ring-4 ring-white dark:ring-stone-900 shadow-md"
                  />
                ) : (
                  <div className="w-28 h-28 rounded-3xl bg-emerald-600 text-white font-black text-3xl flex items-center justify-center ring-4 ring-white dark:ring-stone-900 shadow-md">
                    {profileUser.name.charAt(0).toUpperCase()}
                  </div>
                )}
                {profileUser.verified && (
                  <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1.5 rounded-full ring-2 ring-white dark:ring-stone-900" title="Verified Campus Student">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                )}
              </div>

              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <h1 className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-white">
                    {profileUser.name}
                  </h1>
                  {profileUser.verified && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      <ShieldCheck className="w-3 h-3" /> Verified Student
                    </span>
                  )}
                </div>

                <p className="text-sm font-medium text-stone-500 dark:text-stone-400 mt-1 flex items-center justify-center sm:justify-start gap-3">
                  <span className="flex items-center gap-1">
                    <GraduationCap className="w-4 h-4 text-emerald-500" /> {profileUser.department}
                  </span>
                  <span>•</span>
                  <span>{profileUser.year}</span>
                </p>

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-stone-500 dark:text-stone-400 mt-2">
                  <span className="flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5 text-stone-400" /> {profileUser.collegeName}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-stone-400" /> {profileUser.hosteller ? 'Campus Hostel Resident' : 'Day Scholar'}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              {!isSelf && (
                <button
                  onClick={handleStartChatWithUser}
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl shadow-sm transition-all active:scale-[0.98]"
                >
                  <MessageSquare className="w-4 h-4" /> Message Student
                </button>
              )}
              
              <button
                onClick={handleShareProfile}
                className="p-2.5 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 rounded-xl transition-colors"
                title="Share Profile"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Quick Stats Banner */}
          <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-stone-100 dark:border-stone-800/80 text-center">
            <div>
              <p className="text-xl sm:text-2xl font-black text-stone-900 dark:text-white">
                {userListings.length}
              </p>
              <p className="text-xs text-stone-500 font-medium mt-0.5">Active Listings</p>
            </div>
            <div>
              <p className="text-sm sm:text-base font-black text-stone-900 dark:text-white truncate">
                {profileUser.department || 'Engineering'}
              </p>
              <p className="text-xs text-stone-500 font-medium mt-0.5">Department</p>
            </div>
            <div>
              <p className="text-sm sm:text-base font-black text-emerald-600 dark:text-emerald-400">
                {profileUser.verified ? 'Verified' : 'Member'}
              </p>
              <p className="text-xs text-stone-500 font-medium mt-0.5">Campus Status</p>
            </div>
          </div>

        </div>

        {/* Listings Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-black text-stone-900 dark:text-white flex items-center gap-2">
              <Package className="w-5 h-5 text-emerald-500" />
              Listings by {profileUser.name.split(' ')[0]} ({userListings.length})
            </h2>
          </div>

          {userListings.length === 0 ? (
            <div className="bg-[#F5EFE6] dark:bg-stone-900 rounded-3xl p-12 text-center border border-[#CFC4B3] dark:border-stone-800">
              <Package className="w-12 h-12 text-stone-300 dark:text-stone-700 mx-auto mb-3" />
              <h3 className="text-base font-bold text-stone-700 dark:text-stone-300">No active listings</h3>
              <p className="text-xs text-stone-500 mt-1">This student currently has no active items for sale.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {userListings.map(prod => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
