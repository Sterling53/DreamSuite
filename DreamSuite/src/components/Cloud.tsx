import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

interface CloudProps {
  index: number;
  onClick?: () => void;
}

export function Cloud({ index, onClick }: CloudProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isFloating, setIsFloating] = useState(true);

  useEffect(() => {
    // Random initial position
    const startX = Math.random() * window.innerWidth;
    const startY = Math.random() * (window.innerHeight / 4); // Keep clouds in top quarter
    setPosition({ x: startX, y: startY });
  }, []);

  const cloudVariants = {
    float: {
      x: [position.x - 50, position.x + 50],
      y: [position.y - 10, position.y + 10],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "reverse" as const,
          duration: 10 + index * 2,
        },
        y: {
          repeat: Infinity,
          repeatType: "reverse" as const,
          duration: 5 + index * 2,
        },
      },
    },
    click: {
      scale: [1, 1.2, 1],
      opacity: [1, 0.8, 1],
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.div
      className="fixed pointer-events-none"
      style={{ 
        width: 120 + index * 20,
        height: 70 + index * 10,
        zIndex: 0,
      }}
      initial={{ x: position.x, y: position.y }}
      animate={isFloating ? "float" : "click"}
      variants={cloudVariants}
      onClick={() => {
        setIsFloating(false);
        onClick?.();
        setTimeout(() => setIsFloating(true), 300);
      }}
    >
      <div className="relative w-full h-full">
        <div className="absolute inset-0 bg-white rounded-full opacity-20 blur-xl transform scale-y-50" />
        <div className="absolute inset-0 bg-white rounded-full opacity-15 blur-lg" />
      </div>
    </motion.div>
  );
}