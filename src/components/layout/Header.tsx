import React from 'react';
import { User } from '../../types.js';
import { useLanguage, SUPPORTED_LANGUAGES } from '../../contexts/LanguageContext.js';

interface HeaderProps {
  user: User;
}

export default function Header({ user }: HeaderProps) {
  const { language, setLanguage } = useLanguage();

  return (
    <header className="px-8 py-6 border-b border-gray-50 flex items-center justify-between z-10 bg-white/80 backdrop-blur-md sticky top-0">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Good morning, {user.name.split(' ')[0]}</h2>
        <p className="text-gray-500 mt-1">How can I help you today?</p>
      </div>
      <div className="flex items-center space-x-4">
        <select 
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-3 py-2"
        >
          {SUPPORTED_LANGUAGES.map((lang) => (
            <option key={lang.value} value={lang.value}>
              {lang.label}
            </option>
          ))}
        </select>
      </div>
    </header>
  );
}
