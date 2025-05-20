import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  RiUserLine,
  RiMessage3Line,
  RiTicket2Line,
  RiEmotionHappyLine,
  RiArrowRightUpLine,
  RiArrowRightDownLine,
  RiInformationLine,
  RiRefreshLine
} from 'react-icons/ri';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  change: {
    value: string;
    isPositive: boolean;
  };
  delay: number;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  color,
  bgColor,
  change,
  delay
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{
        y: -5,
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        transition: { duration: 0.2 }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`bg-white dark:bg-dark-700 rounded-xl shadow-md overflow-hidden ${color}`}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-lg ${bgColor}`}>
            {icon}
          </div>
          <motion.div
            animate={{
              rotate: isHovered ? 360 : 0,
            }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="text-gray-400 dark:text-gray-500 cursor-pointer hover:text-gray-600 dark:hover:text-gray-300"
          >
            <RiInformationLine />
          </motion.div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">{title}</h3>
            <div className={`flex items-center text-xs font-medium ${
              change.isPositive
                ? 'text-green-600 dark:text-green-400'
                : 'text-red-600 dark:text-red-400'
            }`}>
              {change.isPositive ? (
                <RiArrowRightUpLine className="mr-1" />
              ) : (
                <RiArrowRightDownLine className="mr-1" />
              )}
              {change.value}
            </div>
          </div>
          <div className="mt-2 flex items-end">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
            <AnimatePresence>
              {isHovered && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="ml-2 p-1 rounded-full text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-600"
                >
                  <RiRefreshLine className="text-sm" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Progress bar at the bottom */}
      <div className="h-1 w-full bg-gray-200 dark:bg-dark-600">
        <motion.div
          className={`h-full ${bgColor.replace('bg-opacity-10', '')}`}
          initial={{ width: 0 }}
          animate={{ width: isHovered ? '100%' : '70%' }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </motion.div>
  );
};

const DashboardStats: React.FC = () => {
  const stats = [
    {
      title: 'Total Users',
      value: '1,248',
      icon: <RiUserLine className="text-2xl text-blue-500" />,
      color: 'border-b-4 border-blue-500',
      bgColor: 'bg-blue-100 dark:bg-blue-500 dark:bg-opacity-10',
      change: {
        value: '12%',
        isPositive: true
      },
      delay: 0.1
    },
    {
      title: 'Active Chats',
      value: '42',
      icon: <RiMessage3Line className="text-2xl text-green-500" />,
      color: 'border-b-4 border-green-500',
      bgColor: 'bg-green-100 dark:bg-green-500 dark:bg-opacity-10',
      change: {
        value: '8%',
        isPositive: true
      },
      delay: 0.2
    },
    {
      title: 'Support Tickets',
      value: '18',
      icon: <RiTicket2Line className="text-2xl text-yellow-500" />,
      color: 'border-b-4 border-yellow-500',
      bgColor: 'bg-yellow-100 dark:bg-yellow-500 dark:bg-opacity-10',
      change: {
        value: '5%',
        isPositive: false
      },
      delay: 0.3
    },
    {
      title: 'Customer Satisfaction',
      value: '94%',
      icon: <RiEmotionHappyLine className="text-2xl text-purple-500" />,
      color: 'border-b-4 border-purple-500',
      bgColor: 'bg-purple-100 dark:bg-purple-500 dark:bg-opacity-10',
      change: {
        value: '2%',
        isPositive: true
      },
      delay: 0.4
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          color={stat.color}
          bgColor={stat.bgColor}
          change={stat.change}
          delay={stat.delay}
        />
      ))}
    </div>
  );
};

export default DashboardStats;
