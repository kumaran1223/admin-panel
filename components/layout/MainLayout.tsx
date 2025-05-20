import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { useUI } from '@/context/UIContext';
import { AnimatePresence } from 'framer-motion';
import UserDetail from '../ui/UserDetail';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { isPanelOpen, selectedUser, isMobileMenuOpen } = useUI();

  // Find the conversation for the selected user
  const { conversations } = useUI();
  const selectedConversation = selectedUser
    ? conversations.find(conv => conv.userId === selectedUser.id)
    : undefined;

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-dark-800 overflow-hidden">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Mobile Sidebar */}
      <Sidebar isMobile />

      {/* Main Content */}
      <div className={`flex flex-col flex-1 overflow-hidden ${isMobileMenuOpen ? 'blur-sm' : ''}`}>
        <Navbar />
        <main className={`flex-1 overflow-y-auto p-4 transition-all duration-300 ${
          isPanelOpen ? 'lg:mr-96 md:mr-80' : ''
        }`}>
          {children}
        </main>

        {/* User Detail Panel - Rendered here to ensure proper stacking and responsiveness */}
        <AnimatePresence>
          {isPanelOpen && selectedUser && (
            <UserDetail user={selectedUser} conversation={selectedConversation} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MainLayout;
