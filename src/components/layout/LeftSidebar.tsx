import React from 'react';
import { Plus, MessageSquare, Calendar, HeadphonesIcon, LogOut } from 'lucide-react';
import { User } from '../../types.js';

interface LeftSidebarProps {
  user: User;
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  logout: () => void;
}

export default function LeftSidebar({ user, currentTab, setCurrentTab, logout }: LeftSidebarProps) {
  return (
    <aside className="w-64 bg-white border-r border-gray-100 flex flex-col hidden md:flex">
      <div className="p-6">
        <h1 className="text-xl font-bold text-gray-900 tracking-tight flex items-center">
          <span className="w-8 h-8 bg-blue-600 rounded-lg mr-2 inline-flex items-center justify-center shrink-0">
            <span className="text-white text-sm font-black">N</span>
          </span>
          Nexus Edu AI
        </h1>
      </div>
      
      <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
        <button onClick={() => setCurrentTab('chat')} className="w-full flex items-center space-x-3 px-4 py-3 bg-blue-50 text-blue-700 rounded-xl font-medium transition-colors">
          <Plus className="w-5 h-5" />
          <span>New Conversation</span>
        </button>
        
        <div className="pt-4 pb-2">
          <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Main Menu</p>
        </div>
        
        <NavItem icon={<MessageSquare />} label="Conversations" active={currentTab === 'chat'} onClick={() => setCurrentTab('chat')} />
        <NavItem icon={<Calendar />} label="Attendance" active={currentTab === 'attendance'} onClick={() => setCurrentTab('attendance')} />
        <NavItem icon={<HeadphonesIcon />} label="Human Support" />
      </nav>

      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center space-x-3 mb-4 px-2">
          <img src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}`} alt={user.name} className="w-10 h-10 rounded-full" />
          <div>
            <p className="text-sm font-bold text-gray-900">{user.name}</p>
            <p className="text-xs text-gray-500 capitalize">{user.role}</p>
          </div>
        </div>
        <button 
          onClick={logout}
          className="w-full flex items-center space-x-3 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors text-sm font-medium"
        >
          <LogOut className="w-4 h-4" />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  );
}

function NavItem({ icon, label, active = false, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick?: () => void }) {
  return (
    <button onClick={onClick} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors font-medium text-sm
      ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}>
      <span className={active ? 'text-blue-600' : 'text-gray-400'}>
        {React.cloneElement(icon as React.ReactElement, { className: 'w-5 h-5' })}
      </span>
      <span>{label}</span>
    </button>
  );
}
