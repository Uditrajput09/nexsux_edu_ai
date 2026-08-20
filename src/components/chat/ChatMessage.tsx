import React from 'react';
import { motion } from 'motion/react';
import { Message } from '../../types.js';

interface ChatMessageProps {
  message: Message;
  key?: React.Key;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
    >
      <div 
        className={`max-w-[80%] md:max-w-[70%] rounded-2xl px-5 py-4 shadow-sm text-[15px] leading-relaxed
        ${message.role === 'user' 
          ? 'bg-blue-600 text-white rounded-br-sm' 
          : 'bg-white border border-gray-100 text-gray-800 rounded-bl-sm'}`}
      >
        {message.content}
      </div>
    </motion.div>
  );
}
