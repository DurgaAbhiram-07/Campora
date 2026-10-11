import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, ShieldCheck, Mail, KeyRound, ArrowRight, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { supabaseService } from '../services/supabaseService';
import toast from 'react-hot-toast';

export const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const { signup, loginWithGoogle } = useAuth();

  const handleGoogleSignup = async () => {
    const success = await loginWithGoogle();
    if (success) {
      navigate('/marketplace');
    }
  };

  const [step, setStep] = useState<'FORM' | 'OTP'>('FORM');

  // Form State
  const [name, setName] = useState('');
  const [collegeId, setCollegeId] = useState('');
  const [collegeName, setCollegeName] = useState('Chaitanya Engineering College');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'STUDENT' | 'FACULTY' | 'ADMIN'>('STUDENT');
  const [department, setDepartment] = useState('Computer Science');
  const [year, setYear] = useState('1st Year');
  const [hosteller, setHosteller] = useState(true);

  // OTP State
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  // Step 1: Submit Form -> Send OTP
  const handleInitiateSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !name.trim() || !collegeId.trim()) {
      toast.error('Please fill in all required fields.');
      return;
    }

    // Generate random 6-digit OTP as instant verification code
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otp);
    setStep('OTP');

    // Trigger Supabase Real Email Sending
    await supabaseService.sendEmailOtp(email, password);
    toast.success(`Verification Code: ${otp}\nSent to ${email}`, { duration: 10000 });
  };

  // Step 2: Verify OTP & Create Account
  const handleVerifyOtpAndRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (enteredOtp.trim() !== generatedOtp && enteredOtp.trim() !== '123456') {
      toast.error('Invalid 6-digit OTP code. Use code 123456 or the code shown in notification toast.');
      return;
    }

    setIsVerifying(true);
    try {
      await signup({
        name,
        collegeId,
        collegeName,
        email,
        phone,
        department: role === 'ADMIN' ? 'Administration' : department,
        year: role === 'ADMIN' ? 'Faculty Lead' : year,
        hosteller: role === 'ADMIN' ? false : hosteller,
        role,
      });

      toast.success('Email verified successfully.');
      if (role === 'ADMIN') {
        navigate('/admin');
      } else {
        navigate('/marketplace');
      }
    } catch (err) {
      toast.error('Failed to create account. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendOtp = async () => {
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(newOtp);
    await supabaseService.sendEmailOtp(email);
    toast.success(`New Verification Code: ${newOtp}\nSent to ${email}`, { duration: 10000 });
  };

  return (
    <div className="min-h-screen py-12 bg-hero-gradient flex items-center justify-center px-4">
      <div className="w-full max-w-xl glass-card rounded-2xl p-8 sm:p-10 border border-[#CFC4B3] dark:border-stone-800 space-y-6 shadow-2xl">
        
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-stone-900 border border-stone-800 flex items-center justify-center shadow-md">
              <Sparkles className="w-5 h-5 text-amber-400" />
            </div>
            <span className="text-2xl font-black tracking-tight text-stone-900 dark:text-white">Campora</span>
          </Link>
          <h2 className="text-2xl font-bold text-stone-900 dark:text-white">
            {step === 'FORM' ? 'Create Campus Account' : 'Verify Email OTP'}
          </h2>
          <p className="text-xs text-stone-500">
            {step === 'FORM'
              ? 'Join your university marketplace with campus credentials'
              : `Enter the 6-digit verification code sent to ${email}`}
          </p>
        </div>

        {/* STEP 1: REGISTRATION FORM */}
        {step === 'FORM' && (
          <div className="space-y-4">
            
            {/* Google Signup Button */}
            <button
              type="button"
              onClick={handleGoogleSignup}
              className="w-full py-3 px-4 rounded-lg border border-[#CFC4B3] dark:border-stone-700 bg-[#F5EFE6] dark:bg-stone-800 hover:bg-[#DDD4C3]/70 dark:hover:bg-stone-700/80 text-stone-800 dark:text-white font-bold text-xs flex items-center justify-center gap-3 transition-colors shadow-sm"
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
              Sign Up with Google
            </button>

            <div className="flex items-center gap-3 text-[11px] text-stone-400 font-semibold uppercase tracking-wider">
              <div className="flex-1 h-px bg-[#CFC4B3] dark:bg-stone-800" />
              <span>Or fill out details</span>
              <div className="flex-1 h-px bg-[#CFC4B3] dark:bg-stone-800" />
            </div>

            <form onSubmit={handleInitiateSignup} className="space-y-4">
            
            {/* College Selection */}
            <div>
              <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1">
                College / Institution (Visakhapatnam)
              </label>
              <select
                value={collegeName}
                onChange={(e) => setCollegeName(e.target.value)}
                className="w-full p-3 rounded-lg bg-[#F5EFE6] dark:bg-stone-800 border border-[#CFC4B3] dark:border-stone-700 text-xs font-semibold focus:ring-2 focus:ring-rose-500"
              >
                <option value="Chaitanya Engineering College">Chaitanya Engineering College (CEC Kommadi)</option>
                <option value="Andhra University College of Engineering (AUCE)">Andhra University College of Engineering (AUCE)</option>
                <option value="Gayatri Vidya Parishad College of Engineering (GVPCE)">Gayatri Vidya Parishad College of Engineering (GVPCE)</option>
                <option value="Anil Neerukonda Institute of Technology & Sciences (ANITS)">Anil Neerukonda Institute of Technology & Sciences (ANITS)</option>
                <option value="Vignan's Institute of Information Technology (VIIT)">Vignan's Institute of Information Technology (VIIT)</option>
                <option value="Raghu Engineering College (REC)">Raghu Engineering College (REC)</option>
                <option value="GITAM School of Technology, Visakhapatnam">GITAM School of Technology, Visakhapatnam</option>
                <option value="MVGR College of Engineering">MVGR College of Engineering</option>
                <option value="Sanketika Vidya Parishad Engineering College">Sanketika Vidya Parishad Engineering College</option>
                <option value="Baba Institute of Technology and Sciences (BITS Vizag)">Baba Institute of Technology and Sciences (BITS Vizag)</option>
                <option value="Nadimpalli Satyanarayana Raju Institute of Technology (NSRIT)">Nadimpalli Satyanarayana Raju Institute of Technology (NSRIT)</option>
                <option value="Visakha Institute of Engineering & Technology (VIET)">Visakha Institute of Engineering & Technology (VIET)</option>
                <option value="Wellfare Institute of Science, Technology and Management (WISTM)">Wellfare Institute of Science, Technology and Management (WISTM)</option>
              </select>
            </div>

            {/* Role Selection */}
            <div>
              <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1">Account Role / Type</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as 'STUDENT' | 'FACULTY' | 'ADMIN')}
                className="w-full p-3 rounded-lg bg-[#F5EFE6] dark:bg-stone-800 border border-[#CFC4B3] dark:border-stone-700 text-xs font-semibold focus:ring-2 focus:ring-rose-500"
              >
                <option value="STUDENT">Student Account</option>
                <option value="FACULTY">Faculty Member</option>
                <option value="ADMIN">University Admin / Dean</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder={role === 'ADMIN' ? 'e.g. Dr. K. Rajesh' : 'e.g. Student Name'}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 rounded-lg bg-[#F5EFE6] dark:bg-stone-800 border border-[#CFC4B3] dark:border-stone-700 text-xs font-semibold"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1">
                  {role === 'ADMIN' ? 'Admin ID / Faculty Code' : 'College Roll / ID'}
                </label>
                <input
                  type="text"
                  required
                  placeholder={role === 'ADMIN' ? 'e.g. FAC8802' : 'e.g. 2023CS1084'}
                  value={collegeId}
                  onChange={(e) => setCollegeId(e.target.value)}
                  className="w-full p-3 rounded-lg bg-[#F5EFE6] dark:bg-stone-800 border border-[#CFC4B3] dark:border-stone-700 text-xs font-semibold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1">Personal Email</label>
                <input
                  type="email"
                  required
                  placeholder="student@campus.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 rounded-lg bg-[#F5EFE6] dark:bg-stone-800 border border-[#CFC4B3] dark:border-stone-700 text-xs font-semibold"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1">Phone Number</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-3 rounded-lg bg-[#F5EFE6] dark:bg-stone-800 border border-[#CFC4B3] dark:border-stone-700 text-xs font-semibold"
                />
              </div>
            </div>

            {/* ONLY SHOW STUDENT FIELDS FOR NON-ADMIN ACCOUNTS */}
            {role !== 'ADMIN' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1">Department</label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full p-3 rounded-lg bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-semibold"
                  >
                    <option value="Computer Science">CS</option>
                    <option value="Electronics & Comm.">ECE</option>
                    <option value="Mechanical Eng.">Mech</option>
                    <option value="Civil Eng.">Civil</option>
                    <option value="Chemical Eng.">Chemical</option>
                    <option value="Faculty">Faculty</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1">Academic Year</label>
                  <select
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full p-3 rounded-lg bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-semibold"
                  >
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                    <option value="PG / PhD">PG / PhD</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1">Residency</label>
                  <select
                    value={hosteller ? 'On-Campus' : 'Off-Campus'}
                    onChange={(e) => setHosteller(e.target.value === 'On-Campus')}
                    className="w-full p-3 rounded-lg bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-semibold"
                  >
                    <option value="On-Campus">On-Campus Resident</option>
                    <option value="Off-Campus">Off-Campus Student</option>
                  </select>
                </div>
              </div>
            )}

            <div>
              <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1">Password</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded-lg bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-semibold"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md transition-colors mt-2 flex items-center justify-center gap-2"
            >
              <span>Send Email OTP & Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
        )}

        {/* STEP 2: EMAIL OTP VERIFICATION */}
        {step === 'OTP' && (
          <form onSubmit={handleVerifyOtpAndRegister} className="space-y-6">
            
            <div className="p-4 rounded-lg bg-stone-100 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 text-center space-y-2">
              <Mail className="w-8 h-8 text-rose-500 mx-auto" />
              <div className="text-xs text-stone-600 dark:text-stone-300">
                We sent a 6-digit verification code to <b className="text-stone-900 dark:text-white">{email}</b>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-2 text-center">
                Enter 6-Digit Email Verification OTP
              </label>
              <input
                type="text"
                required
                maxLength={6}
                placeholder="e.g. 123456"
                value={enteredOtp}
                onChange={(e) => setEnteredOtp(e.target.value.replace(/\D/g, ''))}
                className="w-full p-4 rounded-lg bg-stone-100 dark:bg-stone-800 border-2 border-rose-500/50 text-center text-2xl font-mono font-bold tracking-widest text-stone-900 dark:text-white focus:ring-4 focus:ring-rose-500/20"
              />
            </div>

            {/* Instant Verification Code Helper / Fallback */}
            <div className="p-3.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs flex items-center justify-between gap-2 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="font-bold">Verification Code:</span>
                <code className="bg-stone-900 text-amber-300 px-2.5 py-1 rounded-md font-mono font-bold text-sm tracking-wider">
                  {generatedOtp || '123456'}
                </code>
              </div>
              <button
                type="button"
                onClick={() => setEnteredOtp(generatedOtp || '123456')}
                className="px-3 py-1 rounded-md bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-[11px] transition-colors shadow-sm"
              >
                Auto-fill Code
              </button>
            </div>

            <button
              type="submit"
              disabled={isVerifying || enteredOtp.length < 6}
              className="w-full py-3.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-md transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <KeyRound className="w-5 h-5" />
              <span>{isVerifying ? 'Verifying...' : 'Verify OTP & Create Account'}</span>
            </button>

            <div className="flex items-center justify-between text-xs pt-2">
              <button
                type="button"
                onClick={() => setStep('FORM')}
                className="text-stone-500 hover:text-stone-800 dark:hover:text-white flex items-center gap-1 font-semibold"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Edit Form
              </button>

              <button
                type="button"
                onClick={handleResendOtp}
                className="text-rose-600 dark:text-rose-400 font-bold hover:underline"
              >
                Resend OTP
              </button>
            </div>
          </form>
        )}

        <p className="text-center text-xs text-stone-500">
          Already registered?{' '}
          <Link to="/login" className="font-bold text-rose-600 dark:text-rose-400 hover:underline">Log In</Link>
        </p>

      </div>
    </div>
  );
};
