import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Send, 
  MessageSquare, 
  Search, 
  Circle, 
  CheckCheck, 
  ArrowLeft, 
  User, 
  ExternalLink,
  Phone,
  ShieldCheck,
  Tag
} from 'lucide-react';
import { useChat } from '../context/ChatContext';
import { useAuth } from '../context/AuthContext';
import { socketService } from '../services/socketService';
import { useNavigate } from 'react-router-dom';

interface ChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChatDrawer: React.FC<ChatDrawerProps> = ({ isOpen, onClose }) => {
  const { chats, activeChatId, setActiveChatId, getMessagesForChat, sendMessage, markChatAsRead } = useChat();
  const { user: currentUser } = useAuth();
  const navigate = useNavigate();

  const [inputMessage, setInputMessage] = useState('');
  const [typingUser, setTypingUser] = useState<string | null>(null);
  const [onlineUserIds, setOnlineUserIds] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeChat = chats.find(c => c.id === activeChatId);
  const activeMessages = activeChatId ? getMessagesForChat(activeChatId) : [];

  // Register Socket connection and presence
  useEffect(() => {
    if (currentUser) {
      socketService.connect({ id: currentUser.id, name: currentUser.name });
    }

    socketService.onOnlineUsersUpdate((onlineIds) => {
      setOnlineUserIds(onlineIds);
    });

    socketService.onUserTyping((data) => {
      if (data.chatId === activeChatId && data.isTyping) {
        setTypingUser(data.senderName);
        setTimeout(() => setTypingUser(null), 3000);
      } else {
        setTypingUser(null);
      }
    });

    socketService.onReceiveMessage((newMsg) => {
      // Trigger context updates
    });

    return () => {
      // socket listener cleanup
    };
  }, [currentUser, activeChatId]);

  // Join Socket.IO room when active chat changes
  useEffect(() => {
    if (activeChatId) {
      socketService.joinRoom(activeChatId);
      markChatAsRead(activeChatId);
    }
  }, [activeChatId]);

  // Auto scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeMessages, typingUser]);

  if (!isOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || !activeChatId) return;

    const msgText = inputMessage.trim();
    sendMessage(activeChatId, msgText);
    setInputMessage('');

