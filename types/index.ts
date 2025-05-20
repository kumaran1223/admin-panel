export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  status: 'online' | 'offline' | 'away';
  lastActive: string;
  location: string;
  tags: string[];
}

export interface Message {
  id: string;
  userId: string;
  content: string;
  timestamp: string;
  isUser: boolean;
}

export interface Conversation {
  id: string;
  userId: string;
  status: 'new' | 'active' | 'resolved' | 'waiting';
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: Message[];
}

export type StatusType = 'new' | 'active' | 'resolved' | 'waiting';
