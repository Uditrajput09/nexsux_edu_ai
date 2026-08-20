import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext.js';
import ChatInterface from '../components/ChatInterface.js';
import AttendanceDashboard from '../components/AttendanceDashboard.js';
import LeftSidebar from '../components/layout/LeftSidebar.js';
import Header from '../components/layout/Header.js';
import RightContextPanel from '../components/layout/RightContextPanel.js';

export default function AppDashboard() {
  const { user, logout } = useAuth();
  const [currentTab, setCurrentTab] = useState('chat');
  
  if (!user) return null;

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <LeftSidebar 
        user={user}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        logout={logout}
      />

      <main className="flex-1 flex flex-col h-full bg-white relative">
        <Header user={user} />

        {/* Main Content Area */}
        <div className="flex-1 overflow-hidden">
           {currentTab === 'chat' && <ChatInterface user={user} />}
           {currentTab === 'attendance' && <AttendanceDashboard user={user} />}
        </div>
      </main>

      <RightContextPanel user={user} />
    </div>
  );
}
