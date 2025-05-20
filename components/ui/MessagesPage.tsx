import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format, formatDistanceToNow } from 'date-fns';
import {
  RiSearchLine,
  RiSendPlaneFill,
  RiAttachment2,
  RiEmotionLine,
  RiRobot2Line,
  RiCloseLine,
  RiMessage3Line
} from 'react-icons/ri';
import { User, Conversation, Message } from '@/types';
import { useUI } from '@/context/UIContext';

interface MessagesPageProps {
  users: User[];
  conversations: Conversation[];
}

const MessagesPage: React.FC<MessagesPageProps> = ({ users, conversations }) => {
  const {
    selectedConversation,
    setSelectedConversation,
    isGeneratingResponse,
    setIsGeneratingResponse
  } = useUI();

  const [searchQuery, setSearchQuery] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [suggestedReplies, setSuggestedReplies] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Filter conversations based on search query
  const filteredConversations = conversations.filter(conversation => {
    const user = users.find(u => u.id === conversation.userId);
    if (!user) return false;

    const query = searchQuery.toLowerCase();
    return (
      user.name.toLowerCase().includes(query) ||
      conversation.lastMessage.toLowerCase().includes(query)
    );
  });

  // Set messages when conversation changes
  useEffect(() => {
    if (selectedConversation) {
      setMessages(selectedConversation.messages);

      // Generate suggested replies
      const suggestedResponses = [
        "I understand your concern. Let me help you with that.",
        "Thanks for reaching out! I'd be happy to assist you.",
        "I'll look into this issue right away.",
        "Could you provide more details about your problem?",
      ];
      setSuggestedReplies(suggestedResponses);
    }
  }, [selectedConversation]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
  };

  const handleSendMessage = (e: React.FormEvent | string) => {
    if (e instanceof Object) e.preventDefault();

    const messageContent = typeof e === 'string' ? e : newMessage;
    if (!messageContent.trim() || !selectedConversation) return;

    const newMsg: Message = {
      id: `new-${Date.now()}`,
      userId: selectedConversation.userId,
      content: messageContent,
      timestamp: new Date().toISOString(),
      isUser: false,
    };

    setMessages(prev => [...prev, newMsg]);
    setNewMessage('');

    // Simulate AI response
    setIsGeneratingResponse(true);
    setTimeout(() => {
      const aiResponse: Message = {
        id: `ai-${Date.now()}`,
        userId: selectedConversation.userId,
        content: "I'm analyzing your request. How else can I assist you today?",
        timestamp: new Date().toISOString(),
        isUser: true,
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsGeneratingResponse(false);

      // Generate new suggested replies
      const newSuggestions = [
        "Would you like me to explain further?",
        "Is there anything else you need help with?",
        "Let me know if you have any other questions.",
        "I can provide more detailed information if needed.",
      ];
      setSuggestedReplies(newSuggestions);
    }, 1500);
  };

  const formatTime = (timeString: string) => {
    const date = new Date(timeString);
    const now = new Date();
    const diffInHours = Math.abs(now.getTime() - date.getTime()) / 36e5;

    if (diffInHours < 24) {
      return formatDistanceToNow(date, { addSuffix: true });
    } else {
      return format(date, 'MMM d, h:mm a');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-500';
      case 'away':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-400';
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'resolved':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
      case 'waiting':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default:
        return '';
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-full bg-white dark:bg-dark-800 rounded-lg shadow-sm overflow-hidden">
      {/* Conversations List (Left Panel) */}
      <div className={`w-full md:w-80 border-r border-gray-200 dark:border-dark-700 ${
        selectedConversation ? 'hidden md:block' : ''
      }`}>
        <div className="p-4 border-b border-gray-200 dark:border-dark-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Messages</h2>
          <div className="relative">
            <RiSearchLine className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full bg-gray-100 dark:bg-dark-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        <div className="overflow-y-auto h-[calc(100%-5rem)]">
          {filteredConversations.length > 0 ? (
            filteredConversations.map(conversation => {
              const user = users.find(u => u.id === conversation.userId);
              if (!user) return null;

              return (
                <div
                  key={conversation.id}
                  className={`p-4 border-b border-gray-200 dark:border-dark-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors duration-150 ${
                    selectedConversation?.id === conversation.id ? 'bg-gray-50 dark:bg-dark-700' : ''
                  }`}
                  onClick={() => handleSelectConversation(conversation)}
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 relative">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="h-10 w-10 rounded-full"
                      />
                      <span className={`absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white dark:ring-dark-800 ${getStatusColor(user.status)}`}></span>
                    </div>
                    <div className="ml-3 flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {user.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {formatTime(conversation.lastMessageTime)}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                          {conversation.lastMessage}
                        </p>
                        {conversation.unreadCount > 0 && (
                          <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200 text-xs font-medium">
                            {conversation.unreadCount}
                          </span>
                        )}
                      </div>
                      <div className="mt-1">
                        <span className={`px-2 py-0.5 text-xs rounded-full ${getStatusBadgeClass(conversation.status)}`}>
                          {conversation.status.charAt(0).toUpperCase() + conversation.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              No conversations found
            </div>
          )}
        </div>
      </div>

      {/* Chat Window (Right Panel) */}
      {selectedConversation ? (
        <div className="flex-1 flex flex-col h-full">
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-200 dark:border-dark-700 flex items-center justify-between">
            {/* Back button (mobile only) */}
            <button
              className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-700 mr-2"
              onClick={() => setSelectedConversation(null)}
            >
              <RiCloseLine className="text-xl text-gray-600 dark:text-gray-300" />
            </button>

            {/* User info */}
            {(() => {
              const user = users.find(u => u.id === selectedConversation.userId);
              if (!user) return null;

              return (
                <div className="flex items-center">
                  <div className="relative">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="h-10 w-10 rounded-full"
                    />
                    <span className={`absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white dark:ring-dark-800 ${getStatusColor(user.status)}`}></span>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </p>
                  </div>
                </div>
              );
            })()}

            <div>
              <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadgeClass(selectedConversation.status)}`}>
                {selectedConversation.status.charAt(0).toUpperCase() + selectedConversation.status.slice(1)}
              </span>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto">
            <AnimatePresence initial={false}>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex mb-4 ${message.isUser ? 'justify-start' : 'justify-end'}`}
                >
                  {message.isUser && (
                    <div className="flex-shrink-0 mr-2">
                      <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                        <RiRobot2Line className="text-gray-600 dark:text-gray-300" />
                      </div>
                    </div>
                  )}
                  <div
                    className={`max-w-xs md:max-w-md rounded-lg px-4 py-2 ${
                      message.isUser
                        ? 'bg-gray-100 dark:bg-dark-700 text-gray-800 dark:text-gray-200'
                        : 'bg-primary-500 text-white'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs mt-1 opacity-70">
                      {format(new Date(message.timestamp), 'h:mm a')}
                    </p>
                  </div>
                </motion.div>
              ))}
              {isGeneratingResponse && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex mb-4 justify-start"
                >
                  <div className="flex-shrink-0 mr-2">
                    <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                      <RiRobot2Line className="text-gray-600 dark:text-gray-300" />
                    </div>
                  </div>
                  <div className="bg-gray-100 dark:bg-dark-700 rounded-lg px-4 py-2 text-gray-800 dark:text-gray-200">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </AnimatePresence>
          </div>

          {/* AI Suggested Replies */}
          {suggestedReplies.length > 0 && (
            <div className="px-4 py-2 border-t border-gray-200 dark:border-dark-700 flex flex-wrap gap-2">
              {suggestedReplies.map((reply, index) => (
                <button
                  key={index}
                  onClick={() => handleSendMessage(reply)}
                  className="text-xs bg-gray-100 hover:bg-gray-200 dark:bg-dark-700 dark:hover:bg-dark-600 text-gray-800 dark:text-gray-200 rounded-full px-3 py-1 transition-colors duration-200"
                >
                  {reply}
                </button>
              ))}
            </div>
          )}

          {/* Message Input */}
          <div className="p-4 border-t border-gray-200 dark:border-dark-700">
            <form onSubmit={handleSendMessage} className="flex items-center">
              <button
                type="button"
                className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-700"
              >
                <RiAttachment2 className="text-xl" />
              </button>
              <button
                type="button"
                className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-700"
              >
                <RiEmotionLine className="text-xl" />
              </button>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 mx-2 py-2 px-4 bg-gray-100 dark:bg-dark-700 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 text-gray-800 dark:text-gray-200"
              />
              <button
                type="submit"
                className="p-2 rounded-full bg-primary-500 text-white hover:bg-primary-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={newMessage.trim() === '' || isGeneratingResponse}
              >
                <RiSendPlaneFill className="text-xl" />
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="text-center">
            <RiMessage3Line className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No conversation selected</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Select a conversation from the list to start chatting</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessagesPage;
