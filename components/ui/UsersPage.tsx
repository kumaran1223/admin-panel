import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import {
  RiSearchLine,
  RiFilterLine,
  RiArrowUpDownLine,
  RiArrowUpSLine,
  RiArrowDownSLine
} from 'react-icons/ri';
import { User } from '@/types';
import { useUI } from '@/context/UIContext';

interface UsersPageProps {
  users: User[];
}

const UsersPage: React.FC<UsersPageProps> = ({ users }) => {
  const {
    userSearchQuery,
    setUserSearchQuery,
    userFilter,
    setUserFilter,
    userSort,
    setUserSort,
    selectUser
  } = useUI();

  // Filter and sort users
  const filteredUsers = useMemo(() => {
    let result = [...users];

    // Apply search filter
    if (userSearchQuery) {
      const query = userSearchQuery.toLowerCase();
      result = result.filter(
        user =>
          user.name.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query)
      );
    }

    // Apply status filter
    if (userFilter !== 'all') {
      result = result.filter(user => user.status === userFilter);
    }

    // Apply sorting
    result.sort((a, b) => {
      const { field, direction } = userSort;

      if (field === 'name') {
        return direction === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }

      if (field === 'status') {
        return direction === 'asc'
          ? a.status.localeCompare(b.status)
          : b.status.localeCompare(a.status);
      }

      if (field === 'lastActive') {
        const dateA = new Date(a.lastActive).getTime();
        const dateB = new Date(b.lastActive).getTime();
        return direction === 'asc' ? dateA - dateB : dateB - dateA;
      }

      return 0;
    });

    return result;
  }, [users, userSearchQuery, userFilter, userSort]);

  const handleSort = (field: 'name' | 'status' | 'lastActive') => {
    if (userSort.field === field) {
      // Toggle direction if same field
      setUserSort({
        field,
        direction: userSort.direction === 'asc' ? 'desc' : 'asc'
      });
    } else {
      // Default to ascending for new field
      setUserSort({ field, direction: 'asc' });
    }
  };

  const getSortIcon = (field: 'name' | 'status' | 'lastActive') => {
    if (userSort.field !== field) {
      return <RiArrowUpDownLine className="ml-1 text-gray-400" />;
    }

    return userSort.direction === 'asc'
      ? <RiArrowUpSLine className="ml-1 text-primary-500" />
      : <RiArrowDownSLine className="ml-1 text-primary-500" />;
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

  const formatLastActive = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.abs(now.getTime() - date.getTime()) / 36e5;

    if (diffInHours < 24) {
      return `${Math.round(diffInHours)} hours ago`;
    } else {
      return format(date, 'MMM d, yyyy');
    }
  };

  return (
    <div className="bg-white dark:bg-dark-800 rounded-lg shadow-sm overflow-hidden">
      {/* Header with search and filters */}
      <div className="p-4 border-b border-gray-200 dark:border-dark-700">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Users</h2>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            {/* Search */}
            <div className="relative flex-1">
              <RiSearchLine className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                value={userSearchQuery}
                onChange={(e) => setUserSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full bg-gray-100 dark:bg-dark-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            {/* Filter dropdown */}
            <div className="relative sm:w-40">
              <select
                value={userFilter}
                onChange={(e) => setUserFilter(e.target.value as any)}
                className="pl-4 pr-10 py-2 w-full appearance-none bg-gray-100 dark:bg-dark-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="all">All Users</option>
                <option value="online">Online</option>
                <option value="away">Away</option>
                <option value="offline">Offline</option>
              </select>
              <RiFilterLine className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Users table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-dark-700">
          <thead className="bg-gray-50 dark:bg-dark-700">
            <tr>
              <th
                scope="col"
                className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center">
                  Name {getSortIcon('name')}
                </div>
              </th>
              <th scope="col" className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Email
              </th>
              <th
                scope="col"
                className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('status')}
              >
                <div className="flex items-center">
                  Status {getSortIcon('status')}
                </div>
              </th>
              <th
                scope="col"
                className="hidden sm:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('lastActive')}
              >
                <div className="flex items-center">
                  Last Active {getSortIcon('lastActive')}
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-dark-800 divide-y divide-gray-200 dark:divide-dark-700">
            {filteredUsers.map((user) => (
              <motion.tr
                key={user.id}
                whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
                className="hover:bg-gray-50 dark:hover:bg-dark-700 cursor-pointer transition-colors duration-150"
                onClick={() => selectUser(user)}
              >
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 relative">
                      <img className="h-10 w-10 rounded-full" src={user.avatar} alt="" />
                      <span className={`absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white dark:ring-dark-800 ${getStatusColor(user.status)}`}></span>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {user.name}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 md:hidden">
                        {user.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    user.status === 'online'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : user.status === 'away'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                  }`}>
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </span>
                </td>
                <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {formatLastActive(user.lastActive)}
                </td>
              </motion.tr>
            ))}
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersPage;
