import React, { useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, BookOpen, BarChart3, Plus, Menu, Crown, X, Home } from 'lucide-react';
import { DreamForm } from './DreamForm';
import { DreamList } from './DreamList';
import { DreamAnalytics } from './DreamAnalytics';
import { Subscription } from './Subscription';
import { Home as HomePage } from './Home';
import { Cloud } from './Cloud';
import { Logo } from './Logo';
import { useDreamStore } from '../store';

export function Dashboard() {
  const { user, signOut, fetchDreams, subscription } = useDreamStore();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  useEffect(() => {
    if (user) {
      fetchDreams();
    }
  }, [user, fetchDreams]);

  const navigation = [
    { 
      name: 'Home', 
      path: '/dashboard', 
      icon: Home,
      description: 'Your dream dashboard overview'
    },
    { 
      name: 'Dream Journal', 
      path: '/dashboard/journal', 
      icon: BookOpen,
      description: 'View and manage your dream entries'
    },
    { 
      name: 'New Dream', 
      path: '/dashboard/new', 
      icon: Plus,
      description: 'Record a new dream experience'
    },
    { 
      name: 'Analytics', 
      path: '/dashboard/analytics', 
      icon: BarChart3,
      description: 'Explore patterns in your dreams'
    },
    { 
      name: 'Premium', 
      path: '/dashboard/premium', 
      icon: Crown,
      description: 'Access advanced features',
      badge: subscription?.status === 'active' ? 'Active' : 'Upgrade'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#334155] relative overflow-hidden">
      {/* Clouds */}
      <div className="fixed inset-0 pointer-events-none">
        {Array.from({ length: 6 }).map((_, index) => (
          <Cloud key={index} index={index} />
        ))}
      </div>

      {/* Content */}
      <div className="relative">
        <nav className="bg-white/5 backdrop-blur-lg border-b border-white/10 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 md:h-20">
              <div className="flex items-center">
                <Link to="/dashboard" className="flex-shrink-0">
                  <Logo />
                </Link>
                <div className="hidden md:ml-10 md:flex md:space-x-1">
                  {navigation.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    
                    return (
                      <Link
                        key={item.name}
                        to={item.path}
                        className={`group relative flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${
                          isActive
                            ? 'bg-white/10 text-white shadow-lg'
                            : 'text-blue-200 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        <Icon className={`h-5 w-5 transition-colors duration-200 ${
                          isActive ? 'text-purple-400' : 'text-blue-300 group-hover:text-purple-400'
                        }`} />
                        <span className="ml-2 text-sm font-medium">{item.name}</span>
                        {item.badge && (
                          <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                            item.badge === 'Active' 
                              ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                              : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                          }`}>
                            {item.badge}
                          </span>
                        )}
                        
                        {/* Enhanced Tooltip */}
                        <div className="absolute opacity-0 group-hover:opacity-100 bottom-full left-1/2 transform -translate-x-1/2 px-3 py-2 mb-2 bg-gray-900/90 backdrop-blur-sm text-white text-sm rounded-lg shadow-xl transition-opacity duration-200 whitespace-nowrap border border-white/10 pointer-events-none">
                          {item.description}
                          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900/90 border-r border-b border-white/10"></div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="hidden sm:flex items-center space-x-4">
                  <motion.div 
                    className="px-4 py-2 rounded-lg bg-white/5 border border-white/10"
                    whileHover={{ scale: 1.02 }}
                  >
                    <span className="text-sm text-blue-200">{user.email}</span>
                  </motion.div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={signOut}
                    className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-white bg-purple-600/90 hover:bg-purple-600 transition-colors duration-200 border border-purple-500/50 shadow-lg"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </motion.button>
                </div>

                {/* Mobile menu button */}
                <div className="flex items-center md:hidden">
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="inline-flex items-center justify-center p-2 rounded-lg text-blue-200 hover:text-white hover:bg-white/10 transition-colors duration-200 focus:outline-none"
                  >
                    <span className="sr-only">Open main menu</span>
                    {isMenuOpen ? (
                      <X className="h-6 w-6" />
                    ) : (
                      <Menu className="h-6 w-6" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Mobile menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden border-t border-white/10"
              >
                <div className="px-4 py-3 space-y-2">
                  {navigation.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    
                    return (
                      <Link
                        key={item.name}
                        to={item.path}
                        onClick={() => setIsMenuOpen(false)}
                        className={`flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
                          isActive
                            ? 'bg-white/10 text-white shadow-lg'
                            : 'text-blue-200 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center">
                          <Icon className={`h-5 w-5 ${
                            isActive ? 'text-purple-400' : 'text-blue-300'
                          }`} />
                          <span className="ml-3 font-medium">{item.name}</span>
                        </div>
                        {item.badge && (
                          <span className={`px-2 py-0.5 text-xs rounded-full ${
                            item.badge === 'Active' 
                              ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                              : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                          }`}>
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                  <div className="pt-2 border-t border-white/10">
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        signOut();
                      }}
                      className="w-full flex items-center p-3 rounded-lg text-blue-200 hover:bg-white/5 hover:text-white transition-colors duration-200"
                    >
                      <LogOut className="h-5 w-5" />
                      <span className="ml-3 font-medium">Sign Out</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/journal" element={<DreamList />} />
            <Route path="/new" element={<DreamForm />} />
            <Route path="/analytics" element={<DreamAnalytics />} />
            <Route path="/premium" element={<Subscription />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}