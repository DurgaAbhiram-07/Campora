import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from './AuthContext';
import { supabaseService } from '../services/supabaseService';
import { api } from '../services/api';

interface WishlistContextType {
  wishlistIds: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('campora_wishlist');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.filter(id => id !== 'prod_1' && id !== 'prod_2' && id !== 'prod_3');
        }
      }
    } catch (e) {
      console.error('Failed to parse campora_wishlist:', e);
    }
    return [];
  });

  // Load wishlist from database whenever active user changes
  useEffect(() => {
    if (!user || !user.id) return;

    const loadWishlistFromDb = async () => {
      try {
        const dbIds = await supabaseService.fetchWishlist(user.id);
        let apiIds: string[] = [];
        try {
          const res = await api.get(`/wishlist/${user.id}`);
          if (res.data && res.data.success && Array.isArray(res.data.data)) {
            apiIds = res.data.data;
          }
        } catch (e) {
          // Ignore REST API network errors if local server isn't running
        }

        const combined = Array.from(new Set([...wishlistIds, ...dbIds, ...apiIds]))
          .filter(id => id !== 'prod_1' && id !== 'prod_2' && id !== 'prod_3');

        setWishlistIds(combined);
        localStorage.setItem('campora_wishlist', JSON.stringify(combined));
      } catch (e) {
        console.error('Failed loading wishlist from database:', e);
      }
    };

    loadWishlistFromDb();
  }, [user?.id]);

  const toggleWishlist = (productId: string) => {
    setWishlistIds(prev => {
      const exists = prev.includes(productId);
      const nextState = exists ? prev.filter(id => id !== productId) : [...prev, productId];
      localStorage.setItem('campora_wishlist', JSON.stringify(nextState));

      // Asynchronously persist addition/removal to Database (Supabase & REST API)
      const userId = user?.id || 'guest_user';

      if (exists) {
        supabaseService.removeFromWishlist(userId, productId).catch(() => {});
        api.delete(`/wishlist/${userId}/${productId}`).catch(() => {});
        toast.success('Removed from Wishlist');
      } else {
        supabaseService.addToWishlist(userId, productId).catch(() => {});
        api.post(`/wishlist/${userId}/${productId}`).catch(() => {});
        toast.success('Saved to Wishlist');
      }

      return nextState;
    });
  };

  const isInWishlist = (productId: string) => wishlistIds.includes(productId);

  return (
    <WishlistContext.Provider value={{ wishlistIds, toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

