import React, { createContext, useContext, useState, useEffect } from 'react';
import { ChatSession, Message } from '../types/chat';
import { Product } from '../types/product';
import { useAuth } from './AuthContext';
import { supabaseService } from '../services/supabaseService';
import toast from 'react-hot-toast';

interface ChatContextType {
  chats: ChatSession[];
  messages: Message[];
  activeChatId: string | null;
  setActiveChatId: (id: string) => void;
  sendMessage: (chatId: string, text: string) => void;
  startOrGetChat: (product: Product) => string;
  getMessagesForChat: (chatId: string) => Message[];
  totalUnreadCount: number;
  markChatAsRead: (chatId: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  
  const [chats, setChats] = useState<ChatSession[]>(() => {
    try {
      const saved = localStorage.getItem('campora_chats');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          // Filter out legacy demo chats
          const realChats = parsed.filter(c => !c.id.startsWith('chat_demo_'));
          return realChats;
        }
      }
    } catch (e) {
      console.error('Failed to parse campora_chats:', e);
    }
    return [];
  });

  const [messages, setMessages] = useState<Message[]>(() => {
    try {
      const saved = localStorage.getItem('campora_messages');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          // Filter out legacy demo messages
          const realMessages = parsed.filter(m => !m.chatId.startsWith('chat_demo_'));
          return realMessages;
        }
      }
    } catch (e) {
      console.error('Failed to parse campora_messages:', e);
    }
    return [];
  });

  const [activeChatId, setActiveChatIdState] = useState<string | null>(() => {
    return chats[0]?.id || null;
  });

  useEffect(() => {
    if (!activeChatId && chats.length > 0) {
      setActiveChatIdState(chats[0].id);
    }
  }, [chats, activeChatId]);

  useEffect(() => {
    localStorage.setItem('campora_chats', JSON.stringify(chats));
  }, [chats]);

  useEffect(() => {
    localStorage.setItem('campora_messages', JSON.stringify(messages));
  }, [messages]);

  const setActiveChatId = (id: string) => {
    setActiveChatIdState(id);
    markChatAsRead(id);
  };

  const markChatAsRead = (chatId: string) => {
    setChats(prev => prev.map(c => c.id === chatId ? { ...c, unreadCount: 0 } : c));
    setMessages(prev => prev.map(m => m.chatId === chatId ? { ...m, seen: true } : m));
  };

  const getMessagesForChat = (chatId: string) => {
    return messages.filter(m => m.chatId === chatId);
  };

  const sendMessage = (chatId: string, text: string) => {
    if (!text.trim()) return;

    const currentUserId = user?.id || 'guest_user';
    const currentUserName = user?.name || 'Campus Student';

    const newMsg: Message = {
      id: `msg_${Date.now()}`,
      chatId,
      senderId: currentUserId,
      senderName: currentUserName,
      message: text.trim(),
      seen: true,
      createdAt: new Date().toISOString(),
    };

    setMessages(prev => [...prev, newMsg]);
    supabaseService.sendMessage(newMsg).catch(() => {});

    setChats(prev => prev.map(c => {
      if (c.id === chatId) {
        return {
          ...c,
          lastMessage: text.trim(),
          updatedAt: new Date().toISOString(),
        };
      }
      return c;
    }));
  };

  const startOrGetChat = (product: Product): string => {
    const currentUserId = user?.id || 'guest_user';
    const currentUserName = user?.name || 'Campus Student';

    const existingChat = chats.find(
      c => c.productId === product.id || (c.otherUser.id === product.sellerId && c.otherUser.id !== currentUserId)
    );

    if (existingChat) {
      setActiveChatId(existingChat.id);
      return existingChat.id;
    }

    const newChatId = `chat_${Date.now()}`;

    const newChat: ChatSession = {
      id: newChatId,
      productId: product.id,
      productTitle: product.title,
      productImage: product.images[0] || 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&q=80&w=400',
      productPrice: product.price,
      members: [currentUserId, product.sellerId],
      otherUser: {
        id: product.sellerId,
        name: product.sellerName,
        avatar: product.sellerAvatar,
        collegeId: product.sellerDepartment || 'Student',
        online: false,
      },
      lastMessage: `Hi ${product.sellerName}, I am interested in your listing: "${product.title}"`,
      unreadCount: 0,
      updatedAt: new Date().toISOString(),
    };

    const initialMsg: Message = {
      id: `msg_init_${Date.now()}`,
      chatId: newChatId,
      senderId: currentUserId,
      senderName: currentUserName,
      message: `Hi ${product.sellerName}! I saw your listing for "${product.title}" for ₹${product.price.toLocaleString()} and would like to buy/chat about it.`,
      seen: true,
      createdAt: new Date().toISOString(),
    };

    setChats(prev => [newChat, ...prev]);
    setMessages(prev => [...prev, initialMsg]);
    setActiveChatId(newChatId);

    toast.success(`Chat started with ${product.sellerName}!`);
    return newChatId;
  };

  const totalUnreadCount = chats.reduce((acc, c) => acc + c.unreadCount, 0);

  return (
    <ChatContext.Provider
      value={{
        chats,
        messages,
        activeChatId,
        setActiveChatId,
        sendMessage,
        startOrGetChat,
        getMessagesForChat,
        totalUnreadCount,
        markChatAsRead,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
