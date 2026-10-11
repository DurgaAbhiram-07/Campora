import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

app.use(cors());
app.use(express.json());

// In-memory store for active users & online statuses
const activeUsers = new Map(); // socketId -> user details
const onlineUserIds = new Set(); // userId set

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    app: 'Campora Realtime Server',
    timestamp: new Date().toISOString(),
    onlineUsers: Array.from(onlineUserIds),
  });
});

io.on('connection', (socket) => {
  console.log(`[Socket.io] Client connected: ${socket.id}`);

  // User registers presence
  socket.on('user_online', (userData) => {
    if (!userData || !userData.id) return;
    activeUsers.set(socket.id, userData);
    onlineUserIds.add(userData.id);

    // Broadcast updated online presence
    io.emit('online_users_update', Array.from(onlineUserIds));
    console.log(`[Presence] User online: ${userData.name} (${userData.id})`);
  });

  // Join a specific chat room (e.g. for listing/peer conversation)
  socket.on('join_room', (chatId) => {
    socket.join(chatId);
    console.log(`[Socket.io] Socket ${socket.id} joined room: ${chatId}`);
  });

  // Leave room
  socket.on('leave_room', (chatId) => {
    socket.leave(chatId);
    console.log(`[Socket.io] Socket ${socket.id} left room: ${chatId}`);
  });

  // Send message event
  socket.on('send_message', (data) => {
    console.log(`[Message] Room ${data.chatId}: ${data.senderName} -> "${data.message}"`);
    // Broadcast message to everyone in the room (including sender or target client)
    io.to(data.chatId).emit('receive_message', data);
  });

  // Typing status event
  socket.on('typing', (data) => {
    socket.to(data.chatId).emit('user_typing', data);
  });

  // Disconnect
  socket.on('disconnect', () => {
    const user = activeUsers.get(socket.id);
    if (user) {
      activeUsers.delete(socket.id);
      
      // Check if user has other open sockets before removing from online set
      const stillActive = Array.from(activeUsers.values()).some(u => u.id === user.id);
      if (!stillActive) {
        onlineUserIds.delete(user.id);
        io.emit('online_users_update', Array.from(onlineUserIds));
      }
      console.log(`[Presence] User disconnected: ${user.name}`);
    } else {
      console.log(`[Socket.io] Client disconnected: ${socket.id}`);
    }
  });
});

const PORT = process.env.PORT || 5001;
httpServer.listen(PORT, () => {
  console.log(`🚀 Campora Realtime Socket.IO server running on http://localhost:${PORT}`);
});
