import { supabase, isSupabaseConfigured } from './supabase';
import { Product } from '../types/product';
import { User } from '../types/user';
import { ChatSession, Message } from '../types/chat';

// Helper to convert snake_case DB row to Product interface
const mapDbProductToProduct = (row: any): Product => ({
  id: row.id,
  title: row.title,
  description: row.description,
  price: Number(row.price),
  category: row.category,
  condition: row.condition,
  images: Array.isArray(row.images) ? row.images : [],
  sellerId: row.seller_id,
  sellerName: row.seller_name,
  sellerAvatar: row.seller_avatar || undefined,
  sellerDepartment: row.seller_department || '',
  sellerYear: row.seller_year || undefined,
  sellerCollege: row.seller_college || '',
  sellerVerified: row.seller_verified ?? false,
  sellerPhone: row.seller_phone || undefined,
  college: row.college || '',
  department: row.department || '',
  location: row.location || '',
  latitude: row.latitude ? Number(row.latitude) : undefined,
  longitude: row.longitude ? Number(row.longitude) : undefined,
  negotiable: row.negotiable ?? false,
  deliveryAvailable: row.delivery_available ?? false,
  wishlistCount: row.wishlist_count ?? 0,
  views: row.views ?? 1,
  status: row.status || 'ACTIVE',
  tags: Array.isArray(row.tags) ? row.tags : [],
  createdAt: row.created_at || new Date().toISOString(),
});

// Helper to convert Product interface to DB snake_case row
const mapProductToDbRow = (product: Product) => ({
  id: product.id,
  title: product.title,
  description: product.description,
  price: product.price,
  category: product.category,
  condition: product.condition,
  images: product.images,
  seller_id: product.sellerId,
  seller_name: product.sellerName,
  seller_avatar: product.sellerAvatar,
  seller_department: product.sellerDepartment,
  seller_year: product.sellerYear,
  seller_college: product.sellerCollege,
  seller_verified: product.sellerVerified,
  seller_phone: product.sellerPhone,
  college: product.college,
  department: product.department,
  location: product.location,
  latitude: product.latitude,
  longitude: product.longitude,
  negotiable: product.negotiable,
  delivery_available: product.deliveryAvailable,
  wishlist_count: product.wishlistCount,
  views: product.views,
  status: product.status,
  tags: product.tags,
  created_at: product.createdAt,
});

// Helper to map DB row to User
const mapDbUserToUser = (row: any): User => ({
  id: row.id,
  name: row.name,
  collegeId: row.college_id,
  email: row.email,
  phone: row.phone || '',
  department: row.department || '',
  year: row.year || '',
  hosteller: row.hosteller ?? true,
  profilePhoto: row.profile_photo || undefined,
  idCardUrl: row.id_card_url || undefined,
  verified: row.verified ?? false,
  role: row.role || 'STUDENT',
  createdAt: row.created_at || new Date().toISOString(),
  collegeName: row.college_name || 'Chaitanya Engineering College',
});

// Helper to map User to DB row
const mapUserToDbRow = (user: User) => ({
  id: user.id,
  name: user.name,
  college_id: user.collegeId,
  email: user.email,
  phone: user.phone,
  department: user.department,
  year: user.year,
  hosteller: user.hosteller,
  profile_photo: user.profilePhoto,
  id_card_url: user.idCardUrl,
  verified: user.verified,
  role: user.role,
  college_name: user.collegeName,
  created_at: user.createdAt,
});

