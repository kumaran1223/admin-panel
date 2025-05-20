import React, { useState, useRef, useEffect } from 'react';
import {
  RiSearchLine,
  RiNotification3Line,
  RiArrowDownSLine,
  RiMoonLine,
  RiSunLine,
  RiCloseLine,
  RiCheckLine,
  RiUser3Line,
  RiSettings4Line,
  RiLogoutBoxLine,
  RiMailLine,
  RiChat1Line,
  RiAlertLine,
  RiTimeLine,
  RiFilterLine,
  RiCommandLine
} from 'react-icons/ri';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'message' | 'alert' | 'update';
}

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'New Message',
      message: 'John Doe sent you a message',
      time: '5 min ago',
      read: false,
      type: 'message'
    },
    {
      id: '2',
      title: 'System Update',
      message: 'System has been updated to version 2.0',
      time: '1 hour ago',
      read: false,
      type: 'update'
    },
    {
      id: '3',
      title: 'Alert',
      message: 'Server load is high',
      time: '2 hours ago',
      read: true,
      type: 'alert'
    },
    {
      id: '4',
      title: 'New User',
      message: 'Jane Smith just signed up',
      time: 'Yesterday',
      read: true,
      type: 'update'
    }
  ]);

  const profileRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
    if (isNotificationsOpen) setIsNotificationsOpen(false);
  };

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
    if (isProfileOpen) setIsProfileOpen(false);
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      read: true
    })));
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const unreadCount = notifications.filter(notification => !notification.read).length;

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Get notification icon based on type
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'message':
        return <RiChat1Line className="text-blue-500" />;
      case 'alert':
        return <RiAlertLine className="text-red-500" />;
      case 'update':
        return <RiCheckLine className="text-green-500" />;
      default:
        return <RiNotification3Line className="text-gray-500" />;
    }
  };

  return (
    <div className="flex items-center justify-between w-full h-16 px-2 sm:px-4 bg-white dark:bg-dark-800 border-b border-gray-200 dark:border-dark-700 shadow-sm">
      {/* Search Bar */}
      <div
        ref={searchRef}
        className={`relative flex-1 max-w-xl transition-all duration-300 ml-10 md:ml-0 ${
          isSearchFocused ? 'max-w-2xl' : 'max-w-md'
        }`}
      >
        <div className="relative">
          <RiSearchLine className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
            isSearchFocused ? 'text-primary-500 dark:text-primary-400' : 'text-gray-400'
          }`} />

          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            className={`w-full py-2 pl-10 pr-10 text-sm rounded-md transition-all duration-300 ${
              isSearchFocused
                ? 'bg-white dark:bg-dark-700 shadow-md ring-2 ring-primary-500 dark:ring-primary-400'
                : 'bg-gray-100 dark:bg-dark-700 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400'
            }`}
          />

          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <RiCloseLine />
            </button>
          )}
        </div>

        {isSearchFocused && (
          <div className="absolute left-0 right-0 mt-1 bg-white dark:bg-dark-800 rounded-md shadow-lg border border-gray-200 dark:border-dark-700 z-30">
            <div className="p-2 text-xs text-gray-500 dark:text-gray-400 flex items-center">
              <RiCommandLine className="mr-1" />
              <span className="hidden sm:inline">Press <kbd className="px-1 py-0.5 bg-gray-100 dark:bg-dark-700 rounded">↵</kbd> to search</span>
              <span className="sm:hidden">Search</span>
            </div>
            {searchQuery && (
              <div className="p-2 border-t border-gray-200 dark:border-dark-700">
                <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">QUICK ACTIONS</div>
                <div className="flex flex-col space-y-1">
                  <button className="flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-700 rounded">
                    <RiUser3Line className="mr-2 text-gray-500" />
                    <span className="truncate">Search users for "{searchQuery}"</span>
                  </button>
                  <button className="flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-700 rounded">
                    <RiChat1Line className="mr-2 text-gray-500" />
                    <span className="truncate">Search messages for "{searchQuery}"</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right Side Icons */}
      <div className="flex items-center space-x-2 md:space-x-4">
        {/* Theme Toggle */}
        <motion.button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors duration-200"
          whileTap={{ scale: 0.9 }}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          <motion.div
            initial={false}
            animate={{ rotate: theme === 'dark' ? 180 : 0 }}
            transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
          >
            {theme === 'dark' ? (
              <RiSunLine className="text-xl text-yellow-400" />
            ) : (
              <RiMoonLine className="text-xl text-gray-600" />
            )}
          </motion.div>
        </motion.button>

        {/* Notifications */}
        <div className="relative" ref={notificationsRef}>
          <motion.button
            onClick={toggleNotifications}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors duration-200 relative"
            whileTap={{ scale: 0.9 }}
            aria-label="Notifications"
          >
            <RiNotification3Line className="text-xl text-gray-600 dark:text-gray-300" />
            {unreadCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 bg-red-500 text-white text-xs font-bold rounded-full"
              >
                {unreadCount}
              </motion.span>
            )}
          </motion.button>

          <AnimatePresence>
            {isNotificationsOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-[calc(100vw-20px)] sm:w-80 bg-white dark:bg-dark-800 rounded-md shadow-lg border border-gray-200 dark:border-dark-700 z-30 overflow-hidden"
              >
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-dark-700">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Notifications</h3>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-xs text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>

                <div className="max-h-80 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        onClick={() => markAsRead(notification.id)}
                        className={`p-4 border-b border-gray-200 dark:border-dark-700 hover:bg-gray-50 dark:hover:bg-dark-700 cursor-pointer transition-colors duration-150 ${
                          !notification.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                        }`}
                      >
                        <div className="flex items-start">
                          <div className="flex-shrink-0 mr-3 mt-1">
                            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-dark-600 flex items-center justify-center">
                              {getNotificationIcon(notification.type)}
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium text-gray-900 dark:text-white">
                                {notification.title}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                                <RiTimeLine className="mr-1" />
                                {notification.time}
                              </p>
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                              {notification.message}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                      No notifications
                    </div>
                  )}
                </div>

                <div className="p-2 border-t border-gray-200 dark:border-dark-700">
                  <button className="w-full py-2 text-sm text-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300">
                    View all notifications
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={toggleProfile}
            className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors duration-200"
            aria-label="User menu"
          >
            <div className="relative">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Profile"
                className="w-8 h-8 rounded-full border-2 border-white dark:border-dark-700 shadow-sm"
              />
              <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-400 border-2 border-white dark:border-dark-700"></span>
            </div>
            <span className="hidden md:block text-sm font-medium text-gray-700 dark:text-gray-200">
              Admin User
            </span>
            <motion.span
              animate={{ rotate: isProfileOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <RiArrowDownSLine className="text-gray-600 dark:text-gray-300" />
            </motion.span>
          </button>

          <AnimatePresence>
            {isProfileOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-[calc(100vw-20px)] sm:w-56 py-2 bg-white dark:bg-dark-800 rounded-md shadow-lg border border-gray-200 dark:border-dark-700 z-30"
              >
                <div className="px-4 py-3 border-b border-gray-200 dark:border-dark-700">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Admin User</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">admin@example.com</p>
                </div>

                <div className="py-1">
                  <a
                    href="#"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-700"
                  >
                    <RiUser3Line className="mr-3 text-gray-500 dark:text-gray-400" />
                    Your Profile
                  </a>
                  <a
                    href="#"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-700"
                  >
                    <RiSettings4Line className="mr-3 text-gray-500 dark:text-gray-400" />
                    Settings
                  </a>
                </div>

                <div className="py-1 border-t border-gray-200 dark:border-dark-700">
                  <a
                    href="#"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-700"
                  >
                    <RiLogoutBoxLine className="mr-3 text-gray-500 dark:text-gray-400" />
                    Sign out
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
