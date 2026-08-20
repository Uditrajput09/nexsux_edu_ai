import { motion } from 'motion/react';
import { User } from '../types.js';

interface AvatarProps {
  state: 'idle' | 'listening' | 'thinking' | 'speaking';
  role: string;
}

export default function Avatar({ state, role }: AvatarProps) {
  // Determine color based on role
  const getRoleColor = () => {
    switch (role) {
      case 'student': return 'from-blue-400 to-indigo-500';
      case 'parent': return 'from-emerald-400 to-teal-500';
      case 'teacher': return 'from-violet-400 to-purple-500';
      case 'principal': return 'from-rose-400 to-red-500';
      default: return 'from-blue-400 to-blue-600';
    }
  };

  const getAnimation = () => {
    switch (state) {
      case 'listening':
        return {
          scale: [1, 1.1, 1],
          opacity: [0.8, 1, 0.8],
          transition: { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
        };
      case 'thinking':
        return {
          rotate: [0, 5, -5, 0],
          scale: [1, 1.05, 1],
          transition: { repeat: Infinity, duration: 2, ease: "easeInOut" }
        };
      case 'speaking':
        return {
          scale: [1, 1.05, 1],
          borderRadius: ["50%", "40%", "50%"],
          transition: { repeat: Infinity, duration: 0.5, ease: "easeInOut" }
        };
      default: // idle
        return {
          y: [0, -5, 0],
          transition: { repeat: Infinity, duration: 3, ease: "easeInOut" }
        };
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 my-8">
      <div className="relative w-32 h-32 flex items-center justify-center">
        {/* Outer glow/pulse for listening/speaking */}
        {(state === 'listening' || state === 'speaking') && (
          <motion.div 
            className={`absolute inset-0 rounded-full bg-gradient-to-br ${getRoleColor()} opacity-20`}
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ repeat: Infinity, duration: state === 'speaking' ? 0.8 : 1.5 }}
          />
        )}
        
        {/* Main Avatar Body */}
        <motion.div 
          className={`relative w-24 h-24 rounded-full bg-gradient-to-br ${getRoleColor()} shadow-xl flex items-center justify-center z-10 overflow-hidden border-4 border-white`}
          animate={getAnimation()}
        >
          {/* Eyes container */}
          <div className="flex space-x-3 mb-2">
            {/* Left Eye */}
            <motion.div 
              className="w-3 h-4 bg-white rounded-full"
              animate={state === 'thinking' ? { height: [16, 4, 16], y: [0, 6, 0] } : { height: [16, 2, 16] }}
              transition={state === 'thinking' ? { repeat: Infinity, duration: 2 } : { repeat: Infinity, duration: 4, repeatDelay: 3 }}
            />
            {/* Right Eye */}
            <motion.div 
              className="w-3 h-4 bg-white rounded-full"
              animate={state === 'thinking' ? { height: [16, 4, 16], y: [0, 6, 0] } : { height: [16, 2, 16] }}
              transition={state === 'thinking' ? { repeat: Infinity, duration: 2 } : { repeat: Infinity, duration: 4, repeatDelay: 3 }}
            />
          </div>
          
          {/* Mouth (only visible when speaking or smiling) */}
          <motion.div 
            className="absolute bottom-6 w-8 bg-white rounded-full opacity-80"
            animate={state === 'speaking' ? { height: [2, 10, 2] } : { height: 2 }}
            transition={{ repeat: Infinity, duration: 0.3 }}
          />
        </motion.div>
      </div>
      
      <div className="text-center">
        <h3 className="text-lg font-bold text-gray-900">Nexus Edu AI</h3>
        <p className="text-sm text-gray-500 capitalize font-medium">{state}...</p>
      </div>
    </div>
  );
}
