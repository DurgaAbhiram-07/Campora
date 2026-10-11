import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  User as UserIcon, ShoppingBag, Heart, MessageSquare, ShieldCheck, 
  Settings, LogOut, Trash2, Edit3, CheckCircle, Send, Image, Smile, Clock, Tag, ArrowLeft 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { useProducts } from '../context/ProductContext';
import { useChat } from '../context/ChatContext';
import { ProductCard } from '../components/ProductCard';
import { VerificationBadge } from '../components/VerificationBadge';
import { Product } from '../types/product';
import toast from 'react-hot-toast';

export const DashboardPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const tabFromUrl = searchParams.get('tab');
  const chatIdFromUrl = searchParams.get('chatId');

  const { user, updateProfile, logout } = useAuth();
  const { wishlistIds } = useWishlist();
  const { products, deleteProduct } = useProducts();
  const { chats, activeChatId, setActiveChatId, sendMessage, getMessagesForChat, totalUnreadCount, markChatAsRead } = useChat();

  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const VALID_TABS = ['profile', 'listings', 'wishlist', 'messages'];
  const initialTab = (tabFromUrl && VALID_TABS.includes(tabFromUrl)) ? tabFromUrl : 'profile';
  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [mobileShowChatView, setMobileShowChatView] = useState(false);
  
  const [chatInput, setChatInput] = useState('');
  const chatScrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tabFromUrl && VALID_TABS.includes(tabFromUrl)) {
      setActiveTab(tabFromUrl);
    }
    if (chatIdFromUrl) {
      setActiveChatId(chatIdFromUrl);
      setActiveTab('messages');
      setMobileShowChatView(true);
    }
  }, [tabFromUrl, chatIdFromUrl]);

  const activeChat = (chats && chats.length > 0) 
    ? (chats.find(c => c.id === activeChatId) || chats[0]) 
    : null;
    
  const activeMessages = activeChat ? getMessagesForChat(activeChat.id) : [];

  useEffect(() => {
    if (activeTab === 'messages' && activeChat?.id) {
      markChatAsRead(activeChat.id);
      if (chatScrollContainerRef.current) {
        chatScrollContainerRef.current.scrollTop = chatScrollContainerRef.current.scrollHeight;
      }
    }
  }, [activeMessages.length, activeTab, activeChat?.id]);

  // Edit Profile Form state
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [department, setDepartment] = useState(user?.department || '');
  const [profilePhoto, setProfilePhoto] = useState(user?.profilePhoto || '');

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setPhone(user.phone || '');
      setDepartment(user.department || '');
      setProfilePhoto(user.profilePhoto || '');
    }
  }, [user]);

  const myWishlistProducts = products.filter(p => wishlistIds.includes(p.id));
  const myListings = products.filter(p => p.sellerId === user?.id);

  const handleRemovePhoto = () => {
    setProfilePhoto('');
    updateProfile({ name, phone, department, profilePhoto: undefined });
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name, phone, department, profilePhoto: profilePhoto.trim() || undefined });
  };

  const handleSendMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || !activeChat) return;

    sendMessage(activeChat.id, chatInput);
    setChatInput('');
  };

  if (!user) {
    return (
      <div className="min-h-screen py-20 bg-[#E8E1D5] dark:bg-black flex items-center justify-center px-4">
        <div className="text-center space-y-4 max-w-md glass-card p-10 rounded-3xl border border-[#CFC4B3] dark:border-stone-800 shadow-xl">
          <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto">
            <UserIcon className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-stone-900 dark:text-white">Campus Dashboard</h2>
          <p className="text-xs text-stone-500 leading-relaxed">
            Please log in with your verified campus credentials to access your profile, listings, wishlist, and peer messages.
          </p>
          <Link
            to="/login"
            className="inline-block w-full py-3.5 rounded-2xl bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 text-white text-xs font-bold shadow-lg shadow-rose-600/25 hover:scale-[1.01] transition-transform mt-2"
          >
            Log In to Campus Account
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${activeTab === 'messages' ? 'py-3 sm:py-4 flex flex-col justify-center' : 'py-10'} bg-[#E8E1D5] dark:bg-black transition-colors`}>
      <div className={`max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 w-full flex-1 flex flex-col ${activeTab === 'messages' ? 'space-y-3' : 'space-y-8'}`}>
        
        {/* User Banner Header (Hidden on Messages tab for full screen chat focus) */}
        {activeTab !== 'messages' && (
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-[#CFC4B3] dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-center sm:text-left">
              {user?.profilePhoto ? (
                <img
                  src={user.profilePhoto}
                  alt={user?.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-rose-600 shadow-md"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-rose-500 via-rose-600 to-amber-500 flex items-center justify-center text-white font-black text-2xl shadow-lg border-2 border-rose-500 shrink-0">
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
              )}
              <div>
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <h1 className="text-2xl font-black text-stone-900 dark:text-white">{user?.name}</h1>
                  <VerificationBadge />
                </div>
                <p className="text-xs text-stone-500 mt-1">{user?.collegeId} • {user?.department} ({user?.year})</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveTab('profile')}
                className="px-4 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-xs font-bold hover:bg-stone-200 transition-colors"
              >
                Edit Profile
              </button>
              <button
                onClick={logout}
                className="px-4 py-2 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs font-bold hover:bg-rose-500/20 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        )}

        {/* Horizontal Navigation Tabs */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none border-b border-stone-200/80 dark:border-stone-800">
          {[
            { id: 'profile', label: 'My Profile', icon: <UserIcon className="w-4 h-4" /> },
            { id: 'listings', label: 'My Listings', icon: <ShoppingBag className="w-4 h-4" />, count: myListings.length },
            { id: 'wishlist', label: 'Saved Wishlist', icon: <Heart className="w-4 h-4" />, count: myWishlistProducts.length },
            { id: 'messages', label: 'Campus Messages', icon: <MessageSquare className="w-4 h-4" />, count: totalUnreadCount },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`px-5 py-3 rounded-2xl text-xs font-bold flex items-center gap-2.5 whitespace-nowrap transition-all ${
                activeTab === t.id
                  ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/25'
                  : 'glass-card text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              {t.icon}
              <span>{t.label}</span>
              {t.count !== undefined && t.count > 0 && (
                <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${activeTab === t.id ? 'bg-white/20 text-white' : 'bg-rose-600 text-white'}`}>
                  {t.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="w-full">
            
            {/* PROFILE TAB */}
            {activeTab === 'profile' && (
              <div className="glass-card rounded-3xl p-8 border border-stone-200/80 dark:border-stone-800 space-y-6">
                <h2 className="text-xl font-bold text-stone-900 dark:text-white">Profile Details & Settings</h2>
                <form onSubmit={handleSaveProfile} className="space-y-4 max-w-lg">
                  <div>
                    <label className="text-xs font-bold text-stone-500 block mb-1">Full Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full p-3 rounded-xl bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-semibold"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-stone-500 block mb-1">College Roll / ID Number</label>
                    <input
                      type="text"
                      disabled
                      value={user?.collegeId}
                      className="w-full p-3 rounded-xl bg-stone-200 dark:bg-stone-800 text-xs font-semibold opacity-70 cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-stone-500 block mb-1">Phone Number</label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full p-3 rounded-xl bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-semibold"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-stone-500 block mb-1">Academic Department</label>
                    <input
                      type="text"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="w-full p-3 rounded-xl bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-semibold"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-stone-500 block mb-1">Profile Photo Image URL (Optional)</label>
                    <input
                      type="url"
                      placeholder="https://example.com/my-photo.jpg"
                      value={profilePhoto}
                      onChange={(e) => setProfilePhoto(e.target.value)}
                      className="w-full p-3 rounded-xl bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-semibold"
                    />
                    <p className="text-[11px] text-stone-400 mt-1">Leave empty to use your default initial avatar badge.</p>
                  </div>
                  <div className="flex items-center gap-3 pt-2">
                    <button type="submit" className="px-6 py-3 rounded-xl bg-rose-600 text-white font-semibold text-xs shadow-lg shadow-rose-600/25">
                      Save Changes
                    </button>
                    {(user?.profilePhoto || profilePhoto) && (
                      <button
                        type="button"
                        onClick={handleRemovePhoto}
                        className="px-4 py-3 rounded-xl bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-semibold text-xs hover:bg-rose-500/10 hover:text-rose-600 transition-colors"
                      >
                        Remove Photo
                      </button>
                    )}
                  </div>
                </form>
              </div>
            )}

            {/* MY LISTINGS TAB */}
            {activeTab === 'listings' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-stone-900 dark:text-white">My Active Listings</h2>
                  <span className="text-xs font-semibold text-stone-500">{myListings.length} active listings</span>
                </div>
                {myListings.length === 0 ? (
                  <div className="glass-card rounded-3xl p-12 text-center text-stone-400 space-y-4">
                    <ShoppingBag className="w-12 h-12 text-stone-300 mx-auto stroke-1" />
                    <p className="text-sm font-semibold text-stone-600 dark:text-stone-300">You don't have any active campus listings.</p>
                    <Link to="/sell" className="inline-block px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-amber-500 text-white text-xs font-bold shadow-md shadow-rose-600/20 hover:scale-105 transition-transform">
                      Create New Listing
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {myListings.map(p => (
                      <ProductCard key={p.id} product={p} onDelete={(prod) => setProductToDelete(prod)} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* WISHLIST TAB */}
            {activeTab === 'wishlist' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-stone-900 dark:text-white">Saved Wishlist</h2>
                {myWishlistProducts.length === 0 ? (
                  <div className="glass-card rounded-3xl p-12 text-center text-stone-400">
                    Your wishlist is currently empty!
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {myWishlistProducts.map(p => (
                      <ProductCard key={p.id} product={p} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* MESSAGES TAB */}
            {activeTab === 'messages' && (
              <div className="glass-card rounded-3xl overflow-hidden border border-stone-200/80 dark:border-stone-800 flex flex-col md:flex-row h-[calc(100dvh-110px)] sm:h-[calc(100vh-130px)] min-h-[480px] sm:min-h-[580px] w-full shadow-2xl transition-all duration-300 relative">
                
                {/* Chat list sidebar */}
                <div className={`w-full md:w-80 md:shrink-0 border-r border-stone-200 dark:border-stone-800/80 flex flex-col bg-stone-50/50 dark:bg-stone-950/40 min-h-0 ${mobileShowChatView ? 'hidden md:flex' : 'flex'}`}>
                  
                  {/* Sidebar Header */}
                  <div className="p-4 border-b border-stone-200/80 dark:border-stone-800/80 flex items-center justify-between bg-white/60 dark:bg-stone-900/60 backdrop-blur-md shrink-0">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-rose-500" />
                      <h3 className="font-bold text-sm text-stone-900 dark:text-white">Campus Chats</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-rose-500/10 text-rose-600 dark:text-rose-400">
                        {chats.length} active
                      </span>
                      <Link to="/messages" className="text-[11px] font-bold text-rose-600 dark:text-rose-400 hover:underline">
                        Full Page →
                      </Link>
                    </div>
                  </div>

                  {/* Chat List Items */}
                  <div className="p-3 space-y-2 overflow-y-auto flex-1 min-h-0 scrollbar-thin">
                    {chats.length === 0 ? (
                      <div className="py-16 text-center text-xs text-stone-400 px-4 space-y-2">
                        <MessageSquare className="w-8 h-8 text-stone-300 mx-auto stroke-1" />
                        <p className="font-medium text-stone-500">No active conversations yet.</p>
                        <p className="text-[11px]">Browse marketplace items and tap "Chat with Seller" to connect!</p>
                      </div>
                    ) : (
                      chats.map(chat => {
                        const isSelected = activeChat?.id === chat.id;
                        return (
                          <div
                            key={chat.id}
                            onClick={() => {
                              setActiveChatId(chat.id);
                              setMobileShowChatView(true);
                            }}
                            className={`p-3.5 rounded-2xl cursor-pointer transition-all flex items-center gap-3 relative ${
                              isSelected 
                                ? 'bg-gradient-to-r from-rose-600 to-rose-500 text-white shadow-lg shadow-rose-600/20' 
                                : 'hover:bg-stone-200/60 dark:hover:bg-stone-800/60 bg-white/80 dark:bg-stone-900/60 border border-stone-200/60 dark:border-stone-800/60'
                            }`}
                          >
                            <div className="relative shrink-0">
                              {chat.otherUser.avatar ? (
                                <img src={chat.otherUser.avatar} alt="" className="w-11 h-11 rounded-full object-cover border border-white/20" />
                              ) : (
                                <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center text-white font-bold text-sm">
                                  {chat.otherUser.name.charAt(0).toUpperCase()}
                                </div>
                              )}
                              {chat.otherUser.online && (
                                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white dark:border-stone-900" />
                              )}
                            </div>
                            
                            <div className="flex-1 overflow-hidden">
                              <div className="flex items-center justify-between">
                                <p className={`font-bold text-xs truncate ${isSelected ? 'text-white' : 'text-stone-900 dark:text-white'}`}>{chat.otherUser.name}</p>
                                <span className={`text-[10px] ${isSelected ? 'text-white/80' : 'text-stone-400'}`}>
                                  {new Date(chat.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                              </div>
                              
                              <p className={`text-[11px] truncate mt-0.5 ${isSelected ? 'text-white/90 font-medium' : 'text-stone-500 dark:text-stone-400'}`}>
                                {chat.lastMessage || 'Start conversation...'}
                              </p>
                            </div>

                            {chat.unreadCount > 0 && !isSelected && (
                              <span className="w-5 h-5 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0 shadow-sm">
                                {chat.unreadCount}
                              </span>
                            )}
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>

                {/* Active Chat Pane */}
                <div className={`w-full flex-1 flex flex-col justify-between bg-stone-100/60 dark:bg-stone-950/70 min-h-0 h-full ${!mobileShowChatView ? 'hidden md:flex' : 'flex'}`}>
                  {activeChat ? (
                    <>
                      {/* Clean Uncluttered Chat Header */}
                      <div className="p-3 sm:p-4 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between bg-white/80 dark:bg-stone-900/90 backdrop-blur-md shrink-0 z-10">
                        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                          {/* Back to chats button on mobile */}
                          <button
                            onClick={() => setMobileShowChatView(false)}
                            className="md:hidden p-2 rounded-xl text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors shrink-0"
                            title="Back to conversation list"
                          >
                            <ArrowLeft className="w-5 h-5 text-rose-500" />
                          </button>

                          {activeChat.otherUser.avatar ? (
                            <img src={activeChat.otherUser.avatar} alt="" className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover shrink-0" />
                          ) : (
                            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center text-white font-bold text-xs sm:text-sm shrink-0">
                              {activeChat.otherUser.name.charAt(0).toUpperCase()}
                            </div>
                          )}

                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5 truncate">
                              <p className="font-bold text-xs sm:text-sm text-stone-900 dark:text-white truncate">{activeChat.otherUser.name}</p>
                              <VerificationBadge />
                            </div>
                            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Active on Campus
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Messages Scroll Area */}
                      <div ref={chatScrollContainerRef} className="p-3.5 sm:p-5 space-y-3.5 overflow-y-auto flex-1 min-h-0 scrollbar-thin">
                        {activeMessages.length === 0 ? (
                          <div className="h-full flex flex-col items-center justify-center text-center text-xs text-stone-400 p-6 space-y-2">
                            <MessageSquare className="w-10 h-10 text-stone-300 stroke-1" />
                            <p className="font-semibold text-stone-600 dark:text-stone-300">No messages yet.</p>
                            <p>Say hi to {activeChat.otherUser.name} to discuss campus handover & price details!</p>
                          </div>
                        ) : (
                          activeMessages.map(msg => {
                            const isMe = msg.senderId === user?.id;
                            return (
                              <div
                                key={msg.id}
                                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                              >
                                <div
                                  className={`max-w-[85%] sm:max-w-md p-3 sm:p-3.5 rounded-2xl text-xs shadow-sm leading-relaxed ${
                                    isMe
                                      ? 'bg-rose-600 text-white rounded-br-xs font-medium'
                                      : 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 rounded-bl-xs border border-stone-200/80 dark:border-stone-700/70'
                                  }`}
                                >
                                  <p className="break-words">{msg.message}</p>
                                </div>
                                <span className="text-[9px] text-stone-400 mt-1 px-1">
                                  {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                              </div>
                            );
                          })
                        )}
                      </div>

                      {/* Always Visible Sticky Typing Input Bar */}
                      <form onSubmit={handleSendMessageSubmit} className="p-2.5 sm:p-4 border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 backdrop-blur-md flex items-center gap-2 shrink-0 z-20 w-full shadow-lg">
                        <input
                          type="text"
                          placeholder={`Message ${activeChat.otherUser.name}...`}
                          value={chatInput}
                          onChange={(e) => setChatInput(e.target.value)}
                          className="flex-1 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-2xl bg-stone-100 dark:bg-stone-800 text-xs sm:text-sm text-stone-900 dark:text-white placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-rose-500 font-medium"
                        />
                        <button
                          type="submit"
                          disabled={!chatInput.trim()}
                          className="p-2.5 sm:p-3 rounded-2xl bg-gradient-to-r from-rose-600 to-amber-500 text-white hover:opacity-90 disabled:opacity-50 shadow-md shadow-rose-600/20 transition-all shrink-0"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                      </form>
                    </>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-stone-400 space-y-3">
                      <MessageSquare className="w-12 h-12 text-stone-300 dark:text-stone-700 stroke-1" />
                      <p className="font-semibold text-sm text-stone-600 dark:text-stone-300">Select a conversation</p>
                      <p className="text-xs text-stone-400 max-w-xs">Choose a chat from the list to send messages, negotiate prices, or arrange campus handovers.</p>
                    </div>
                  )}
                </div>

              </div>
            )}

        </div>

        {/* Delete Confirmation Modal */}
        {productToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-md">
            <div className="w-full max-w-md glass-modal rounded-3xl p-6 space-y-4 border border-stone-200 dark:border-stone-800 shadow-2xl">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto">
                <Trash2 className="w-6 h-6" />
              </div>
              <div className="text-center space-y-2">
                <h3 className="font-bold text-lg text-stone-900 dark:text-white">Delete Campus Listing?</h3>
                <p className="text-xs text-stone-500 leading-relaxed">
                  Are you sure you want to permanently delete <strong className="text-stone-800 dark:text-stone-200">"{productToDelete.title}"</strong>? This item will be removed from the marketplace.
                </p>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setProductToDelete(null)}
                  className="flex-1 py-3 rounded-xl border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 font-semibold text-xs hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    deleteProduct(productToDelete.id);
                    setProductToDelete(null);
                  }}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800 text-white font-bold text-xs shadow-lg shadow-rose-600/25 transition-transform hover:scale-[1.02]"
                >
                  Delete Listing
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

