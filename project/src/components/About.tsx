import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Coffee, Star, Mail, AlertCircle } from 'lucide-react';

function AppCatLogo() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative w-64 h-64 mx-auto mb-4" // Increased size from w-48 h-48 and reduced margin bottom
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full blur-2xl" />
      <motion.svg
        viewBox="0 0 400 400"
        className="relative w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.path
          d="M80 200 L160 200 L200 120 L240 200 L320 200"
          stroke="url(#gradient)"
          strokeWidth="40"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        <motion.text
          x="320"
          y="180"
          className="text-2xl font-bold"
          fill="white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          CAT
        </motion.text>
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="50%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>
        </defs>
      </motion.svg>
    </motion.div>
  );
}

export function About() {
  const [showContactInfo, setShowContactInfo] = useState(false);

  return (
    <div className="space-y-6"> {/* Reduced space-y-8 to space-y-6 */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4" // Reduced margin bottom
      >
        <AppCatLogo />
        <h2 className="text-2xl font-semibold text-white text-center">About App Cat</h2>
        <p className="text-blue-200 mt-1 text-center">Crafting Dreams into Reality</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="backdrop-blur-lg bg-white/10 p-8 rounded-xl border border-white/20 shadow-xl"
      >
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <Heart className="h-6 w-6 text-red-400" />
            <h3 className="text-xl font-semibold text-white">Our Story</h3>
          </div>
          
          <p className="text-blue-200 leading-relaxed">
            App Cat is a passionate software development company founded in 2023. We specialize in creating innovative web applications that push the boundaries of what's possible in the browser. Our team of dedicated developers combines cutting-edge technology with creative design to deliver exceptional user experiences.
          </p>

          <div className="flex items-center gap-3 mt-8 mb-6">
            <Coffee className="h-6 w-6 text-yellow-400" />
            <h3 className="text-xl font-semibold text-white">Our Mission</h3>
          </div>

          <p className="text-blue-200 leading-relaxed">
            We believe in the power of dreams to inspire innovation. That's why we created DreamSuite - to help people explore their subconscious mind and unlock their creative potential. Our mission is to build tools that enhance human experience and foster personal growth through technology.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="backdrop-blur-lg bg-white/5 p-6 rounded-xl border border-white/10">
              <Star className="h-6 w-6 text-purple-400 mb-4" />
              <h4 className="text-lg font-medium text-white mb-2">Innovation</h4>
              <p className="text-blue-200 text-sm">
                Pushing the boundaries of web technology to create unique experiences
              </p>
            </div>

            <div className="backdrop-blur-lg bg-white/5 p-6 rounded-xl border border-white/10">
              <Star className="h-6 w-6 text-blue-400 mb-4" />
              <h4 className="text-lg font-medium text-white mb-2">Quality</h4>
              <p className="text-blue-200 text-sm">
                Crafting robust and reliable solutions with attention to detail
              </p>
            </div>

            <div className="backdrop-blur-lg bg-white/5 p-6 rounded-xl border border-white/10">
              <Star className="h-6 w-6 text-green-400 mb-4" />
              <h4 className="text-lg font-medium text-white mb-2">Community</h4>
              <p className="text-blue-200 text-sm">
                Building tools that bring people together and foster growth
              </p>
            </div>
          </div>

          <div className="mt-12">
            <div className="text-center">
              <button
                onClick={() => setShowContactInfo(!showContactInfo)}
                className="inline-flex items-center px-4 py-2 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/30 hover:bg-purple-500/30 transition-colors duration-200"
              >
                <Mail className="h-4 w-4 mr-2" />
                Contact Information
              </button>
            </div>

            {showContactInfo && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 rounded-lg bg-white/5 border border-white/10"
              >
                <div className="flex items-start gap-2 text-sm text-blue-200">
                  <AlertCircle className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="mb-2">
                      Get in touch with us through any of these channels:
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li>Email: <a href="mailto:appcat777@gmail.com" className="text-purple-300 hover:text-purple-200 transition-colors">appcat777@gmail.com</a></li>
                      <li>Submit issues on our GitHub repository</li>
                      <li>Join our Discord community</li>
                      <li>Follow us on Twitter for updates</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}