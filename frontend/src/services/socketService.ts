import { io, Socket } from 'socket.io-client';
import { Message } from '../types/chat';

const SOCKET_URL = import.meta.env.VITE_SOCKET_SERVER_URL || 'http://localhost:5001';

class SocketService {
  private socket: Socket | null = null;
  private isConnected = false;

  public connect(user?: { id: string; name: string }): Socket {
    if (this.socket && this.isConnected) {
      if (user) {
        this.socket.emit('user_online', user);
      }
      return this.socket;
    }

    this.socket = io(SOCKET_URL, {
      autoConnect: true,
      transports: ['websocket', 'polling'],
      reconnectionAttempts: 5,
    });

    this.socket.on('connect', () => {
      this.isConnected = true;
      console.log('⚡ [SocketService] Connected to Campora Realtime Server:', this.socket?.id);
      if (user) {
        this.socket?.emit('user_online', user);
      }
    });

    this.socket.on('disconnect', () => {
      this.isConnected = false;
      console.log('🔌 [SocketService] Disconnected from Socket server');
    });

    this.socket.on('connect_error', (err) => {
      console.warn('⚠️ [SocketService] Connection error (using local state fallback):', err.message);
    });

    return this.socket;
  }

  public disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
    }
  }

  public joinRoom(chatId: string) {
    if (this.socket) {
      this.socket.emit('join_room', chatId);
    }
  }

  public leaveRoom(chatId: string) {
    if (this.socket) {
      this.socket.emit('leave_room', chatId);
    }
  }

  public sendMessage(msg: Message) {
    if (this.socket) {
      this.socket.emit('send_message', msg);
    }
  }

  public sendTyping(chatId: string, senderName: string, isTyping: boolean) {
    if (this.socket) {
      this.socket.emit('typing', { chatId, senderName, isTyping });
    }
  }

  public onReceiveMessage(callback: (msg: Message) => void) {
    if (this.socket) {
      this.socket.off('receive_message');
      this.socket.on('receive_message', callback);
    }
  }

  public onUserTyping(callback: (data: { chatId: string; senderName: string; isTyping: boolean }) => void) {
    if (this.socket) {
      this.socket.off('user_typing');
      this.socket.on('user_typing', callback);
    }
  }

  public onOnlineUsersUpdate(callback: (onlineUserIds: string[]) => void) {
    if (this.socket) {
      this.socket.off('online_users_update');
      this.socket.on('online_users_update', callback);
    }
  }
}

export const socketService = new SocketService();
