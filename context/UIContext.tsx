import React, { createContext, useState, useContext, useMemo } from 'react';
import { User, Conversation } from '@/types';
import { conversations as initialConversations } from '@/data/conversations';

type SortField = 'name' | 'status' | 'lastActive';
type SortDirection = 'asc' | 'desc';
type UserFilter = 'all' | 'online' | 'offline' | 'away';

interface UIContextType {
  // User selection and panel
  selectedUser: User | null;
  isPanelOpen: boolean;
  selectUser: (user: User) => void;
  closePanel: () => void;

  // Navigation
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;

  // Users page
  userSearchQuery: string;
  setUserSearchQuery: (query: string) => void;
  userFilter: UserFilter;
  setUserFilter: (filter: UserFilter) => void;
  userSort: { field: SortField; direction: SortDirection };
  setUserSort: (sort: { field: SortField; direction: SortDirection }) => void;

  // Messages page
  selectedConversation: Conversation | null;
  setSelectedConversation: (conversation: Conversation | null) => void;
  isGeneratingResponse: boolean;
  setIsGeneratingResponse: (isGenerating: boolean) => void;
  conversations: Conversation[];

  // Chat
  isChatOpen: boolean;
  toggleChat: () => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // User selection and panel
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState<boolean>(false);

  // Navigation
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // Users page
  const [userSearchQuery, setUserSearchQuery] = useState<string>('');
  const [userFilter, setUserFilter] = useState<UserFilter>('all');
  const [userSort, setUserSort] = useState<{ field: SortField; direction: SortDirection }>({
    field: 'name',
    direction: 'asc'
  });

  // Messages page
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [isGeneratingResponse, setIsGeneratingResponse] = useState<boolean>(false);
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations);

  // Chat
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);

  const selectUser = (user: User) => {
    setSelectedUser(user);
    setIsPanelOpen(true);

    // Find and set the conversation for this user if it exists
    const userConversation = conversations.find(conv => conv.userId === user.id) || null;
    setSelectedConversation(userConversation);
  };

  const closePanel = () => {
    setIsPanelOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  const toggleChat = () => {
    setIsChatOpen(prev => !prev);
  };

  return (
    <UIContext.Provider
      value={{
        // User selection and panel
        selectedUser,
        isPanelOpen,
        selectUser,
        closePanel,

        // Navigation
        activeTab,
        setActiveTab,
        isMobileMenuOpen,
        toggleMobileMenu,

        // Users page
        userSearchQuery,
        setUserSearchQuery,
        userFilter,
        setUserFilter,
        userSort,
        setUserSort,

        // Messages page
        selectedConversation,
        setSelectedConversation,
        isGeneratingResponse,
        setIsGeneratingResponse,
        conversations,

        // Chat
        isChatOpen,
        toggleChat
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

export const useUI = (): UIContextType => {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
};
