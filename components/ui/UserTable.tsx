import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format, formatDistanceToNow } from 'date-fns';
import { User, Conversation, StatusType } from '@/types';
import { useUI } from '@/context/UIContext';
import {
  RiArrowUpSLine,
  RiArrowDownSLine,
  RiFilterLine,
  RiSearchLine,
  RiCheckboxCircleLine,
  RiTimeLine,
  RiEyeLine,
  RiMoreLine
} from 'react-icons/ri';

interface UserTableProps {
  users: User[];
  conversations: Conversation[];
}

type SortField = 'name' | 'status' | 'time' | 'message';
type SortDirection = 'asc' | 'desc';

const UserTable: React.FC<UserTableProps> = ({ users, conversations }) => {
  const { selectUser } = useUI();
  const [sortField, setSortField] = useState<SortField>('time');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [filterStatus, setFilterStatus] = useState<StatusType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Combine users and conversations data
  const tableData = useMemo(() => {
    return conversations.map(conversation => {
      const user = users.find(user => user.id === conversation.userId);
      return {
        ...conversation,
        user
      };
    });
  }, [users, conversations]);

  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    // First filter by status if needed
    let filtered = tableData;
    if (filterStatus !== 'all') {
      filtered = tableData.filter(item => item.status === filterStatus);
    }

    // Then filter by search query if present
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(item =>
        item.user?.name.toLowerCase().includes(query) ||
        item.user?.email.toLowerCase().includes(query) ||
        item.lastMessage.toLowerCase().includes(query)
      );
    }

    // Then sort
    return [...filtered].sort((a, b) => {
      let comparison = 0;

      switch (sortField) {
        case 'name':
          comparison = (a.user?.name || '').localeCompare(b.user?.name || '');
          break;
        case 'status':
          comparison = a.status.localeCompare(b.status);
          break;
        case 'time':
          comparison = new Date(a.lastMessageTime).getTime() - new Date(b.lastMessageTime).getTime();
          break;
        case 'message':
          comparison = a.lastMessage.localeCompare(b.lastMessage);
          break;
        default:
          comparison = 0;
      }

      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [tableData, sortField, sortDirection, filterStatus, searchQuery]);

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getStatusBadgeClass = (status: StatusType) => {
    switch (status) {
      case 'new':
        return 'status-badge status-badge-new';
      case 'active':
        return 'status-badge status-badge-active';
      case 'resolved':
        return 'status-badge status-badge-resolved';
      case 'waiting':
        return 'status-badge status-badge-waiting';
      default:
        return 'status-badge';
    }
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

  const getSortIcon = (field: SortField) => {
    if (field !== sortField) {
      return <RiMoreLine className="ml-1 text-gray-400" />;
    }
    return sortDirection === 'asc' ?
      <RiArrowUpSLine className="ml-1 text-primary-500" /> :
      <RiArrowDownSLine className="ml-1 text-primary-500" />;
  };

  return (
    <div className="bg-white dark:bg-dark-800 rounded-lg shadow-sm overflow-hidden">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-dark-700">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
              Recent Conversations
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
              Manage and respond to user conversations
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative">
              <RiSearchLine className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full sm:w-64 text-sm bg-gray-100 dark:bg-dark-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
              />
            </div>

            {/* Filter Button */}
            <div className="relative">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center px-4 py-2 text-sm bg-gray-100 dark:bg-dark-700 rounded-md hover:bg-gray-200 dark:hover:bg-dark-600 transition-colors duration-200"
              >
                <RiFilterLine className="mr-2 text-gray-500 dark:text-gray-400" />
                <span>Filter</span>
                {filterStatus !== 'all' && (
                  <span className="ml-2 inline-flex items-center justify-center h-5 w-5 rounded-full bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200 text-xs">
                    1
                  </span>
                )}
              </button>

              <AnimatePresence>
                {isFilterOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 bg-white dark:bg-dark-800 rounded-md shadow-lg border border-gray-200 dark:border-dark-700 z-10"
                  >
                    <div className="p-2">
                      <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 px-3 py-1">
                        FILTER BY STATUS
                      </div>
                      <div className="space-y-1">
                        {['all', 'new', 'active', 'waiting', 'resolved'].map((status) => (
                          <button
                            key={status}
                            onClick={() => {
                              setFilterStatus(status as StatusType | 'all');
                              setIsFilterOpen(false);
                            }}
                            className={`flex items-center w-full px-3 py-2 text-sm rounded-md ${
                              filterStatus === status
                                ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400'
                                : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-700'
                            }`}
                          >
                            {filterStatus === status && (
                              <RiCheckboxCircleLine className="mr-2 text-primary-500" />
                            )}
                            {status === 'all' ? 'All Statuses' : status.charAt(0).toUpperCase() + status.slice(1)}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-dark-700">
          <thead className="bg-gray-50 dark:bg-dark-700">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center">
                  User
                  {getSortIcon('name')}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('message')}
              >
                <div className="flex items-center">
                  Last Message
                  {getSortIcon('message')}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('status')}
              >
                <div className="flex items-center">
                  Status
                  {getSortIcon('status')}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('time')}
              >
                <div className="flex items-center">
                  Time
                  {getSortIcon('time')}
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-dark-800 divide-y divide-gray-200 dark:divide-dark-700">
            {filteredAndSortedData.length > 0 ? (
              filteredAndSortedData.map((item) => (
                <motion.tr
                  key={item.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  whileHover={{
                    backgroundColor: 'rgba(0, 0, 0, 0.05)',
                    transition: { duration: 0.1 }
                  }}
                  className="hover:bg-gray-50 dark:hover:bg-dark-700 cursor-pointer transition-colors duration-150"
                  onClick={() => item.user && selectUser(item.user)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 relative">
                        <img
                          className="h-10 w-10 rounded-full object-cover border border-gray-200 dark:border-dark-600"
                          src={item.user?.avatar}
                          alt={item.user?.name || "User avatar"}
                        />
                        <span className={`absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white dark:ring-dark-800 ${
                          item.user?.status === 'online' ? 'bg-green-400' :
                          item.user?.status === 'away' ? 'bg-yellow-400' : 'bg-gray-400'
                        }`}></span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {item.user?.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {item.user?.email}
                        </div>
                      </div>
                      {item.unreadCount > 0 && (
                        <div className="ml-2 flex-shrink-0">
                          <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 text-xs font-bold">
                            {item.unreadCount}
                          </span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 dark:text-white truncate max-w-xs">
                      {item.lastMessage}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={getStatusBadgeClass(item.status)}>
                      {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 flex items-center">
                    <RiTimeLine className="mr-1.5 text-gray-400" />
                    {formatTime(item.lastMessageTime)}
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-10 text-center text-gray-500 dark:text-gray-400">
                  <div className="flex flex-col items-center justify-center">
                    <RiSearchLine className="text-4xl mb-2 text-gray-400" />
                    <p className="text-lg font-medium">No conversations found</p>
                    <p className="text-sm">Try adjusting your search or filter criteria</p>
                    {(searchQuery || filterStatus !== 'all') && (
                      <button
                        onClick={() => {
                          setSearchQuery('');
                          setFilterStatus('all');
                        }}
                        className="mt-4 px-4 py-2 bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400 rounded-md hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors duration-200"
                      >
                        Clear filters
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {filteredAndSortedData.length > 0 && (
        <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200 dark:border-dark-700 bg-gray-50 dark:bg-dark-700">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Showing <span className="font-medium">{filteredAndSortedData.length}</span> of <span className="font-medium">{tableData.length}</span> conversations
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-dark-600 transition-colors duration-200">
              <RiEyeLine className="text-lg" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTable;
