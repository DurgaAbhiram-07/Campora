import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Key, CheckCircle, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [step, setStep] = useState<'request' | 'otp'>('request');
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');

  const handleRequestOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(code);
    toast.success(`Password Reset OTP: ${code}\nSent to ${email}`, { duration: 10000 });
    setStep('otp');
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.trim() !== generatedOtp && otp.trim() !== '123456') {
      toast.error('Invalid OTP. Use code 123456 or the code shown in notification toast.');
      return;
    }
    toast.success('OTP verified! Password reset link & instructions sent to your email.');
  };

  return (
    <div className="min-h-screen py-16 bg-hero-gradient flex items-center justify-center px-4">
      <div className="w-full max-w-md glass-card rounded-2xl p-8 border border-stone-200/80 dark:border-stone-800 space-y-6 shadow-2xl">
        
        <Link to="/login" className="inline-flex items-center gap-2 text-xs font-semibold text-stone-500 hover:text-rose-600">
          <ArrowLeft className="w-4 h-4" /> Back to Login
        </Link>

        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-lg bg-rose-500/10 text-rose-500 mx-auto flex items-center justify-center">
            <Key className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-stone-900 dark:text-white">Reset Password</h2>
          <p className="text-xs text-stone-500">Enter your registered personal email to receive a verification OTP</p>
        </div>

        {step === 'request' ? (
          <form onSubmit={handleRequestOtp} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1.5">Personal Email Address</label>
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-lg bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-semibold"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md transition-colors"
            >
              Send OTP Verification Code
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1.5">Enter 6-Digit OTP Code</label>
              <input
                type="text"
                required
                maxLength={6}
                placeholder="123456"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full p-3 rounded-lg bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-mono font-bold text-center tracking-widest"
              />
            </div>

            {/* Instant Verification Code Helper / Fallback */}
            <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs flex items-center justify-between gap-2 shadow-sm">
              <div className="flex items-center gap-1.5">
                <span className="font-bold">Reset Code:</span>
                <code className="bg-stone-900 text-amber-300 px-2 py-0.5 rounded font-mono font-bold text-xs">
                  {generatedOtp || '123456'}
                </code>
              </div>
              <button
                type="button"
                onClick={() => setOtp(generatedOtp || '123456')}
                className="px-2.5 py-1 rounded-md bg-amber-500 hover:bg-amber-600 text-stone-950 font-extrabold text-[10px] transition-colors"
              >
                Auto-fill
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-colors"
            >
              Verify OTP & Reset Password
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
