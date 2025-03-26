import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain, Book, LineChart as ChartLine, Moon, Star, Sparkles } from 'lucide-react';
import { Logo } from './Logo';
import { Disclaimer } from './Disclaimer';

export function Landing() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Book className="h-6 w-6" />,
      title: 'Personal Dream Journal',
      description: 'Your private sanctuary for capturing and exploring dream experiences'
    },
    {
      icon: <Brain className="h-6 w-6" />,
      title: 'AI Dream Analysis',
      description: 'Advanced AI-powered insights tailored to your unique dream patterns'
    },
    {
      icon: <ChartLine className="h-6 w-6" />,
      title: 'Dream Analytics Suite',
      description: 'Comprehensive analytics to uncover personal dream themes and patterns'
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#334155]">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 animate-aurora" />
        
        {/* Shooting stars - reduced to 4 */}
        {Array.from({ length: 4 }).map((_, i) => {
          const startX = Math.random() * window.innerWidth;
          const endX = startX - 500; // Move left
          const duration = 1.5 + Math.random();
          const delay = i * 6 + Math.random() * 2; // Increased delay between stars
          
          return (
            <motion.div
              key={`star-${i}`}
              className="absolute"
              initial={{
                x: startX,
                y: -20,
                opacity: 0,
              }}
              animate={{
                x: endX,
                y: window.innerHeight * 0.5,
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: duration,
                repeat: Infinity,
                delay: delay,
                ease: "linear",
              }}
            >
              {/* Star core and tail container */}
              <div className="relative transform -rotate-[30deg]">
                {/* Multiple tail segments with different animations */}
                {Array.from({ length: 5 }).map((_, index) => (
                  <motion.div
                    key={`tail-${index}`}
                    className="absolute top-1/2 left-0 transform -translate-y-1/2"
                    style={{
                      width: `${60 - index * 10}px`,
                      height: `${2 - index * 0.2}px`,
                      background: `linear-gradient(270deg, rgba(255,255,255,${0.8 - index * 0.15}) 0%, rgba(255,255,255,0) 100%)`,
                      filter: `blur(${1 + index * 0.2}px)`,
                      transformOrigin: 'right center',
                      zIndex: -index
                    }}
                    animate={{
                      scaleX: [1, 1.1, 1],
                      opacity: [0.8 - index * 0.15, 0.6 - index * 0.1, 0.8 - index * 0.15],
                    }}
                    transition={{
                      duration: 0.5 + index * 0.1,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                ))}
                
                {/* Star core with enhanced glow */}
                <motion.div 
                  className="relative w-1 h-1 rounded-full bg-white shadow-[0_0_3px_#fff,0_0_6px_#fff,0_0_12px_#08f]"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.8, 1],
                  }}
                  transition={{
                    duration: 0.3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </motion.div>
          );
        })}

        {/* Twinkling stars - reduced to 30 */}
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={`twinkle-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 60}%`, // Keep stars in upper portion
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Ambient glows */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
        />
      </div>

      {/* Landscape */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#0a0f1a] to-transparent">
        <div className="absolute bottom-0 left-0 right-0">
          {/* Mountains */}
          <svg viewBox="0 0 1440 320" className="w-full h-auto">
            <path
              fill="#1a1f2e"
              fillOpacity="0.5"
              d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,208C672,213,768,203,864,181.3C960,160,1056,128,1152,117.3C1248,107,1344,117,1392,122.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
            <path
              fill="#151b29"
              fillOpacity="0.7"
              d="M0,256L48,245.3C96,235,192,213,288,213.3C384,213,480,235,576,240C672,245,768,235,864,213.3C960,192,1056,160,1152,149.3C1248,139,1344,149,1392,154.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <nav className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center">
          <Logo />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/login')}
            className="px-6 py-2 text-white bg-purple-600 rounded-full hover:bg-purple-700 transition-colors"
          >
            Enter Your Suite
          </motion.button>
        </nav>

        <main className="container mx-auto px-6 py-32 min-h-screen flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              DreamSuite
            </h1>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto">
              Your personal sanctuary for dream exploration, featuring AI-powered insights and comprehensive dream analysis
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="backdrop-blur-lg bg-white/10 p-6 rounded-xl border border-white/20"
              >
                <div className="text-purple-400 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-blue-200">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/login')}
              className="px-8 py-3 text-lg font-medium text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-full hover:from-purple-700 hover:to-blue-700 transition-colors"
            >
              Begin Your Dream Journey
            </motion.button>
          </motion.div>

          <Disclaimer variant="landing" />
        </main>
      </div>
    </div>
  );
}