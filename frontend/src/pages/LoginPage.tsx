import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Lock, ShieldCheck, ArrowRight, UserCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, loginWithGoogle } = useAuth();

  const [collegeId, setCollegeId] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  const handleGoogleSignIn = async () => {
    const success = await loginWithGoogle();
    if (success) {
      navigate('/marketplace');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(collegeId, password);
    if (success) {
      const savedUser = localStorage.getItem('campora_user');
      const parsed = savedUser ? JSON.parse(savedUser) : null;
      if (parsed?.role === 'ADMIN') {
        navigate('/admin');
      } else {
        navigate('/marketplace');
      }
    }
  };

  return (
    <div className="min-h-screen py-16 bg-hero-gradient flex items-center justify-center px-4">
      <div className="w-full max-w-md glass-card rounded-3xl p-8 border border-[#CFC4B3] dark:border-stone-800 space-y-6 shadow-2xl">
        
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-600 via-rose-500 to-amber-500 p-0.5 shadow-lg shadow-rose-600/25">
              <div className="w-full h-full bg-stone-900 rounded-[14px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-amber-400" />
              </div>
            </div>
            <span className="text-3xl font-black tracking-tight text-gradient">Campora</span>
          </Link>
          <h2 className="text-2xl font-bold text-stone-900 dark:text-white">Campus Portal Login</h2>
          <p className="text-xs text-stone-500">Sign in with Google or your College Credentials</p>
        </div>

        {/* Google Sign-in Option */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full py-2.5 px-4 rounded-lg border border-[#CFC4B3] dark:border-stone-700 bg-[#F5EFE6] dark:bg-stone-800 hover:bg-[#DDD4C3]/70 dark:hover:bg-stone-700/80 text-stone-800 dark:text-white font-bold text-xs flex items-center justify-center gap-3 transition-colors shadow-sm"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          Continue with Google
        </button>

        <div className="flex items-center gap-3 text-[11px] text-stone-400 font-semibold uppercase tracking-wider">
          <div className="flex-1 h-px bg-[#CFC4B3] dark:bg-stone-800" />
          <span>Or with College ID</span>
          <div className="flex-1 h-px bg-[#CFC4B3] dark:bg-stone-800" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1.5">College ID / Roll Number</label>
            <input
              type="text"
              required
              placeholder="e.g. 2024CS101"
              value={collegeId}
              onChange={(e) => setCollegeId(e.target.value)}
              className="w-full p-2.5 rounded-lg bg-[#F5EFE6] dark:bg-stone-800 border border-[#CFC4B3] dark:border-stone-700 text-xs font-semibold focus:ring-2 focus:ring-rose-500"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-stone-700 dark:text-stone-300">Password</label>
              <Link to="/forgot-password" className="text-xs text-rose-600 dark:text-rose-400 hover:underline">Forgot?</Link>
            </div>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2.5 rounded-lg bg-[#F5EFE6] dark:bg-stone-800 border border-[#CFC4B3] dark:border-stone-700 text-xs font-semibold focus:ring-2 focus:ring-rose-500"
            />
          </div>

          <div className="flex items-center justify-between text-xs font-medium">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 accent-rose-600 rounded"
              />
              <span>Remember me</span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-sm transition-colors"
          >
            Log In to Marketplace
          </button>
        </form>

        <p className="text-center text-xs text-stone-500">
          Don't have an account yet?{' '}
          <Link to="/signup" className="font-bold text-rose-600 dark:text-rose-400 hover:underline">Sign Up</Link>
        </p>

      </div>
    </div>
  );
};

