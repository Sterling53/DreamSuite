import React from 'react';
import { motion } from 'framer-motion';
import { X, Sparkles, Check } from 'lucide-react';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubscribe: () => Promise<void>;
  loading: boolean;
}

export function SubscriptionModal({ isOpen, onClose, onSubscribe, loading }: SubscriptionModalProps) {
  if (!isOpen) return null;

  const benefits = [
    'Unlimited AI Dream Interpretations',
    'Advanced Psychological Analysis',
    'Pattern Recognition Insights',
    'Personalized Dream Guidance',
    'Priority Support',
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full max-w-lg bg-gradient-to-b from-[#1a1f2e] to-[#2a3142] rounded-xl shadow-2xl overflow-hidden"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-blue-200 hover:text-white transition-colors"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="h-8 w-8 text-purple-400" />
            <h2 className="text-2xl font-bold text-white">Unlock Dream Insights</h2>
          </div>

          <p className="text-blue-200 mb-8">
            Upgrade to our premium service for in-depth AI dream analysis and unlock a deeper understanding of your subconscious mind.
          </p>

          <div className="space-y-4 mb-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3"
              >
                <Check className="h-5 w-5 text-purple-400 flex-shrink-0" />
                <span className="text-white">{benefit}</span>
              </motion.div>
            ))}
          </div>

          <div className="text-center mb-8">
            <div className="text-3xl font-bold text-white mb-2">$3.99<span className="text-lg text-blue-200">/month</span></div>
            <p className="text-blue-200">Cancel anytime</p>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onSubscribe}
            disabled={loading}
            className="w-full py-3 px-6 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Processing...' : 'Start Premium Journey'}
          </motion.button>

          <p className="text-center text-sm text-blue-200 mt-4">
            Secure payment powered by Stripe
          </p>
        </div>

        <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl" />
      </motion.div>
    </motion.div>
  );
}