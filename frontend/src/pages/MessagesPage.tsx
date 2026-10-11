import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { 
  MessageSquare, Send, Search, ArrowLeft, ShieldCheck, MapPin, 
  ExternalLink, CheckCheck, Clock, User, Sparkles, AlertCircle
} from 'lucide-react';
import { useChat } from '../context/ChatContext';
import { useAuth } from '../context/AuthContext';
import { socketService } from '../services/socketService';
import { VerificationBadge } from '../components/VerificationBadge';

export const MessagesPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const chatIdFromUrl = searchParams.get('chatId');
  const navigate = useNavigate();

  const { chats, activeChatId, setActiveChatId, getMessagesForChat, sendMessage, markChatAsRead } = useChat();
  const { user: currentUser } = useAuth();

  const [inputMessage, setInputMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileChatView, setMobileChatView] = useState(false);
  const [typingUser, setTypingUser] = useState<string | null>(null);
  const [onlineUserIds, setOnlineUserIds] = useState<string[]>([]);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Guarantee window stays at top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Initialize active chat from URL if provided
  useEffect(() => {
    if (chatIdFromUrl) {
      setActiveChatId(chatIdFromUrl);
      setMobileChatView(true);
    } else if (chats.length > 0 && !activeChatId) {
      setActiveChatId(chats[0].id);
    }
  }, [chatIdFromUrl, chats]);

  const activeChat = chats.find(c => c.id === activeChatId) || (chats.length > 0 ? chats[0] : null);
  const activeMessages = activeChat ? getMessagesForChat(activeChat.id) : [];

  // Socket connection & listeners
  useEffect(() => {
    if (currentUser) {
      socketService.connect({ id: currentUser.id, name: currentUser.name });
    }

    socketService.onOnlineUsersUpdate((onlineIds) => {
      setOnlineUserIds(onlineIds);
    });

    socketService.onUserTyping((data) => {
      if (data.chatId === activeChat?.id && data.isTyping) {
        setTypingUser(data.senderName);
        setTimeout(() => setTypingUser(null), 3000);
      } else {
        setTypingUser(null);
      }
    });

    return () => {
      // socket listener cleanup
    };
  }, [currentUser, activeChat?.id]);

  // Join room when active chat changes
  useEffect(() => {
    if (activeChat?.id) {
      socketService.joinRoom(activeChat.id);
      markChatAsRead(activeChat.id);
    }
  }, [activeChat?.id]);

  // Scroll to latest message inside internal chat container ONLY (does NOT scroll the window)
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [activeMessages.length, typingUser]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || !activeChat) return;

    const text = inputMessage.trim();
    sendMessage(activeChat.id, text);
    setInputMessage('');

    socketService.sendMessage({
      id: `msg_${Date.now()}`,
      chatId: activeChat.id,
      senderId: currentUser?.id || 'guest',
      senderName: currentUser?.name || 'Student',
      message: text,
      seen: false,
      createdAt: new Date().toISOString(),
    });
  };

  const handleQuickReply = (text: string) => {
    if (!activeChat) return;
    sendMessage(activeChat.id, text);
    socketService.sendMessage({
      id: `msg_${Date.now()}`,
      chatId: activeChat.id,
      senderId: currentUser?.id || 'guest',
      senderName: currentUser?.name || 'Student',
      message: text,
      seen: false,
      createdAt: new Date().toISOString(),
    });
  };

  const filteredChats = chats.filter(c => 
    c.otherUser.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.productTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.lastMessage?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#E8E1D5] dark:bg-black transition-colors py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Breadcrumb / Top Bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-xl bg-[#F5EFE6] dark:bg-stone-900 border border-[#CFC4B3] dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:text-rose-600 transition-colors shadow-2xs"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-white flex items-center gap-2">
                <span>Campus Messages</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 font-bold border border-rose-500/20">
                  {chats.length} {chats.length === 1 ? 'chat' : 'chats'}
                </span>
              </h1>
              <p className="text-xs text-stone-600 dark:text-stone-400">
                Safe, verified peer-to-peer chats anchored to engineering campuses across Visakhapatnam
              </p>
            </div>
          </div>

          <Link
            to="/marketplace"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline"
          >
            <span>Explore Marketplace</span> →
          </Link>
        </div>

        {/* Main Messenger Container */}
        <div className="glass-card rounded-2xl sm:rounded-3xl border border-[#CFC4B3] dark:border-stone-800 shadow-xl overflow-hidden h-[740px] max-h-[85vh] flex">
          
          {/* Left Column: Conversations List */}
          <div className={`w-full md:w-80 lg:w-96 border-r border-[#CFC4B3] dark:border-stone-800 flex flex-col bg-[#F5EFE6] dark:bg-[#0D0D0D] shrink-0 ${
            mobileChatView ? 'hidden md:flex' : 'flex'
          }`}>
            
            {/* Search input */}
            <div className="p-3.5 border-b border-[#CFC4B3] dark:border-stone-800">
              <div className="relative">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search chats or listings..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-[#DDD4C3] dark:bg-stone-800 text-xs text-stone-900 dark:text-white placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-rose-500 font-medium"
                />
              </div>
            </div>

            {/* Chat List Items */}
            <div className="flex-1 overflow-y-auto divide-y divide-stone-100 dark:divide-stone-800/60">
              {filteredChats.length === 0 ? (
                <div className="p-8 text-center text-stone-400 space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-stone-100 dark:bg-stone-800 flex items-center justify-center mx-auto text-stone-400">
                    <MessageSquare className="w-6 h-6 stroke-1" />
                  </div>
                  <p className="font-bold text-xs text-stone-700 dark:text-stone-300">No conversations found</p>
                  <p className="text-[11px] text-stone-500">
                    Browse engineering items and click "Chat Now" to start a campus exchange discussion.
                  </p>
                  <Link
                    to="/marketplace"
                    className="inline-block px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition-colors shadow-sm"
                  >
                    Browse Items
                  </Link>
                </div>
              ) : (
                filteredChats.map((c) => {
                  const isSelected = activeChat?.id === c.id;
                  const isOnline = onlineUserIds.includes(c.otherUser.id);
                  return (
                    <button
                      key={c.id}
                      onClick={() => {
                        setActiveChatId(c.id);
                        setMobileChatView(true);
                      }}
                      className={`w-full p-3.5 flex items-start gap-3 text-left transition-colors relative ${
                        isSelected 
                          ? 'bg-rose-50/70 dark:bg-rose-950/20' 
                          : 'hover:bg-stone-50 dark:hover:bg-stone-800/40'
                      }`}
                    >
                      {/* Avatar */}
                      <div className="relative shrink-0">
                        {c.otherUser.avatar ? (
                          <img
                            src={c.otherUser.avatar}
                            alt={c.otherUser.name}
                            className="w-11 h-11 rounded-xl object-cover"
                          />
                        ) : (
                          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center text-white font-black text-sm shadow-xs">
                            {c.otherUser.name.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <span 
                          className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white dark:border-stone-900 ${
                            isOnline ? 'bg-emerald-500' : 'bg-stone-400'
                          }`}
                          title={isOnline ? 'Online' : 'Offline'}
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1 mb-0.5">
                          <p className="font-bold text-xs text-stone-900 dark:text-white truncate">
                            {c.otherUser.name}
                          </p>
                          <span className="text-[10px] text-stone-400 shrink-0">
                            {new Date(c.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>

                        {c.productTitle && (
                          <p className="text-[11px] font-semibold text-rose-600 dark:text-rose-400 truncate flex items-center gap-1">
                            <span>📦 {c.productTitle}</span>
                            {c.productPrice && <span className="text-stone-500 dark:text-stone-400 font-normal">· ₹{c.productPrice}</span>}
                          </p>
                        )}

                        <p className="text-xs text-stone-500 dark:text-stone-400 truncate mt-0.5">
                          {c.lastMessage || 'Start conversation...'}
                        </p>
                      </div>

                      {/* Unread dot */}
                      {c.unreadCount > 0 && (
                        <span className="w-5 h-5 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0 self-center">
                          {c.unreadCount}
                        </span>
                      )}
                    </button>
                  );
                })
              )}
            </div>

          </div>

          {/* Right Column: Chat Window */}
          <div className={`flex-1 flex flex-col bg-white/50 dark:bg-black/60 relative ${
            !mobileChatView ? 'hidden md:flex' : 'flex'
          }`}>
            {activeChat ? (
              <>
                {/* Chat Header */}
                <div className="p-3.5 sm:p-4 border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-[#121212] flex items-center justify-between gap-3 shrink-0">
                  <div className="flex items-center gap-3 min-w-0">
                    <button
                      onClick={() => setMobileChatView(false)}
                      className="md:hidden p-1.5 rounded-lg text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-800"
                    >
                      <ArrowLeft className="w-5 h-5 text-rose-600" />
                    </button>

                    {activeChat.otherUser.avatar ? (
                      <img
                        src={activeChat.otherUser.avatar}
                        alt={activeChat.otherUser.name}
                        className="w-10 h-10 rounded-xl object-cover shrink-0"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
                        {activeChat.otherUser.name.charAt(0).toUpperCase()}
                      </div>
                    )}

                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <Link 
                          to={`/profile/${activeChat.otherUser.id}`}
                          className="font-bold text-sm text-stone-900 dark:text-white truncate hover:underline flex items-center gap-1.5"
                        >
                          <span>{activeChat.otherUser.name}</span>
                          <ExternalLink className="w-3 h-3 text-stone-400" />
                        </Link>
                        <VerificationBadge />
                      </div>
                      <p className="text-[11px] text-stone-500 dark:text-stone-400 truncate flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span>Verified Engineering Student</span>
                      </p>
                    </div>
                  </div>

                  {/* Safety Handover Reminder Pill */}
                  <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-semibold shrink-0">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>Meet at College Gate or Library</span>
                  </div>
                </div>

                {/* Product Context Banner */}
                {activeChat.productId && (
                  <div className="px-4 py-2.5 bg-rose-50/70 dark:bg-rose-950/20 border-b border-rose-200/50 dark:border-rose-900/30 flex items-center justify-between gap-3 text-xs shrink-0">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="font-bold text-stone-700 dark:text-stone-300">Listing:</span>
                      <span className="font-semibold text-rose-700 dark:text-rose-300 truncate">{activeChat.productTitle}</span>
                      {activeChat.productPrice && (
                        <span className="font-black text-stone-900 dark:text-white">₹{activeChat.productPrice.toLocaleString('en-IN')}</span>
                      )}
                    </div>
                    <Link
                      to={`/products/${activeChat.productId}`}
                      className="text-[11px] font-bold text-rose-600 dark:text-rose-400 hover:underline shrink-0 flex items-center gap-1"
                    >
                      <span>View Listing</span> →
                    </Link>
                  </div>
                )}

                {/* Messages Stream */}
                <div ref={messagesContainerRef} className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
                  {/* Safety Alert Box */}
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-200 flex items-start gap-2 max-w-xl mx-auto mb-4">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <p className="leading-relaxed">
                      Always meet during campus hours in public spots (Library, Canteen, Department Lawns). Inspect items physically before sending any payments.
                    </p>
                  </div>

                  {activeMessages.length === 0 ? (
                    <div className="text-center py-12 text-stone-400 space-y-2">
                      <MessageSquare className="w-10 h-10 mx-auto text-stone-300 dark:text-stone-700 stroke-1" />
                      <p className="font-bold text-sm text-stone-700 dark:text-stone-300">Start the conversation</p>
                      <p className="text-xs">Ask about item condition, availability, or suggest a college handover point.</p>
                    </div>
                  ) : (
                    activeMessages.map((msg) => {
                      const isMe = msg.senderId === currentUser?.id;
                      return (
                        <div
                          key={msg.id}
                          className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                        >
                          <div
                            className={`max-w-[85%] sm:max-w-md p-3.5 rounded-2xl text-xs sm:text-sm shadow-xs leading-relaxed ${
                              isMe
                                ? 'bg-rose-600 text-white rounded-br-xs font-medium'
                                : 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 rounded-bl-xs border border-stone-200 dark:border-stone-800'
                            }`}
                          >
                            <p className="break-words">{msg.message}</p>
                          </div>
                          <div className="flex items-center gap-1 text-[10px] text-stone-400 mt-1 px-1">
                            <span>
                              {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                            {isMe && <CheckCheck className="w-3.5 h-3.5 text-rose-500" />}
                          </div>
                        </div>
                      );
                    })
                  )}

                  {typingUser && (
                    <div className="flex items-center gap-2 text-xs text-stone-400 italic">
                      <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                      <span>{typingUser} is typing...</span>
                    </div>
                  )}
                </div>

                {/* Quick Reply Suggestions */}
                <div className="px-4 py-2 border-t border-stone-200/70 dark:border-stone-800/70 bg-stone-50 dark:bg-stone-900/50 flex items-center gap-2 overflow-x-auto shrink-0">
                  <span className="text-[11px] font-bold text-stone-400 shrink-0">Quick reply:</span>
                  {[
                    "Is this still available?",
                    "Can we meet at Central Library?",
                    "Are you negotiable on price?",
                    "Can I inspect before buying?"
                  ].map((quickText, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleQuickReply(quickText)}
                      className="px-2.5 py-1 rounded-lg bg-white dark:bg-stone-800 text-[11px] text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:border-rose-500 transition-colors shrink-0 shadow-2xs font-medium"
                    >
                      {quickText}
                    </button>
                  ))}
                </div>

                {/* Input Form */}
                <form
                  onSubmit={handleSend}
                  className="p-3 sm:p-4 border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 flex items-center gap-2 shrink-0"
                >
                  <input
                    type="text"
                    placeholder={`Message ${activeChat.otherUser.name}...`}
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    className="flex-1 px-4 py-2.5 sm:py-3 rounded-xl bg-stone-100 dark:bg-stone-800 text-xs sm:text-sm text-stone-900 dark:text-white placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-rose-500 font-medium"
                  />
                  <button
                    type="submit"
                    disabled={!inputMessage.trim()}
                    className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl bg-rose-600 hover:bg-rose-700 disabled:opacity-40 text-white font-bold text-xs sm:text-sm shadow-md shadow-rose-600/25 transition-all flex items-center gap-1.5 shrink-0"
                  >
                    <span>Send</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-stone-400 space-y-3">
                <MessageSquare className="w-12 h-12 text-stone-300 dark:text-stone-700 stroke-1" />
                <h3 className="font-bold text-base text-stone-700 dark:text-stone-300">No chat selected</h3>
                <p className="text-xs max-w-sm">
                  Select a conversation from the left to start messaging, arrange handover, or ask product questions.
                </p>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
