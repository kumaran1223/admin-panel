import React from 'react';
import Head from 'next/head';
import MainLayout from '@/components/layout/MainLayout';
import Dashboard from '@/components/ui/Dashboard';
import UsersPage from '@/components/ui/UsersPage';
import MessagesPage from '@/components/ui/MessagesPage';
import SettingsPage from '@/components/ui/SettingsPage';
import { users } from '@/data/users';
import { conversations } from '@/data/conversations';
import { useUI } from '@/context/UIContext';

export default function Home() {
  const { activeTab } = useUI();

  return (
    <>
      <Head>
        <title>Intercom AI Admin</title>
        <meta name="description" content="AI-enhanced admin panel inspired by Intercom" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainLayout>
        {activeTab === 'dashboard' && (
          <Dashboard users={users} conversations={conversations} />
        )}
        {activeTab === 'users' && (
          <UsersPage users={users} />
        )}
        {activeTab === 'messages' && (
          <MessagesPage users={users} conversations={conversations} />
        )}
        {activeTab === 'settings' && (
          <SettingsPage />
        )}
      </MainLayout>
    </>
  );
}
