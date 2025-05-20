import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  RiUser3Line, 
  RiNotification3Line, 
  RiLockLine, 
  RiPaletteLine,
  RiGlobalLine,
  RiCheckLine
} from 'react-icons/ri';
import { useTheme } from '@/context/ThemeContext';

const SettingsPage: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('appearance');
  
  const tabs = [
    { id: 'appearance', label: 'Appearance', icon: RiPaletteLine },
    { id: 'account', label: 'Account', icon: RiUser3Line },
    { id: 'notifications', label: 'Notifications', icon: RiNotification3Line },
    { id: 'security', label: 'Security', icon: RiLockLine },
    { id: 'language', label: 'Language', icon: RiGlobalLine },
  ];
  
  return (
    <div className="bg-white dark:bg-dark-800 rounded-lg shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-dark-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Settings</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Manage your account settings and preferences
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row">
        {/* Tabs */}
        <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-gray-200 dark:border-dark-700">
          <nav className="p-4">
            <ul>
              {tabs.map((tab) => (
                <li key={tab.id} className="mb-1">
                  <button
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors duration-200 ${
                      activeTab === tab.id
                        ? 'bg-primary-100 text-primary-700 dark:bg-dark-600 dark:text-primary-400'
                        : 'hover:bg-gray-100 dark:hover:bg-dark-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <tab.icon className="text-xl mr-3" />
                    <span className="text-sm font-medium">{tab.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        
        {/* Content */}
        <div className="flex-1 p-6">
          {activeTab === 'appearance' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Appearance</h3>
              
              <div className="space-y-6">
                {/* Theme */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Theme</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div
                      onClick={() => theme === 'dark' && toggleTheme()}
                      className={`relative cursor-pointer rounded-lg border ${
                        theme === 'light'
                          ? 'border-primary-500 ring-2 ring-primary-500 ring-opacity-50'
                          : 'border-gray-200 dark:border-dark-700'
                      } p-4`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-white border border-gray-200 flex items-center justify-center">
                            <RiPaletteLine className="text-gray-700" />
                          </div>
                          <div className="ml-3">
                            <h5 className="text-sm font-medium text-gray-900 dark:text-white">Light</h5>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Light background with dark text</p>
                          </div>
                        </div>
                        {theme === 'light' && (
                          <div className="h-5 w-5 rounded-full bg-primary-500 flex items-center justify-center">
                            <RiCheckLine className="text-white text-sm" />
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div
                      onClick={() => theme === 'light' && toggleTheme()}
                      className={`relative cursor-pointer rounded-lg border ${
                        theme === 'dark'
                          ? 'border-primary-500 ring-2 ring-primary-500 ring-opacity-50'
                          : 'border-gray-200 dark:border-dark-700'
                      } p-4`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center">
                            <RiPaletteLine className="text-gray-200" />
                          </div>
                          <div className="ml-3">
                            <h5 className="text-sm font-medium text-gray-900 dark:text-white">Dark</h5>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Dark background with light text</p>
                          </div>
                        </div>
                        {theme === 'dark' && (
                          <div className="h-5 w-5 rounded-full bg-primary-500 flex items-center justify-center">
                            <RiCheckLine className="text-white text-sm" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Density */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Density</h4>
                  <div className="flex items-center space-x-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="density"
                        defaultChecked
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Comfortable</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="density"
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Compact</span>
                    </label>
                  </div>
                </div>
                
                {/* Font Size */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Font Size</h4>
                  <div className="flex items-center space-x-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="fontSize"
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Small</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="fontSize"
                        defaultChecked
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Medium</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="fontSize"
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Large</span>
                    </label>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          {activeTab !== 'appearance' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-center h-64"
            >
              <div className="text-center">
                <div className="mx-auto h-12 w-12 text-gray-400">
                  {tabs.find(tab => tab.id === activeTab)?.icon({ className: "h-full w-full" })}
                </div>
                <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                  {tabs.find(tab => tab.id === activeTab)?.label} Settings
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  This section is under development
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
