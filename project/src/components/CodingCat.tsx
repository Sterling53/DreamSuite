import React from 'react';
import { motion } from 'framer-motion';

export function CodingCat() {
  return (
    <div className="relative w-32 h-32">
      <motion.div
        className="absolute inset-0"
        animate={{
          y: [0, -5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Main body */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-20 bg-gray-700 rounded-[2rem] transform" />
        
        {/* White chest/belly patch */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-gray-100 rounded-[2rem]" />

        {/* Head */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-20 h-16">
          {/* Face base */}
          <div className="absolute inset-0 bg-gray-700 rounded-[2rem]" />
          
          {/* Ears */}
          <div className="absolute -top-4 -left-2 w-6 h-8 bg-gray-700">
            <div className="absolute inset-1 bg-pink-200 rounded-tl-lg" style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }} />
          </div>
          <div className="absolute -top-4 -right-2 w-6 h-8 bg-gray-700">
            <div className="absolute inset-1 bg-pink-200 rounded-tr-lg" style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }} />
          </div>

          {/* Face features */}
          <motion.div
            className="relative w-full h-full"
            animate={{
              y: [-1, 1, -1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {/* Eyes */}
            <div className="absolute top-6 left-4 w-3 h-4 bg-amber-300 rounded-full overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-black rounded-full"
                animate={{
                  scaleY: [1, 0.2, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
              >
                <div className="absolute top-1 left-1 w-1 h-1 bg-white rounded-full" />
              </motion.div>
            </div>
            <div className="absolute top-6 right-4 w-3 h-4 bg-amber-300 rounded-full overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-black rounded-full"
                animate={{
                  scaleY: [1, 0.2, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
              >
                <div className="absolute top-1 left-1 w-1 h-1 bg-white rounded-full" />
              </motion.div>
            </div>

            {/* Nose */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2 w-3 h-2 bg-pink-300 rounded-full" />

            {/* Whiskers */}
            <div className="absolute top-9 left-2 w-4 h-0.5 bg-gray-400 rounded-full transform -rotate-15" />
            <div className="absolute top-10 left-1 w-4 h-0.5 bg-gray-400 rounded-full" />
            <div className="absolute top-11 left-2 w-4 h-0.5 bg-gray-400 rounded-full transform rotate-15" />
            
            <div className="absolute top-9 right-2 w-4 h-0.5 bg-gray-400 rounded-full transform rotate-15" />
            <div className="absolute top-10 right-1 w-4 h-0.5 bg-gray-400 rounded-full" />
            <div className="absolute top-11 right-2 w-4 h-0.5 bg-gray-400 rounded-full transform -rotate-15" />
          </motion.div>
        </div>

        {/* Paws on laptop */}
        <div className="absolute bottom-4 left-1/2 -translate-x-[60%] w-6 h-4 bg-gray-700 rounded-full" />
        <div className="absolute bottom-4 left-1/2 -translate-x-[20%] w-6 h-4 bg-gray-700 rounded-full" />
      </motion.div>

      {/* Laptop */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-28 h-16"
        animate={{
          rotate: [-1, 1, -1]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Screen */}
        <div className="absolute bottom-2 w-full h-10 bg-blue-500/80 rounded-lg backdrop-blur-sm border-t-2 border-blue-300/50">
          {/* Code lines */}
          <motion.div
            className="absolute top-2 left-3 w-12 h-1 bg-white/40 rounded-full"
            animate={{
              width: ["30%", "60%", "30%"]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-4 left-3 w-8 h-1 bg-white/40 rounded-full"
            animate={{
              width: ["20%", "50%", "20%"]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.3
            }}
          />
          <motion.div
            className="absolute top-6 left-3 w-10 h-1 bg-white/40 rounded-full"
            animate={{
              width: ["40%", "70%", "40%"]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.6
            }}
          />
        </div>
        {/* Base */}
        <div className="absolute bottom-0 w-full h-2 bg-blue-600 rounded-md" />
      </motion.div>
    </div>
  );
}