    // Emit socket event
    socketService.sendMessage({
      id: `msg_${Date.now()}`,
      chatId: activeChatId,
      senderId: currentUser?.id || 'guest_user',
      senderName: currentUser?.name || 'Campus Student',
      message: msgText,
      seen: false,
      createdAt: new Date().toISOString(),
    });
  };

  const handleTypingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value);
    if (activeChatId && currentUser) {
      socketService.sendTyping(activeChatId, currentUser.name, true);
    }
  };

  const isPeerOnline = activeChat ? onlineUserIds.includes(activeChat.otherUser.id) : false;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-sm transition-opacity animate-in fade-in duration-200 flex justify-end">
      
      {/* Backdrop overlay listener */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Drawer Container */}
      <div className="relative w-full max-w-md bg-white dark:bg-stone-900 h-full shadow-2xl flex flex-col border-l border-stone-200 dark:border-stone-800 z-10 transition-transform duration-300">
        
        {/* Top Header */}
        <div className="p-4 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between bg-stone-50 dark:bg-stone-900/90">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h2 className="font-black text-stone-900 dark:text-white text-base">
              Campus Chat & Direct Messages
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-200/60 dark:hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body: Chat List vs Active Chat */}
        {!activeChat ? (
          /* Conversation List */
          <div className="flex-1 overflow-y-auto divide-y divide-stone-100 dark:divide-stone-800">
            {chats.length === 0 ? (
              <div className="p-12 text-center text-stone-400">
                <MessageSquare className="w-10 h-10 mx-auto mb-2 opacity-50" />
                <p className="text-sm font-medium">No messages yet</p>
                <p className="text-xs mt-1">Browse marketplace listings to initiate a conversation with sellers!</p>
              </div>
            ) : (
              chats.map((c) => {
                const isOnline = onlineUserIds.includes(c.otherUser.id);
                return (
                  <button
                    key={c.id}
                    onClick={() => setActiveChatId(c.id)}
                    className={`w-full p-4 flex items-start gap-3 text-left transition-colors hover:bg-stone-50 dark:hover:bg-stone-800/60 ${
                      c.unreadCount > 0 ? 'bg-emerald-50/50 dark:bg-emerald-950/20' : ''
                    }`}
                  >
                    <div className="relative flex-shrink-0">
                      <img
                        src={c.otherUser.avatar}
                        alt={c.otherUser.name}
                        className="w-12 h-12 rounded-2xl object-cover ring-1 ring-stone-200 dark:ring-stone-700"
                      />
                      {isOnline && (
                        <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full ring-2 ring-white dark:ring-stone-900" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-stone-900 dark:text-white text-sm truncate">
                          {c.otherUser.name}
                        </span>
                        <span className="text-[10px] text-stone-400">
                          {new Date(c.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>

                      {c.productTitle && (
                        <p className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 truncate mt-0.5 flex items-center gap-1">
                          <Tag className="w-3 h-3 text-emerald-500 shrink-0" />
                          <span>{c.productTitle}</span>
                        </p>
                      )}

                      <p className="text-xs text-stone-500 dark:text-stone-400 truncate mt-1">
                        {c.lastMessage}
                      </p>
                    </div>

                    {c.unreadCount > 0 && (
                      <span className="bg-emerald-600 text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        {c.unreadCount}
                      </span>
                    )}
                  </button>
                );
              })
            )}
          </div>
        ) : (
          /* Active Thread View */
          <div className="flex-1 flex flex-col h-full overflow-hidden">
            
            {/* Peer Sub-Header */}
            <div className="px-4 py-3 bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
              <div className="flex items-center gap-3 min-w-0">
                <button
                  onClick={() => setActiveChatId('')}
                  className="p-1 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>

                <div 
                  className="relative cursor-pointer"
                  onClick={() => {
                    navigate(`/profile/${activeChat.otherUser.id}`);
                    onClose();
                  }}
                >
                  <img
                    src={activeChat.otherUser.avatar}
                    alt={activeChat.otherUser.name}
                    className="w-9 h-9 rounded-xl object-cover ring-1 ring-stone-200 dark:ring-stone-700"
                  />
                  {isPeerOnline && (
                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full ring-2 ring-white dark:ring-stone-900" />
                  )}
                </div>

                <div 
                  className="min-w-0 cursor-pointer"
                  onClick={() => {
                    navigate(`/profile/${activeChat.otherUser.id}`);
                    onClose();
                  }}
                >
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-stone-900 dark:text-white text-sm truncate">
                      {activeChat.otherUser.name}
                    </h3>
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                  </div>
                  <p className="text-[10px] text-stone-400">
                    {isPeerOnline ? (
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Active now on Campus</span>
                    ) : (
                      'Student • Visakhapatnam Network'
                    )}
                  </p>
                </div>
              </div>

              {/* View Public Profile Link */}
              <button
                onClick={() => {
                  navigate(`/profile/${activeChat.otherUser.id}`);
                  onClose();
                }}
                className="p-1.5 text-xs text-stone-500 hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center gap-1 font-semibold"
                title="View Profile"
              >
                Profile <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Attached Listing Bar */}
            {activeChat.productTitle && (
              <div className="bg-stone-100 dark:bg-stone-800/80 px-4 py-2 flex items-center justify-between border-b border-stone-200 dark:border-stone-800 text-xs">
                <div className="flex items-center gap-2 truncate">
                  <img
                    src={activeChat.productImage}
                    alt={activeChat.productTitle}
                    className="w-7 h-7 rounded-lg object-cover flex-shrink-0"
                  />
                  <span className="font-bold text-stone-800 dark:text-stone-200 truncate">
                    {activeChat.productTitle}
                  </span>
                </div>
                <span className="font-black text-emerald-600 dark:text-emerald-400 flex-shrink-0 ml-2">
                  ₹{activeChat.productPrice?.toLocaleString()}
                </span>
              </div>
            )}

            {/* Message History */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#E8E1D5] dark:bg-stone-950/40">
              {activeMessages.map((m) => {
                const isMe = m.senderId === (currentUser?.id || 'guest_user');
                return (
                  <div
                    key={m.id}
                    className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-xs leading-relaxed shadow-sm ${
                        isMe
                          ? 'bg-emerald-600 text-white rounded-br-none'
                          : 'bg-[#F5EFE6] dark:bg-stone-800 text-stone-900 dark:text-stone-100 border border-[#CFC4B3] dark:border-stone-700/80 rounded-bl-none'
                      }`}
                    >
                      {!isMe && (
                        <p className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 mb-0.5">
                          {m.senderName}
                        </p>
                      )}
                      <p>{m.message}</p>
                    </div>

                    <span className="text-[9px] text-stone-400 mt-1 px-1 flex items-center gap-1">
                      {new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      {isMe && <CheckCheck className="w-3 h-3 text-emerald-500" />}
                    </span>
                  </div>
                );
              })}

              {typingUser && (
                <div className="flex items-center gap-2 text-[11px] text-stone-400 italic font-medium px-2 py-1">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full" />
                  {typingUser} is typing...
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={handleSend} className="p-3 bg-white dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800 flex items-center gap-2">
              <input
                type="text"
                placeholder="Write a message..."
                value={inputMessage}
                onChange={handleTypingChange}
                className="flex-1 px-4 py-2.5 text-xs bg-stone-100 dark:bg-stone-800 rounded-2xl border-none focus:outline-none focus:ring-2 focus:ring-emerald-500 text-stone-900 dark:text-white placeholder-stone-400"
              />

              <button
                type="submit"
                disabled={!inputMessage.trim()}
                className="p-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-2xl transition-all shadow-sm active:scale-95 flex-shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

          </div>
        )}

      </div>
    </div>
  );
};
