import React, { useState } from 'react';
import { Trash2, MessageSquare, Star, Crown } from 'lucide-react';
import { motion } from 'framer-motion';
import { useDreamStore } from '../store';
import { SubscriptionModal } from './SubscriptionModal';

export function DreamList() {
  const { dreams, removeDream, interpretDream, loading, subscription, subscribe } = useDreamStore();
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [selectedDreamId, setSelectedDreamId] = useState<string | null>(null);

  const handleInterpretClick = (dreamId: string) => {
    const dream = dreams.find(d => d.id === dreamId);
    if (dream?.subscription_required && (!subscription || subscription.status !== 'active')) {
      setSelectedDreamId(dreamId);
      setShowSubscriptionModal(true);
    } else {
      interpretDream(dreamId);
    }
  };

  return (
    <div className="relative">
      <div className="fixed inset-0 pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="space-y-6">
        <motion.h2 
          className="text-xl sm:text-2xl font-semibold text-white mb-8 flex items-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Star className="w-6 h-6 mr-2 text-yellow-400" />
          Your Dream Collection
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {dreams.map((dream, index) => (
            <motion.div
              key={dream.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="backdrop-blur-lg bg-white/10 p-4 sm:p-6 rounded-xl border border-white/20 shadow-xl hover:shadow-2xl transition-shadow"
            >
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold text-white">{dream.title}</h3>
                <div className="flex gap-2">
                  {!dream.interpretation && (
                    <button
                      onClick={() => handleInterpretClick(dream.id)}
                      disabled={loading}
                      className="text-blue-300 hover:text-purple-400 transition-colors relative"
                    >
                      <MessageSquare className="h-5 w-5" />
                      {dream.subscription_required && (
                        <Crown className="h-3 w-3 text-yellow-400 absolute -top-1 -right-1" />
                      )}
                    </button>
                  )}
                  <button
                    onClick={() => removeDream(dream.id)}
                    className="text-blue-300 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <p className="mt-2 text-blue-100 line-clamp-3">{dream.description}</p>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium text-blue-200">Sleep Quality</p>
                  <p className="text-sm text-white">{dream.sleep_quality}/10</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-blue-200">Lucidity Level</p>
                  <p className="text-sm text-white">{dream.lucidity_level}/5</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-xs text-blue-200">
                  Recorded on {new Date(dream.date).toLocaleDateString()}
                </p>
                <p className="text-xs text-blue-200">
                  Type: {dream.dream_type}
                  {dream.recurring && ' (Recurring)'}
                </p>
              </div>
              {dream.emotions.length > 0 && (
                <div className="mt-3">
                  <p className="text-xs font-medium text-blue-200">Emotions:</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {dream.emotions.map((emotion) => (
                      <span
                        key={emotion}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-900/50 text-purple-100 border border-purple-500/30"
                      >
                        {emotion}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {dream.tags.length > 0 && (
                <div className="mt-3">
                  <p className="text-xs font-medium text-blue-200">Tags:</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {dream.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-900/50 text-blue-100 border border-blue-500/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {dream.interpretation && (
                <div className="mt-4 p-4 bg-purple-900/30 rounded-md border border-purple-500/20">
                  <p className="text-xs font-medium text-blue-200 mb-2">AI Interpretation:</p>
                  <p className="text-sm text-blue-100">{dream.interpretation}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <SubscriptionModal
        isOpen={showSubscriptionModal}
        onClose={() => setShowSubscriptionModal(false)}
        onSubscribe={async () => {
          await subscribe();
          setShowSubscriptionModal(false);
          if (selectedDreamId) {
            interpretDream(selectedDreamId);
          }
        }}
        loading={loading}
      />
    </div>
  );
}