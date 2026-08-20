import React from 'react';
import { User } from '../../types.js';
import Notifications from './Notifications.js';

interface RightContextPanelProps {
  user: User;
}

export default function RightContextPanel({ user }: RightContextPanelProps) {
  return (
    <aside className="w-80 bg-gray-50 border-l border-gray-100 hidden xl:flex flex-col overflow-y-auto">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Session Context</h3>
      </div>
      
      <div className="p-6 space-y-6">
        <div>
          <p className="text-xs text-gray-500 font-semibold uppercase mb-2">Active Role</p>
          <div className="flex items-center space-x-3 bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold capitalize">
              {user.role[0]}
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900 capitalize">{user.role}</p>
              <p className="text-xs text-gray-500">Authenticated Session</p>
            </div>
          </div>
        </div>

        {/* School Updates Component */}
        <div>
          <p className="text-xs text-gray-500 font-semibold uppercase mb-2">Live Updates</p>
          <Notifications user={user} />
        </div>

        <div>
          <p className="text-xs text-gray-500 font-semibold uppercase mb-2">Active Entity</p>
          <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
            <p className="text-sm font-medium text-gray-900">
              {user.role === 'student' && user.name}
              {user.role === 'parent' && 'Rahul Sharma (Child)'}
              {user.role === 'teacher' && 'Class 8A & Assigned Students'}
              {user.role === 'principal' && 'All Classes (School-Wide)'}
            </p>
          </div>
        </div>

        <div>
          <p className="text-xs text-gray-500 font-semibold uppercase mb-2">Capabilities</p>
          <ul className="space-y-2">
            {(user.role === 'student' ? [
              'View own attendance',
              'Ask academic questions',
              'Request teacher assistance'
            ] : user.role === 'parent' ? [
              'View child\'s attendance',
              'Ask school questions',
              'Request teacher contact'
            ] : user.role === 'teacher' ? [
              'Mark student attendance',
              'View student information',
              'Request management support'
            ] : [
              'View school-wide analytics',
              'View attendance summaries',
              'Management-level insights'
            ]).map((permission, idx) => (
              <li key={idx} className="flex items-start space-x-2 text-sm text-gray-700">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>{permission}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div>
            <p className="text-xs text-gray-500 font-semibold uppercase mb-2">Restricted</p>
            <ul className="space-y-2">
              <li className="flex items-start space-x-2 text-sm text-gray-500 line-through">
                <span className="text-red-400 mt-0.5">✕</span>
                <span>Cross-role data access</span>
              </li>
              {user.role !== 'principal' && (
                <li className="flex items-start space-x-2 text-sm text-gray-500 line-through">
                  <span className="text-red-400 mt-0.5">✕</span>
                  <span>School-wide analytics</span>
                </li>
              )}
              {user.role !== 'teacher' && (
                <li className="flex items-start space-x-2 text-sm text-gray-500 line-through">
                  <span className="text-red-400 mt-0.5">✕</span>
                  <span>Mark attendance</span>
                </li>
              )}
            </ul>
        </div>
      </div>
    </aside>
  );
}
