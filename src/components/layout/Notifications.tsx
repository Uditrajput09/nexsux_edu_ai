import React, { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { User } from '../../types.js';

interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
}

interface NotificationsProps {
  user: User;
}

export default function Notifications({ user }: NotificationsProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('/api/notifications', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setNotifications(data.notifications);
        }
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
      } finally {
        setLoading(false);
      }
    };

    // Initial fetch
    fetchNotifications();

    // Poll every 30 seconds
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, [user]);

  if (loading && notifications.length === 0) {
    return (
      <div className="flex items-center justify-center p-6 bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="animate-pulse flex space-x-2 items-center text-gray-400">
          <Bell className="w-4 h-4" />
          <span className="text-sm font-medium">Checking for updates...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
        <h3 className="text-sm font-bold text-gray-900 flex items-center">
          <Bell className="w-4 h-4 mr-2 text-blue-500" />
          School Updates
        </h3>
        {notifications.length > 0 && (
          <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded-full">
            {notifications.length}
          </span>
        )}
      </div>
      
      <div className="max-h-[300px] overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-6 text-center text-gray-500 text-sm">
            No new updates right now.
          </div>
        ) : (
          <ul className="divide-y divide-gray-50">
            {notifications.map((note) => (
              <li key={note.id} className="p-4 hover:bg-gray-50 transition-colors">
                <p className="text-xs text-blue-600 font-semibold mb-1">
                  {new Date(note.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
                <p className="text-sm font-bold text-gray-900 mb-1">{note.title}</p>
                <p className="text-xs text-gray-600 leading-relaxed">{note.message}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
