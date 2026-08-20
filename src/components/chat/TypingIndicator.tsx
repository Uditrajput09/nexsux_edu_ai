import { motion } from 'motion/react';

export default function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="flex justify-start"
    >
      <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-sm px-5 py-4 shadow-sm flex items-center space-x-1.5">
        <motion.div 
          className="w-2 h-2 bg-gray-400 rounded-full"
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 1, ease: 'easeInOut', delay: 0 }}
        />
        <motion.div 
          className="w-2 h-2 bg-gray-400 rounded-full"
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 1, ease: 'easeInOut', delay: 0.2 }}
        />
        <motion.div 
          className="w-2 h-2 bg-gray-400 rounded-full"
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 1, ease: 'easeInOut', delay: 0.4 }}
        />
      </div>
    </motion.div>
  );
}
