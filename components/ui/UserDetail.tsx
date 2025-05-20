import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  RiCloseLine,
  RiMapPinLine,
  RiTimeLine,
  RiMailLine,
  RiPhoneLine,
  RiUserLine,
  RiChat1Line,
  RiHistoryLine,
  RiFileList3Line,
  RiArrowRightSLine,
  RiArrowLeftSLine,
  RiMoreLine,
  RiUserAddLine,
  RiUserUnfollowLine,
  RiAlarmLine,
  RiCalendarLine
} from 'react-icons/ri';
import { format, formatDistanceToNow } from 'date-fns';
import { User, Conversation } from '@/types';
import { useUI } from '@/context/UIContext';
import ChatWindow from './ChatWindow';

interface UserDetailProps {
  user: User;
  conversation: Conversation | undefined;
}

type TabType = 'chat' | 'info' | 'history' | 'notes';

const UserDetail: React.FC<UserDetailProps> = ({ user, conversation }) => {
  const { closePanel } = useUI();
  const [activeTab, setActiveTab] = useState<TabType>('chat');
  const [isExpanded, setIsExpanded] = useState(false);

  const userStatus = {
    online: { label: 'Online', color: 'bg-green-400', textColor: 'text-green-600 dark:text-green-400' },
    away: { label: 'Away', color: 'bg-yellow-400', textColor: 'text-yellow-600 dark:text-yellow-400' },
    offline: { label: 'Offline', color: 'bg-gray-400', textColor: 'text-gray-600 dark:text-gray-400' }
  };

  const statusInfo = userStatus[user.status];

  const tabs = [
    { id: 'chat', label: 'Chat', icon: RiChat1Line },
    { id: 'info', label: 'Info', icon: RiUserLine },
    { id: 'history', label: 'History', icon: RiHistoryLine },
    { id: 'notes', label: 'Notes', icon: RiFileList3Line }
  ];

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <motion.div
      initial={{ x: '100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '100%', opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={`fixed top-0 right-0 h-full bg-white dark:bg-dark-800 shadow-lg border-l border-gray-200 dark:border-dark-700 z-30 overflow-hidden flex flex-col
        ${isExpanded
          ? 'w-full md:w-[40rem]'
          : 'w-full sm:w-[90%] md:w-[24rem]'
        }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-dark-700 bg-white dark:bg-dark-800 shadow-sm">
        <div className="flex items-center">
          <button
            onClick={toggleExpand}
            className="p-2 mr-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors duration-200"
            aria-label={isExpanded ? "Collapse panel" : "Expand panel"}
          >
            {isExpanded ? (
              <RiArrowRightSLine className="text-lg text-gray-600 dark:text-gray-300" />
            ) : (
              <RiArrowLeftSLine className="text-lg text-gray-600 dark:text-gray-300" />
            )}
          </button>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">User Details</h2>
        </div>
        <div className="flex items-center space-x-1">
          <button
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors duration-200"
            aria-label="More options"
          >
            <RiMoreLine className="text-lg text-gray-600 dark:text-gray-300" />
          </button>
          <button
            onClick={closePanel}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors duration-200"
            aria-label="Close panel"
          >
            <RiCloseLine className="text-lg text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      </div>

      {/* User Profile Summary */}
      <div className="p-4 border-b border-gray-200 dark:border-dark-700 bg-gray-50 dark:bg-dark-700/50">
        <div className="flex items-start">
          <div className="relative flex-shrink-0">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-white dark:border-dark-600 shadow-sm"
            />
            <span className={`absolute bottom-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white dark:ring-dark-800 ${statusInfo.color}`}></span>
          </div>
          <div className="ml-4 flex-1">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">{user.name}</h3>
              <span className={`text-xs font-medium ${statusInfo.textColor}`}>
                {statusInfo.label}
              </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
            <div className="flex items-center mt-1 text-sm text-gray-500 dark:text-gray-400">
              <RiMapPinLine className="mr-1" />
              <span>{user.location}</span>
            </div>
            <div className="flex items-center mt-1 text-sm text-gray-500 dark:text-gray-400">
              <RiTimeLine className="mr-1" />
              <span>Active {formatDistanceToNow(new Date(user.lastActive), { addSuffix: true })}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 flex space-x-2">
          <button className="flex-1 flex items-center justify-center px-3 py-2 bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400 rounded-md hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors duration-200 text-sm font-medium">
            <RiUserAddLine className="mr-1.5" />
            Follow
          </button>
          <button className="flex-1 flex items-center justify-center px-3 py-2 bg-gray-100 text-gray-700 dark:bg-dark-600 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-dark-500 transition-colors duration-200 text-sm font-medium">
            <RiMailLine className="mr-1.5" />
            Email
          </button>
          <button className="flex-1 flex items-center justify-center px-3 py-2 bg-gray-100 text-gray-700 dark:bg-dark-600 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-dark-500 transition-colors duration-200 text-sm font-medium">
            <RiCalendarLine className="mr-1.5" />
            Schedule
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-dark-700 bg-white dark:bg-dark-800">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as TabType)}
            className={`flex items-center justify-center flex-1 py-3 px-4 text-sm font-medium transition-colors duration-200 ${
              activeTab === tab.id
                ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-500 dark:border-primary-400'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-700'
            }`}
          >
            <tab.icon className={`mr-1.5 ${activeTab === tab.id ? 'text-primary-500 dark:text-primary-400' : ''}`} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          {activeTab === 'chat' && conversation ? (
            <motion.div
              key="chat"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              <ChatWindow conversation={conversation} />
            </motion.div>
          ) : activeTab === 'chat' && !conversation ? (
            <motion.div
              key="no-chat"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center justify-center h-full p-6 text-center"
            >
              <div className="w-16 h-16 bg-gray-100 dark:bg-dark-700 rounded-full flex items-center justify-center mb-4">
                <RiChat1Line className="text-2xl text-gray-400 dark:text-gray-500" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No conversation yet</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Start a conversation with {user.name}</p>
              <button className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors duration-200">
                Start conversation
              </button>
            </motion.div>
          ) : activeTab === 'info' ? (
            <motion.div
              key="info"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="p-4 overflow-y-auto h-full"
            >
              <div className="space-y-6">
                {/* Contact Information */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                    Contact Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <RiMailLine className="text-lg text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm text-gray-900 dark:text-white">{user.email}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Email</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <RiPhoneLine className="text-lg text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm text-gray-900 dark:text-white">+1 (555) 123-4567</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Work</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <RiMapPinLine className="text-lg text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm text-gray-900 dark:text-white">{user.location}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Location</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {user.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs font-medium rounded-full bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300"
                      >
                        {tag}
                      </span>
                    ))}
                    <button className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600 dark:bg-dark-700 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-dark-600 transition-colors duration-200">
                      + Add Tag
                    </button>
                  </div>
                </div>

                {/* Activity */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                    Activity
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <RiTimeLine className="text-lg text-gray-400 mr-3" />
                        <div>
                          <p className="text-sm text-gray-900 dark:text-white">Last active</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {format(new Date(user.lastActive), 'MMM d, yyyy h:mm a')}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                        {formatDistanceToNow(new Date(user.lastActive), { addSuffix: true })}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <RiChat1Line className="text-lg text-gray-400 mr-3" />
                        <div>
                          <p className="text-sm text-gray-900 dark:text-white">Conversations</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {conversation ? '1 active conversation' : 'No active conversations'}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                        {conversation ? formatDistanceToNow(new Date(conversation.lastMessageTime), { addSuffix: true }) : ''}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Custom Fields */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Custom Fields
                    </h3>
                    <button className="text-xs font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300">
                      + Add Field
                    </button>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-700 rounded-md">
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Account Type</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Premium</p>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <RiMoreLine />
                      </button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-700 rounded-md">
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Customer Since</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">January 2023</p>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <RiMoreLine />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : activeTab === 'history' ? (
            <motion.div
              key="history"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="p-4 overflow-y-auto h-full"
            >
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                  Conversation History
                </h3>
                {conversation ? (
                  <div className="space-y-3">
                    {conversation.messages.slice().reverse().slice(0, 5).map((message) => (
                      <div key={message.id} className="p-3 bg-gray-50 dark:bg-dark-700 rounded-md">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                            {format(new Date(message.timestamp), 'MMM d, yyyy h:mm a')}
                          </span>
                          <span className={`text-xs font-medium ${message.isUser ? 'text-blue-500' : 'text-green-500'}`}>
                            {message.isUser ? 'User' : 'Admin'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-900 dark:text-white">{message.content}</p>
                      </div>
                    ))}
                    <button className="w-full py-2 text-sm text-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300">
                      View all messages
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500 dark:text-gray-400">No conversation history</p>
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="notes"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="p-4 overflow-y-auto h-full"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Notes
                  </h3>
                  <button className="text-xs font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300">
                    + Add Note
                  </button>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-dark-700 rounded-md">
                  <textarea
                    placeholder="Add notes about this user..."
                    className="w-full h-32 p-3 bg-white dark:bg-dark-600 rounded-md border border-gray-200 dark:border-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 text-gray-800 dark:text-gray-200 resize-none"
                  ></textarea>
                  <div className="flex justify-end mt-3">
                    <button className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors duration-200 text-sm font-medium">
                      Save Note
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default UserDetail;
