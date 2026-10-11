import { User } from '../types/user';
import { Product } from '../types/product';
import { ChatSession, Message } from '../types/chat';

export const MOCK_USERS: User[] = [];

export const MOCK_PRODUCTS: Product[] = [];

export const MOCK_CHATS: ChatSession[] = [];
export const MOCK_MESSAGES: Message[] = [];

export const MOCK_ADMIN_STATS = {
  totalUsers: 0,
  totalProducts: 0,
  totalSales: 0,
  activeListings: 0,
  pendingVerifications: 0,
  reportedProducts: 0,
  categoryDistribution: [] as { category: string; count: number }[],
  weeklyActivity: [] as { day: string; count: number }[],
};

export const MOCK_VERIFICATIONS: any[] = [];

export const MOCK_REPORTS: any[] = [];
