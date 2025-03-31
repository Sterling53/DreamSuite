import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Check, Star, Brain, Shield, Clock } from 'lucide-react';
import { useDreamStore } from '../store';

export function Subscription() {
  const { subscribe, loading, subscription } = useDreamStore();

  const features = [
    {
      icon: <Brain className="h-6 w-6 text-purple-400" />,
      title: 'Advanced AI Analysis',
      description: 'Get deeper psychological insights and pattern recognition in your dreams'
    },
    {
      icon: <Star className="h-6 w-6 text-yellow-400" />,
      title: 'Unlimited Interpretations',
      description: 'Access unlimited AI-powered dream interpretations'
    },
    {
      icon: <Shield className="h-6 w-6 text-blue-400" />,
      title: 'Priority Support',
      description: '24/7 priority access to our support team'
    },
    {
      icon: <Clock className="h-6 w-6 text-green-400" />,
      title: 'Historical Analysis',
      description: 'Track patterns and themes across your dream history'
    }
  ];

  const benefits = [
    'Personalized dream symbolism dictionary',
    'Advanced emotion tracking',
    'Cross-reference analysis with past dreams',
    'Weekly insight reports',
    'Export dream journal as PDF',
    'Custom tags and categories'
  ];

  if (subscription?.status === 'active') {
    return (
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="backdrop-blur-lg bg-white/10 p-8 rounded-xl border border-white/20 shadow-xl"
        >
          <Crown className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-4">Premium Member</h2>
          <p className="text-blue-200">
            You're currently enjoying all premium features of DreamSuite.
            Your next billing date is {new Date(subscription.current_period_end).toLocaleDateString()}.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <Crown className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Unlock the Full Power of Your Dreams
        </h1>
        <p className="text-xl text-blue-200 max-w-2xl mx-auto">
          Upgrade to Premium for advanced AI analysis and deeper insights into your dream world
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="backdrop-blur-lg bg-white/10 p-6 rounded-xl border border-white/20 shadow-xl"
          >
            <div className="flex items-center gap-4 mb-4">
              {feature.icon}
              <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
            </div>
            <p className="text-blue-200">{feature.description}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="backdrop-blur-lg bg-white/10 p-8 rounded-xl border border-white/20 shadow-xl text-center max-w-2xl mx-auto"
      >
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Premium Plan</h2>
          <div className="text-4xl font-bold text-white mb-4">
            $3.99
            <span className="text-xl text-blue-200">/month</span>
          </div>
          <p className="text-blue-200">Cancel anytime • No commitments</p>
        </div>

        <div className="mb-8">
          <div className="grid grid-cols-2 gap-4">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex items-center gap-2 text-left"
              >
                <Check className="h-5 w-5 text-purple-400 flex-shrink-0" />
                <span className="text-white text-sm">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={subscribe}
          disabled={loading}
          className="w-full sm:w-auto px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Processing...' : 'Start Premium Journey'}
        </motion.button>

        <p className="text-sm text-blue-200 mt-4">
          Secure payment powered by Stripe • 30-day money-back guarantee
        </p>
      </motion.div>
    </div>
  );
}