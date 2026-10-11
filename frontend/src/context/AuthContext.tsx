import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState } from '../types/user';
import { supabaseService } from '../services/supabaseService';
import { firebaseAuthService } from '../services/firebaseAuth';
import toast from 'react-hot-toast';

interface AuthContextType extends AuthState {
  login: (collegeId: string, pass: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  signup: (userData: Partial<User>) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updatedData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>(() => {
    const savedUser = localStorage.getItem('campora_user');
    const savedToken = localStorage.getItem('campora_token');
    
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        // Purge old demo/unsplash profile photos if present so clean initial badge is used
        if (parsed.profilePhoto && parsed.profilePhoto.includes('unsplash.com')) {
          delete parsed.profilePhoto;
          localStorage.setItem('campora_user', JSON.stringify(parsed));
        }
        return {
          user: parsed,
          token: savedToken || 'sb-jwt-token',
          isAuthenticated: true,
          isLoading: false,
        };
      } catch (e) {
        localStorage.removeItem('campora_user');
      }
    }

    return {
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
    };
  });

  useEffect(() => {
    if (authState.user) {
      localStorage.setItem('campora_user', JSON.stringify(authState.user));
    } else {
      localStorage.removeItem('campora_user');
    }
    if (authState.token) {
      localStorage.setItem('campora_token', authState.token);
    } else {
      localStorage.removeItem('campora_token');
    }
  }, [authState.user, authState.token]);

  const loginWithGoogle = async (): Promise<boolean> => {
    const googleUser = await firebaseAuthService.signInWithGoogle();
    if (!googleUser) return false;

    const fullUser: User = {
      id: googleUser.id || `google_${Date.now()}`,
      name: googleUser.name || 'Google Student',
      collegeId: googleUser.collegeId || '2026CS9012',
      email: googleUser.email || 'student@gmail.com',
      phone: googleUser.phone || '',
      department: googleUser.department || 'Computer Science',
      year: googleUser.year || '2nd Year',
      hosteller: googleUser.hosteller ?? true,
      profilePhoto: googleUser.profilePhoto,
      verified: true,
      role: 'STUDENT',
      createdAt: new Date().toISOString(),
      collegeName: 'Chaitanya Engineering College',
    };

    setAuthState({
      user: fullUser,
      token: 'google-token-' + Date.now(),
      isAuthenticated: true,
      isLoading: false,
    });

    try {
      const saved = localStorage.getItem('campora_registered_users');
      const list: User[] = saved ? JSON.parse(saved) : [];
      if (!list.some(u => u.id === fullUser.id)) {
        list.push(fullUser);
        localStorage.setItem('campora_registered_users', JSON.stringify(list));
      }
    } catch (e) {}

    return true;
  };

  const login = async (collegeId: string, pass: string): Promise<boolean> => {
    let matchedUser = await supabaseService.fetchUserByCollegeId(collegeId);
    
    // Fallback for Admin login if ID is ADMIN or contains admin
    if (!matchedUser && collegeId.trim().toLowerCase().includes('admin')) {
      matchedUser = {
        id: 'admin_user_01',
        name: 'University Admin',
        collegeId: collegeId.trim().toUpperCase(),
        email: 'admin@campora.edu',
        phone: '+91 98765 43210',
        department: 'Administration',
        year: 'Faculty Lead',
        hosteller: false,
        verified: true,
        role: 'ADMIN',
        createdAt: new Date().toISOString(),
        collegeName: 'Chaitanya Engineering College',
      };
    }

    if (!matchedUser) {
      toast.error('Invalid College ID or Password. User not found.');
      return false;
    }

    setAuthState({
      user: matchedUser,
      token: 'sb-jwt-token-' + Date.now(),
      isAuthenticated: true,
      isLoading: false,
    });
    toast.success(`Welcome back, ${matchedUser.name}!`);
    return true;
  };

  const signup = async (userData: Partial<User>): Promise<boolean> => {
    const isUserAdmin = userData.role === 'ADMIN';

    const newUser: User = {
      id: 'user_' + Date.now(),
      name: userData.name || (isUserAdmin ? 'University Admin' : 'Campus Student'),
      collegeId: userData.collegeId || (isUserAdmin ? 'ADMIN001' : '2026CS999'),
      email: userData.email || 'student@gmail.com',
      phone: userData.phone || '',
      department: isUserAdmin ? 'Administration' : (userData.department || 'Computer Science'),
      year: isUserAdmin ? 'Faculty Lead' : (userData.year || '1st Year'),
      hosteller: isUserAdmin ? false : (userData.hosteller ?? true),
      profilePhoto: userData.profilePhoto || undefined, // No auto-assigned stock photo! User adds in settings.
      idCardUrl: userData.idCardUrl || undefined,
      verified: true,
      role: userData.role || 'STUDENT',
      createdAt: new Date().toISOString(),
      collegeName: userData.collegeName || 'Chaitanya Engineering College',
    };

    // Save locally so user can log in again anytime
    try {
      const saved = localStorage.getItem('campora_registered_users');
      const list: User[] = saved ? JSON.parse(saved) : [];
      list.push(newUser);
      localStorage.setItem('campora_registered_users', JSON.stringify(list));
    } catch (e) {}

    await supabaseService.createUser(newUser);

    setAuthState({
      user: newUser,
      token: 'sb-jwt-token-' + Date.now(),
      isAuthenticated: true,
      isLoading: false,
    });
    toast.success('Account created successfully!');
    return true;
  };

  const logout = () => {
    setAuthState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
    });
    toast.success('Logged out successfully');
  };

  const updateProfile = (updatedData: Partial<User>) => {
    if (!authState.user) return;
    const updated = { ...authState.user, ...updatedData };
    if (!updatedData.profilePhoto) {
      delete updated.profilePhoto;
    }
    setAuthState(prev => ({ ...prev, user: updated }));

    // Also update in registered users cache if present
    try {
      const saved = localStorage.getItem('campora_registered_users');
      if (saved) {
        let list: User[] = JSON.parse(saved);
        list = list.map(u => u.id === updated.id ? updated : u);
        localStorage.setItem('campora_registered_users', JSON.stringify(list));
      }
    } catch (e) {}

    toast.success('Profile updated successfully!');
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, loginWithGoogle, signup, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};