export const supabaseService = {
  // PRODUCTS
  async fetchProducts(): Promise<Product[]> {
    if (!isSupabaseConfigured) {
      return [];
    }
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error || !data || data.length === 0) {
        return [];
      }
      return data.map(mapDbProductToProduct);
    } catch (err) {
      console.error('Failed to fetch products from Supabase', err);
      return [];
    }
  },

  async addProduct(product: Product): Promise<Product> {
    if (!isSupabaseConfigured) {
      return product;
    }
    try {
      const dbRow = mapProductToDbRow(product);
      const { error } = await supabase.from('products').insert([dbRow]);
      if (error) {
        console.error('Error adding product to Supabase:', error.message);
      }
    } catch (err) {
      console.error('Error adding product:', err);
    }
    return product;
  },

  async deleteProduct(productId: string): Promise<boolean> {
    if (!isSupabaseConfigured) {
      return true;
    }
    try {
      const { error } = await supabase.from('products').delete().eq('id', productId);
      if (error) {
        console.error('Error deleting product from Supabase:', error.message);
        return false;
      }
      return true;
    } catch (err) {
      console.error('Error deleting product:', err);
      return false;
    }
  },

  // USERS
  async fetchUserByCollegeId(collegeId: string): Promise<User | null> {
    const cleanId = collegeId.trim().toLowerCase();

    // Default Admin User support
    if (cleanId === 'admin' || cleanId === 'admin001' || cleanId === 'fac8802' || cleanId.includes('admin')) {
      return {
        id: 'admin_user_01',
        name: 'University Admin',
        collegeId: collegeId.trim().toUpperCase(),
        email: 'admin@campora.edu',
        phone: '+91 98765 43210',
        department: 'Administration',
        year: 'Faculty Lead',
        hosteller: false,
        verified: true,
        role: 'ADMIN',
        createdAt: new Date().toISOString(),
        collegeName: 'Chaitanya Engineering College',
      };
    }

    const checkLocalUsers = (): User | null => {
      try {
        const local = localStorage.getItem('campora_registered_users');
        if (local) {
          const list: User[] = JSON.parse(local);
          const found = list.find(u => u.collegeId.trim().toLowerCase() === cleanId);
          if (found) return found;
        }
      } catch (e) {}
      return null;
    };

    if (!isSupabaseConfigured) {
      return checkLocalUsers();
    }

    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .ilike('college_id', collegeId.trim())
        .single();

      if (error || !data) {
        return checkLocalUsers();
      }
      return mapDbUserToUser(data);
    } catch (err) {
      return checkLocalUsers();
    }
  },

  async createUser(user: User): Promise<User> {
    if (!isSupabaseConfigured) {
      return user;
    }
    try {
      const dbRow = mapUserToDbRow(user);
      const { error } = await supabase.from('users').insert([dbRow]);
      if (error) {
        console.error('Error creating user in Supabase:', error.message);
      }
    } catch (err) {
      console.error('Error creating user:', err);
    }
    return user;
  },

  // REAL EMAIL OTP AUTHENTICATION
  async sendEmailOtp(email: string, password?: string): Promise<{ success: boolean; error?: string }> {
    if (!isSupabaseConfigured) {
      return { success: true };
    }
    try {
      if (password) {
        const { error: signUpErr } = await supabase.auth.signUp({
          email,
          password,
        });
        if (!signUpErr) return { success: true };
      }

      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: true
        }
      });
      if (error) {
        console.warn('Supabase Auth signInWithOtp notice:', error.message);
        return { success: false, error: error.message };
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Failed to send OTP email' };
    }
  },

  async verifyEmailOtp(email: string, token: string): Promise<{ success: boolean; error?: string }> {
    if (!isSupabaseConfigured) {
      return { success: true };
    }
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token,
        type: 'email'
      });
      if (error) {
        const fallback = await supabase.auth.verifyOtp({
          email,
          token,
          type: 'signup'
        });
        if (fallback.error) {
          return { success: false, error: error.message };
        }
      }
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Failed to verify OTP' };
    }
  },

  // CHATS & MESSAGES
  async fetchChatsForUser(userId: string): Promise<ChatSession[]> {
    if (!isSupabaseConfigured) {
      return [];
    }
    try {
      const { data, error } = await supabase
        .from('chats')
        .select('*')
        .contains('members', [userId]);

      if (error || !data || data.length === 0) {
        return [];
      }
      return data.map((row: any) => ({
        id: row.id,
        productId: row.product_id,
        productTitle: row.product_title,
        productImage: row.product_image,
        productPrice: Number(row.product_price),
        members: Array.isArray(row.members) ? row.members : [],
        otherUser: {
          id: row.other_user_id || 'peer_user',
          name: row.other_user_name || 'Campus Student',
          collegeId: row.other_user_college_id || 'Student',
          online: false,
        },
        lastMessage: row.last_message,
        unreadCount: row.unread_count ?? 0,
        updatedAt: row.updated_at,
      }));
    } catch (err) {
      return [];
    }
  },

  async fetchMessagesForChat(chatId: string): Promise<Message[]> {
    if (!isSupabaseConfigured) {
      return [];
    }
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('chat_id', chatId)
        .order('created_at', { ascending: true });

      if (error || !data) {
        return [];
      }
      return data.map((row: any) => ({
        id: row.id,
        chatId: row.chat_id,
        senderId: row.sender_id,
        senderName: row.sender_name,
        message: row.message,
        image: row.image || undefined,
        seen: row.seen ?? false,
        createdAt: row.created_at,
      }));
    } catch (err) {
      return [];
    }
  },

  async sendMessage(message: Message): Promise<Message> {
    if (!isSupabaseConfigured) {
      return message;
    }
    try {
      const dbRow = {
        id: message.id,
        chat_id: message.chatId,
        sender_id: message.senderId,
        sender_name: message.senderName,
        message: message.message,
        image: message.image,
        seen: message.seen,
        created_at: message.createdAt,
      };
      await supabase.from('messages').insert([dbRow]);
      await supabase.from('chats').update({
        last_message: message.message,
        updated_at: new Date().toISOString(),
      }).eq('id', message.chatId);
    } catch (err) {
      console.error('Error sending message to Supabase:', err);
    }
    return message;
  },

  // WISHLIST
  async fetchWishlist(userId: string): Promise<string[]> {
    if (!isSupabaseConfigured || !userId) {
      return [];
    }
    try {
      const { data, error } = await supabase
        .from('wishlist')
        .select('product_id')
        .eq('user_id', userId);

      if (error || !data) {
        return [];
      }
      return data.map((row: any) => row.product_id);
    } catch (err) {
      console.error('Error fetching wishlist from Supabase:', err);
      return [];
    }
  },

  async addToWishlist(userId: string, productId: string): Promise<boolean> {
    if (!isSupabaseConfigured || !userId) {
      return true;
    }
    try {
      const { error } = await supabase
        .from('wishlist')
        .insert([{ user_id: userId, product_id: productId }]);

      if (error) {
        console.warn('Error inserting wishlist entry to Supabase:', error.message);
      }

      const { data: prod } = await supabase
        .from('products')
        .select('wishlist_count')
        .eq('id', productId)
        .single();

      if (prod) {
        const currentCount = prod.wishlist_count || 0;
        await supabase
          .from('products')
          .update({ wishlist_count: currentCount + 1 })
          .eq('id', productId);
      }
      return true;
    } catch (err) {
      console.error('Error adding to wishlist in Supabase:', err);
      return false;
    }
  },

  async removeFromWishlist(userId: string, productId: string): Promise<boolean> {
    if (!isSupabaseConfigured || !userId) {
      return true;
    }
    try {
      const { error } = await supabase
        .from('wishlist')
        .delete()
        .eq('user_id', userId)
        .eq('product_id', productId);

      if (error) {
        console.warn('Error removing wishlist entry from Supabase:', error.message);
      }

      const { data: prod } = await supabase
        .from('products')
        .select('wishlist_count')
        .eq('id', productId)
        .single();

      if (prod && prod.wishlist_count > 0) {
        await supabase
          .from('products')
          .update({ wishlist_count: prod.wishlist_count - 1 })
          .eq('id', productId);
      }
      return true;
    } catch (err) {
      console.error('Error removing from wishlist in Supabase:', err);
      return false;
    }
  }
};
