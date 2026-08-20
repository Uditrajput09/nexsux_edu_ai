import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function GlobalBackButton() {
  const navigate = useNavigate();
  const location = useLocation();

  // Hide on the landing page as it's the entry point
  if (location.pathname === '/') return null;

  // Offset the button on the dashboard to clear the 256px wide LeftSidebar
  const isDashboard = location.pathname.startsWith('/dashboard');

  return (
    <div className={`fixed z-[90] ${isDashboard ? 'bottom-6 left-6 md:left-[280px]' : 'top-6 left-6 md:top-8 md:left-8'}`}>
      <button
        onClick={() => navigate(-1)}
        className="group flex items-center space-x-2 bg-white/70 backdrop-blur-md text-gray-600 px-4 py-2.5 rounded-xl shadow-sm border border-gray-200/60 hover:bg-white hover:text-gray-900 transition-all focus:outline-none focus:ring-2 focus:ring-gray-200"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-medium">Back</span>
      </button>
    </div>
  );
}

