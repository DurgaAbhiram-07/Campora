import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Search, PlusCircle, Heart, MessageSquare, Bell, Sun, Moon, 
  User as UserIcon, Shield, LogOut, Menu, X, Sparkles, ChevronDown, MapPin 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useWishlist } from '../context/WishlistContext';
import { useProducts } from '../context/ProductContext';
import { useChat } from '../context/ChatContext';
import { VerificationBadge } from './VerificationBadge';
import { useCampus } from '../context/CampusContext';
import toast from 'react-hot-toast';

interface NavbarProps {
  onOpenChatDrawer?: () => void;
  onOpenHowItWorks?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenChatDrawer, onOpenHowItWorks }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { wishlistIds } = useWishlist();
  const { products } = useProducts();
  const { totalUnreadCount } = useChat();
  const { selectedCampusHub, setSelectedCampusHub, campusHubsList } = useCampus();
  const navigate = useNavigate();
  const location = useLocation();

  const validWishlistProducts = products.filter(p => wishlistIds.includes(p.id));

  const [searchQuery, setSearchQuery] = useState('');
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Array<{id: string; title: string; message: string}>>([]);
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false);

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 350) {
        setScrolledPastHero(true);
      } else {
        setScrolledPastHero(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMarkNotificationsRead = () => {
    setHasUnreadNotifications(false);
    toast.success('All notifications marked as read!');
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/marketplace?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const showNavbarSearch = !isHomePage || scrolledPastHero;

  return (
    <header className="sticky top-0 z-50 glass-navbar transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-[68px] flex items-center justify-between gap-4">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-rose-600 via-amber-500 to-yellow-400 p-0.5 shadow-sm transition-transform duration-300">
            <div className="w-full h-full bg-stone-900 rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
            </div>
          </div>
          <div>
            <span className="text-xl sm:text-2xl font-black tracking-tight text-gradient leading-none block">Campora</span>
            <span className="hidden sm:block text-[10px] sm:text-[11px] uppercase font-bold tracking-wider text-stone-500 dark:text-stone-400 mt-0.5">Campus Marketplace</span>
          </div>
        </Link>

        {/* Global Live Search (Only visible when scrolled past hero on homepage, or on other pages) */}
        <div className={`hidden md:flex flex-1 max-w-xs xl:max-w-md relative transition-all duration-300 ${
          showNavbarSearch ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}>
          <form onSubmit={handleSearchSubmit} className="w-full relative">
            <input
              type="text"
              placeholder="Search books, laptops, cycles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-[#F5EFE6] dark:bg-stone-800/80 border border-[#CFC4B3] dark:border-stone-700 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-[#FAF7F2] dark:focus:bg-stone-900 transition-all placeholder:text-stone-500 truncate font-medium"
            />
            <Search className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
          </form>
        </div>

        {/* Desktop Nav Items */}
        <div className="hidden lg:flex items-center gap-3.5 xl:gap-5 shrink-0">
          
          {/* Campus Hub Selector */}
          <div className="flex items-center gap-2 bg-[#D4CABA] dark:bg-stone-800/90 px-3 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold border border-[#BEB2A0] dark:border-stone-700 shadow-2xs">
            <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
            <select
              value={selectedCampusHub}
              onChange={(e) => setSelectedCampusHub(e.target.value as any)}
              className="bg-transparent text-stone-900 dark:text-stone-200 font-semibold focus:outline-none cursor-pointer max-w-[190px] xl:max-w-[250px] truncate"
            >
              {campusHubsList.map((hub) => (
                <option key={hub} value={hub} className="bg-[#F5EFE6] dark:bg-stone-900 text-stone-900 dark:text-white">
                  {hub}
                </option>
              ))}
            </select>
          </div>

          {/* Primary Navigation Links */}
          <div className="flex items-center gap-3.5 xl:gap-5 text-sm font-semibold text-stone-800 dark:text-stone-300">
            <Link to="/marketplace" className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors py-1">
              Marketplace
            </Link>

            <Link to="/people" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors py-1">
              People
            </Link>

            <Link to="/how-it-works" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors py-1 font-semibold">
              How it works
            </Link>
          </div>

          {/* Divider */}
          <div className="h-5 w-px bg-[#C5BBAA] dark:bg-stone-800" />

          {/* User Action Icons */}
          <div className="flex items-center gap-1 xl:gap-1.5">
            {/* Wishlist Link */}
            <Link to="/dashboard?tab=wishlist" className="relative hover:text-rose-600 dark:hover:text-rose-400 transition-colors p-2 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300" title="Wishlist">
              <Heart className="w-[18px] h-[18px]" />
              {validWishlistProducts.length > 0 && (
                <span className="absolute 0.5 right-0.5 w-4 h-4 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center">
                  {validWishlistProducts.length}
                </span>
              )}
            </Link>

            {/* Messages Link (Opens dedicated separate /messages page) */}
            <Link 
              to="/messages"
              className="relative hover:text-rose-600 dark:hover:text-rose-400 transition-colors p-2 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300"
              title="Campus Messages"
            >
              <MessageSquare className="w-[18px] h-[18px]" />
              {totalUnreadCount > 0 && (
                <span className="absolute 0.5 right-0.5 w-4 h-4 rounded-full bg-emerald-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {totalUnreadCount}
                </span>
              )}
            </Link>

            {/* Notifications Dropdown Toggle */}
            <div className="relative">
              <button 
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative p-2 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors text-stone-700 dark:text-stone-300 hover:text-rose-600 dark:hover:text-rose-400"
                title="Notifications"
              >
                <Bell className="w-[18px] h-[18px]" />
                {hasUnreadNotifications && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500" />
                )}
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-3 w-80 rounded-2xl glass-modal p-4 shadow-2xl z-50 border border-stone-200 dark:border-stone-800 animate-in fade-in slide-in-from-top-2">
                  <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
                    <h4 className="font-bold text-sm">Notifications</h4>
                    {notifications.length > 0 && (
                      <button onClick={handleMarkNotificationsRead} className="text-xs text-rose-600 dark:text-rose-400 font-semibold hover:underline">Mark read</button>
                    )}
                  </div>
                  <div className="mt-3 space-y-3 max-h-64 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="py-6 text-center text-xs text-stone-400 font-medium">
                        No new notifications
                      </div>
                    ) : (
                      notifications.map(n => (
                        <div key={n.id} className="p-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-xs">
                          <p className="font-semibold text-stone-800 dark:text-stone-200">{n.title}</p>
                          <p className="text-stone-500 mt-0.5">{n.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors text-stone-600 dark:text-stone-300"
              title="Toggle Light/Dark Theme"
            >
              {theme === 'dark' ? <Sun className="w-[18px] h-[18px] text-amber-400" /> : <Moon className="w-[18px] h-[18px] text-stone-700" />}
            </button>
          </div>

          {/* Sell Button */}
          <Link
            to="/sell"
            className="flex items-center gap-1.5 px-4 py-2 sm:py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-all shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Sell Item</span>
          </Link>

          {/* Profile Menu */}
          {isAuthenticated && user ? (
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl border border-[#BEB2A0] dark:border-stone-700 hover:border-rose-500 bg-[#D4CABA]/70 dark:bg-stone-800/50 transition-colors"
              >
                {user.profilePhoto ? (
                  <img
                    src={user.profilePhoto}
                    alt={user.name}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg object-cover"
                  />
                ) : (
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-rose-600 flex items-center justify-center text-white font-bold text-xs sm:text-sm shadow-xs">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                )}
                <span className="text-xs sm:text-sm font-semibold max-w-[100px] truncate">{user.name.split(' ')[0]}</span>
                <ChevronDown className="w-3.5 h-3.5 text-stone-500" />
              </button>

              {profileDropdownOpen && (
                <div className="absolute right-0 mt-3 w-64 rounded-2xl glass-modal p-3 shadow-2xl z-50 border border-[#CFC4B3] dark:border-stone-800">
                  <div className="p-3 border-b border-[#CFC4B3] dark:border-stone-800">
                    <p className="font-bold text-sm truncate">{user.name}</p>
                    <p className="text-xs text-stone-500 truncate">{user.collegeId} • {user.department}</p>
                    <div className="mt-2">
                      <VerificationBadge />
                    </div>
                  </div>
                  <div className="py-2 space-y-1 text-xs font-medium">
                    <Link
                      to={`/profile/${user.id}`}
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors text-emerald-600 dark:text-emerald-400 font-semibold"
                    >
                      <UserIcon className="w-4 h-4 text-emerald-500" />
                      <span>My Public Profile</span>
                    </Link>
                    <Link
                      to="/dashboard"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                    >
                      <UserIcon className="w-4 h-4 text-rose-500" />
                      <span>User Dashboard</span>
                    </Link>
                    {user.role === 'ADMIN' && (
                      <Link
                        to="/admin"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors text-amber-600 dark:text-amber-400 font-bold"
                      >
                        <Shield className="w-4 h-4" />
                        <span>Admin Panel</span>
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        logout();
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-rose-500/10 text-rose-600 dark:text-rose-400 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login" className="px-4 py-2 text-sm font-semibold hover:text-rose-600 dark:hover:text-rose-400">
                Log In
              </Link>
              <Link to="/signup" className="px-4 py-2 rounded-xl bg-stone-900 dark:bg-white text-white dark:text-stone-900 text-sm font-semibold hover:opacity-90 transition-opacity">
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <button onClick={toggleTheme} className="p-2 rounded-xl">
            {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
          </button>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 rounded-xl">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden glass-modal border-t border-stone-200 dark:border-stone-800 px-6 py-6 space-y-4">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search books, laptops, gear..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
          </form>
          <div className="flex flex-col space-y-2 font-medium text-sm text-stone-700 dark:text-stone-300">
            <Link
              to="/marketplace"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3 py-2 rounded-xl transition-colors ${
                location.pathname === '/marketplace'
                  ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 font-bold'
                  : 'hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              Marketplace
            </Link>
            <Link
              to="/people"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3 py-2 rounded-xl transition-colors ${
                location.pathname === '/people'
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 font-bold'
                  : 'hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              People
            </Link>
            <Link
              to="/how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3 py-2 rounded-xl transition-colors ${
                location.pathname === '/how-it-works'
                  ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 font-bold'
                  : 'hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              How it works
            </Link>
            <Link
              to="/messages"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3 py-2 rounded-xl transition-colors flex items-center justify-between ${
                location.pathname === '/messages'
                  ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 font-bold'
                  : 'hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              <span>Messages</span>
              {totalUnreadCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-emerald-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {totalUnreadCount}
                </span>
              )}
            </Link>
            <Link
              to="/dashboard?tab=wishlist"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3 py-2 rounded-xl transition-colors ${
                location.pathname === '/wishlist' || location.search.includes('tab=wishlist')
                  ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 font-bold'
                  : 'hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              Wishlist ({validWishlistProducts.length})
            </Link>
            <Link
              to="/sell"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3 py-2 rounded-xl transition-colors ${
                location.pathname === '/sell'
                  ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 font-bold'
                  : 'hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              + Sell Item
            </Link>
            <Link
              to="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className={`px-3 py-2 rounded-xl transition-colors ${
                location.pathname === '/dashboard' && !location.search.includes('tab=wishlist')
                  ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 font-bold'
                  : 'hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              Dashboard
            </Link>
            {user?.role === 'ADMIN' && (
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 rounded-xl transition-colors ${
                  location.pathname === '/admin'
                    ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 font-bold'
                    : 'hover:bg-stone-100 dark:hover:bg-stone-800'
                }`}
              >
                Admin Panel
              </Link>
            )}
            {isAuthenticated ? (
              <button
                onClick={() => { logout(); setMobileMenuOpen(false); }}
                className="px-3 py-2 text-left rounded-xl transition-colors hover:bg-rose-50 dark:hover:bg-rose-950/40 hover:text-rose-600 text-stone-700 dark:text-stone-300 font-medium"
              >
                Logout
              </button>
            ) : (
              <div className="flex gap-3 pt-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex-1 py-2 text-center rounded-xl border transition-colors ${
                    location.pathname === '/login'
                      ? 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 font-bold'
                      : 'border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800'
                  }`}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex-1 py-2 text-center rounded-xl transition-colors ${
                    location.pathname === '/signup'
                      ? 'bg-rose-600 text-white font-bold'
                      : 'bg-stone-900 dark:bg-white text-white dark:text-stone-900 font-semibold'
                  }`}
                >
                  Signup
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
