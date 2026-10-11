import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Shield, Send } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0F0F0F] text-stone-400 border-t border-stone-800/80 pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-600 via-rose-500 to-amber-500 p-0.5 shadow-lg shadow-rose-600/25">
                <div className="w-full h-full bg-stone-900 rounded-[14px] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                </div>
              </div>
              <span className="text-3xl font-bold font-cursive text-white">Campora</span>
            </Link>
            <p className="text-sm text-stone-400 leading-relaxed max-w-sm">
              The peer campus marketplace built for engineering students and faculty across Visakhapatnam, anchored at Chaitanya Engineering College. Buy, sell, and exchange books, lab gear, calculators, and campus essentials safely.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 bg-amber-950/40 border border-amber-800/60 rounded-lg px-3 py-1.5 w-fit">
              <Shield className="w-4 h-4" />
              <span>Verified Student & Faculty Network</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Marketplace</h4>
            <ul className="space-y-2.5 text-sm font-medium">
              <li><Link to="/marketplace?category=Books" className="hover:text-white transition-colors">Academic Books</Link></li>
              <li><Link to="/marketplace?category=Electronics" className="hover:text-white transition-colors">Laptops & Gadgets</Link></li>
              <li><Link to="/marketplace?category=Campus Essentials" className="hover:text-white transition-colors">Campus Essentials</Link></li>
              <li><Link to="/marketplace?category=Vehicles" className="hover:text-white transition-colors">Bicycles & Scooters</Link></li>
              <li><Link to="/marketplace?category=Notes" className="hover:text-white transition-colors">Semester Notes</Link></li>
            </ul>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Platform & Legal</h4>
            <ul className="space-y-2.5 text-sm font-medium">
              <li><Link to="/how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
              <li><Link to="/messages" className="hover:text-white transition-colors">Campus Messages</Link></li>
              <li><Link to="/sell" className="hover:text-white transition-colors">Start Selling</Link></li>
              <li><Link to="/dashboard" className="hover:text-white transition-colors">User Dashboard</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Campus Updates</h4>
            <p className="text-xs text-stone-400 mb-3">Get alerts on trending engineering textbooks and lab equipment listings.</p>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
              <input
                type="email"
                placeholder="college.id@cec.ac.in"
                className="w-full px-3 py-2 rounded-xl bg-stone-800 border border-stone-700 text-xs text-white placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
              <button type="submit" className="p-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white transition-colors">
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium">
          <p>© {new Date().getFullYear()} Campora. Peer-to-peer engineering campus marketplace in Visakhapatnam.</p>
          <div className="flex items-center gap-3 text-stone-400">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span className="text-stone-700">•</span>
            <Link to="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
            <span className="text-stone-700">•</span>
            <span>Chaitanya Engineering College Hub</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

