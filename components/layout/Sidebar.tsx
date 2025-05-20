import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  RiDashboardLine,
  RiMessage3Line,
  RiUserLine,
  RiSettings4Line,
  RiCloseLine,
  RiMenuLine,
  RiLogoutBoxLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiNotification3Line,
  RiQuestionLine,
  RiCustomerService2Line
} from 'react-icons/ri';
import { useUI } from '@/context/UIContext';

interface SidebarProps {
  isMobile?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isMobile = false }) => {
  const { activeTab, setActiveTab, isMobileMenuOpen, toggleMobileMenu } = useUI();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const sidebarItems = [
    {
      id: 'dashboard',
      icon: RiDashboardLine,
      label: 'Dashboard',
      badge: null
    },
    {
      id: 'users',
      icon: RiUserLine,
      label: 'Users',
      badge: '12'
    },
    {
      id: 'messages',
      icon: RiMessage3Line,
      label: 'Messages',
      badge: '5'
    },
    {
      id: 'settings',
      icon: RiSettings4Line,
      label: 'Settings',
      badge: null
    },
  ];

  const secondarySidebarItems = [
    {
      id: 'help',
      icon: RiQuestionLine,
      label: 'Help & Support',
      badge: null
    },
    {
      id: 'feedback',
      icon: RiCustomerService2Line,
      label: 'Feedback',
      badge: null
    },
  ];

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    if (isMobile && isMobileMenuOpen) {
      toggleMobileMenu();
    }
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Mobile menu toggle button
  const MobileMenuButton = () => (
    <button
      onClick={toggleMobileMenu}
      className="fixed top-3 left-3 z-50 p-2.5 rounded-md bg-white dark:bg-dark-700 shadow-lg hover:bg-gray-100 dark:hover:bg-dark-600 transition-colors duration-200 border border-gray-200 dark:border-dark-600"
      aria-label="Toggle mobile menu"
    >
      {isMobileMenuOpen ? (
        <RiCloseLine className="text-2xl text-primary-600 dark:text-primary-400" />
      ) : (
        <RiMenuLine className="text-2xl text-primary-600 dark:text-primary-400" />
      )}
    </button>
  );

  // Sidebar item with animations
  const SidebarItem = ({ item, isActive }: { item: any, isActive: boolean }) => (
    <motion.div
      whileHover={{ x: isCollapsed ? 0 : 5 }}
      className="relative w-full px-3 mb-2"
    >
      <button
        onClick={() => handleTabClick(item.id)}
        className={`flex items-center w-full px-4 py-3 rounded-lg transition-all duration-200 ${
          isActive
            ? 'bg-primary-100 text-primary-700 dark:bg-dark-600 dark:text-primary-400 shadow-sm'
            : 'hover:bg-gray-100 dark:hover:bg-dark-700 text-gray-700 dark:text-gray-300'
        }`}
        aria-label={item.label}
      >
        <item.icon className={`text-xl ${isCollapsed ? 'mx-auto' : 'mr-3'} ${
          isActive
            ? 'text-primary-600 dark:text-primary-400'
            : 'text-gray-500 dark:text-gray-400'
        }`} />

        {!isCollapsed && (
          <span className="text-sm font-medium">{item.label}</span>
        )}

        {!isCollapsed && item.badge && (
          <span className="ml-auto inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-500 rounded-full">
            {item.badge}
          </span>
        )}

        {isActive && (
          <motion.div
            layoutId="activeTab"
            className="absolute left-0 w-1 h-full bg-primary-600 dark:bg-primary-500 rounded-r-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </button>

      {/* Tooltip for collapsed state */}
      {isCollapsed && (
        <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
          {item.label}
          {item.badge && (
            <span className="ml-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-red-100 bg-red-500 rounded-full">
              {item.badge}
            </span>
          )}
        </div>
      )}
    </motion.div>
  );

  // Sidebar content with collapsible functionality
  const SidebarContent = () => (
    <div className="flex flex-col items-center w-full h-full">
      <div className="flex items-center justify-center h-16 w-full border-b border-gray-200 dark:border-dark-700">
        {!isCollapsed ? (
          <h1 className="text-xl font-bold text-primary-600 dark:text-primary-400">
            Intercom AI
          </h1>
        ) : (
          <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
            AI
          </span>
        )}
      </div>

      <div className="flex flex-col items-center w-full flex-1 py-4 overflow-y-auto">
        <div className="w-full space-y-1">
          {sidebarItems.map((item) => (
            <SidebarItem
              key={item.id}
              item={item}
              isActive={activeTab === item.id}
            />
          ))}
        </div>

        <div className="w-full mt-8 pt-4 border-t border-gray-200 dark:border-dark-700">
          <p className={`px-4 text-xs font-semibold text-gray-400 uppercase mb-2 ${isCollapsed ? 'text-center' : ''}`}>
            {!isCollapsed ? 'Support' : '•••'}
          </p>
          {secondarySidebarItems.map((item) => (
            <SidebarItem
              key={item.id}
              item={item}
              isActive={activeTab === item.id}
            />
          ))}
        </div>
      </div>

      <div className="mt-auto w-full px-3 mb-4 border-t border-gray-200 dark:border-dark-700 pt-4">
        {!isCollapsed ? (
          <button
            className="flex items-center w-full px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700 transition-all duration-200"
          >
            <RiLogoutBoxLine className="text-xl mr-3 text-gray-500 dark:text-gray-400" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        ) : (
          <button
            className="flex items-center justify-center w-full px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700 transition-all duration-200"
          >
            <RiLogoutBoxLine className="text-xl text-gray-500 dark:text-gray-400" />
          </button>
        )}

        {/* Collapse toggle button */}
        {!isMobile && (
          <button
            onClick={toggleCollapse}
            className="flex items-center justify-center w-full mt-2 px-4 py-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-700 transition-all duration-200"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <RiArrowRightSLine className="text-xl" />
            ) : (
              <>
                <RiArrowLeftSLine className="text-xl mr-2" />
                <span className="text-sm">Collapse</span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );

  // Mobile sidebar
  if (isMobile) {
    return (
      <>
        <MobileMenuButton />
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm"
              onClick={toggleMobileMenu}
            >
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{
                  duration: 0.3,
                  ease: "easeInOut",
                  type: "spring",
                  stiffness: 300,
                  damping: 30
                }}
                className="fixed top-0 left-0 z-50 w-[80%] max-w-[300px] h-full bg-white dark:bg-dark-800 shadow-xl overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <SidebarContent />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }

  // Desktop sidebar with collapsible functionality
  return (
    <motion.div
      className="hidden md:flex flex-col h-screen bg-white dark:bg-dark-800 border-r border-gray-200 dark:border-dark-700 overflow-hidden"
      animate={{
        width: isCollapsed ? '5rem' : '16rem',
        transition: { duration: 0.3, ease: "easeInOut" }
      }}
      initial={{ width: '16rem' }}
    >
      <SidebarContent />
    </motion.div>
  );
};

export default Sidebar;
