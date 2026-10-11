export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  senderName: string;
  message: string;
  image?: string;
  seen: boolean;
  createdAt: string;
}

export interface ChatSession {
  id: string;
  productId: string;
  productTitle: string;
  productImage: string;
  productPrice: number;
  members: string[]; // User IDs
  otherUser: {
    id: string;
    name: string;
    avatar?: string;
    collegeId: string;
    online: boolean;
  };
  lastMessage?: string;
  unreadCount: number;
  updatedAt: string;
}
