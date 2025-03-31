import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Book, Plus, BarChart3, Moon, Brain, Star } from 'lucide-react';
import { useDreamStore } from '../store';

export function Home() {
  const { dreams } = useDreamStore();

  const quickStats = [
    {
      label: 'Total Dreams',
      value: dreams.length,
      icon: Book,
      color: 'text-blue-400',
      link: '/dashboard'
    },
    {
      label: 'Lucid Dreams',
      value: dreams.filter(d => d.dream_type === 'lucid').length,
      icon: Brain,
      color: 'text-purple-400',
      link: '/dashboard'
    },
    {
      label: 'Recurring Dreams',
      value: dreams.filter(d => d.recurring).length,
      icon: Star,
      color: 'text-yellow-400',
      link: '/dashboard'
    }
  ];

  const actions = [
    {
      title: 'Record New Dream',
      description: 'Document your latest dream experience',
      icon: Plus,
      color: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      link: '/dashboard/new'
    },
    {
      title: 'View Dream Journal',
      description: 'Browse and reflect on your dream collection',
      icon: Book,
      color: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      link: '/dashboard'
    },
    {
      title: 'Explore Analytics',
      description: 'Discover patterns in your dream experiences',
      icon: BarChart3,
      color: 'bg-green-500/20 text-green-300 border-green-500/30',
      link: '/dashboard/analytics'
    }
  ];

  const recentDreams = dreams.slice(0, 3);

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 mb-6"
      >
        <Moon className="h-8 w-8 text-purple-400" />
        <h2 className="text-2xl font-semibold text-white">Welcome to Your Dream Space</h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="backdrop-blur-lg bg-white/10 p-6 rounded-xl border border-white/20 shadow-xl"
            >
              <div className="flex items-center gap-3">
                <Icon className={`h-5 w-5 ${stat.color}`} />
                <h3 className="text-lg font-medium text-white">{stat.label}</h3>
              </div>
              <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <Link
                to={action.link}
                className={`block h-full backdrop-blur-lg ${action.color} p-6 rounded-xl border shadow-xl hover:shadow-2xl transition-all duration-300 group`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <Icon className="h-6 w-6" />
                  <h3 className="text-lg font-medium">{action.title}</h3>
                </div>
                <p className="text-sm opacity-80">{action.description}</p>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {recentDreams.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="backdrop-blur-lg bg-white/10 p-6 rounded-xl border border-white/20 shadow-xl"
        >
          <h3 className="text-lg font-medium text-white mb-4">Recent Dreams</h3>
          <div className="space-y-4">
            {recentDreams.map((dream, index) => (
              <motion.div
                key={dream.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors duration-200"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-white font-medium">{dream.title}</h4>
                    <p className="text-sm text-blue-200 line-clamp-2 mt-1">
                      {dream.description}
                    </p>
                  </div>
                  <span className="text-xs text-blue-200">
                    {new Date(dream.date).toLocaleDateString()}
                  </span>
                </div>
                {dream.emotions.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {dream.emotions.map((emotion) => (
                      <span
                        key={emotion}
                        className="px-2 py-1 text-xs rounded-full bg-purple-500/20 text-purple-200 border border-purple-500/30"
                      >
                        {emotion}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}