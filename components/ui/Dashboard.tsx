import React from 'react';
import { motion } from 'framer-motion';
import { User, Conversation } from '@/types';
import UserTable from './UserTable';
import DashboardStats from './DashboardStats';
import { useUI } from '@/context/UIContext';

interface DashboardProps {
  users: User[];
  conversations: Conversation[];
}

const Dashboard: React.FC<DashboardProps> = ({ users, conversations }) => {
  // Calculate dashboard stats
  const activeChats = conversations.filter(conv => conv.status === 'active').length;
  const newTickets = conversations.filter(conv => conv.status === 'new').length;
  const totalUsers = users.length;

  return (
    <div className="relative space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Dashboard</h1>

        {/* Stats Cards */}
        <DashboardStats />

        {/* Recent Conversations */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Conversations</h2>
          <UserTable users={users} conversations={conversations} />
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
