import React from 'react';
import { motion } from 'framer-motion';

export function Logo() {
  return (
    <motion.div 
      className="flex items-center gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative w-10 h-10">
        {/* Cloud */}
        <motion.div
          className="absolute bottom-0 w-full"
          animate={{
            y: [0, -2, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="relative">
            {/* Main cloud body */}
            <div className="absolute inset-0 bg-white/20 rounded-full blur-md transform scale-y-50" />
            <div className="absolute inset-0 bg-white/15 rounded-full blur-sm" />
            
            {/* Cloud details */}
            <div className="absolute -left-1 top-1/2 w-4 h-4 bg-white/20 rounded-full blur-sm" />
            <div className="absolute -right-1 top-1/2 w-4 h-4 bg-white/20 rounded-full blur-sm" />
          </div>
        </motion.div>

        {/* Moon */}
        <motion.div
          className="absolute top-0 right-1 w-6 h-6"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="relative w-full h-full">
            {/* Moon glow */}
            <div className="absolute inset-0 bg-purple-400/50 rounded-full blur-md" />
            
            {/* Moon body */}
            <div className="absolute inset-0 bg-purple-300 rounded-full" />
            
            {/* Moon shadow */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-purple-900/50 rounded-full" />
            
            {/* Moon crater details */}
            <div className="absolute top-1 left-1 w-1 h-1 bg-purple-200/50 rounded-full" />
            <div className="absolute bottom-2 right-1 w-1.5 h-1.5 bg-purple-200/30 rounded-full" />
          </div>
        </motion.div>

        {/* Stars */}
        <motion.div
          className="absolute top-0 left-0 w-1.5 h-1.5"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="w-full h-full bg-white rounded-full blur-[0.5px]" />
        </motion.div>
        
        <motion.div
          className="absolute top-2 left-2 w-1 h-1"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        >
          <div className="w-full h-full bg-white rounded-full blur-[0.5px]" />
        </motion.div>
      </div>

      <motion.span 
        className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400"
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        DreamSuite
      </motion.span>
    </motion.div>
  );
}