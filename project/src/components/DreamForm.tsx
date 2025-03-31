import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, X, Moon, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useDreamStore } from '../store';

// Preset emotions with categories
const presetEmotions = {
  'Positive': [
    'Joy', 'Peace', 'Love', 'Excitement', 'Wonder', 'Gratitude', 'Confidence',
    'Happiness', 'Serenity', 'Bliss', 'Contentment', 'Awe'
  ],
  'Negative': [
    'Fear', 'Anxiety', 'Anger', 'Sadness', 'Confusion', 'Frustration',
    'Loneliness', 'Guilt', 'Shame', 'Despair', 'Helplessness'
  ],
  'Complex': [
    'Nostalgia', 'Melancholy', 'Anticipation', 'Curiosity', 'Ambivalence',
    'Hope', 'Yearning', 'Determination', 'Vulnerability', 'Empathy'
  ]
};

// Preset tags with categories
const presetTags = {
  'Elements': [
    'Water', 'Fire', 'Earth', 'Air', 'Light', 'Darkness', 'Nature',
    'Storm', 'Mountains', 'Ocean', 'Forest', 'Sky'
  ],
  'Places': [
    'House', 'School', 'Work', 'City', 'Beach', 'Garden', 'Church',
    'Hospital', 'Castle', 'Cave', 'Bridge', 'Road'
  ],
  'People': [
    'Family', 'Friends', 'Strangers', 'Children', 'Elderly', 'Teachers',
    'Leaders', 'Crowds', 'Partner', 'Self'
  ],
  'Actions': [
    'Flying', 'Falling', 'Running', 'Swimming', 'Fighting', 'Searching',
    'Hiding', 'Dancing', 'Speaking', 'Singing'
  ],
  'Symbols': [
    'Door', 'Key', 'Mirror', 'Clock', 'Book', 'Tree', 'Animal', 'Vehicle',
    'Cross', 'Circle', 'Star', 'Crown'
  ],
  'Archetypes': [
    'Hero', 'Shadow', 'Mentor', 'Child', 'Mother', 'Father', 'Trickster',
    'Sage', 'Lover', 'Creator', 'Explorer', 'Warrior'
  ]
};

export function DreamForm() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [emotion, setEmotion] = useState('');
  const [emotions, setEmotions] = useState<string[]>([]);
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [dreamType, setDreamType] = useState<string>('normal');
  const [sleepQuality, setSleepQuality] = useState<number>(5);
  const [lucidityLevel, setLucidityLevel] = useState<number>(1);
  const [recurring, setRecurring] = useState(false);
  const [showEmotionPresets, setShowEmotionPresets] = useState(false);
  const [showTagPresets, setShowTagPresets] = useState(false);

  const addDream = useDreamStore((state) => state.addDream);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addDream({
      title,
      description,
      date: new Date().toISOString(),
      emotions,
      tags,
      dream_type: dreamType as 'normal' | 'lucid' | 'nightmare' | 'recurring' | 'prophetic',
      sleep_quality: sleepQuality,
      lucidity_level: lucidityLevel,
      recurring,
      subscription_required: false,
    });
    
    // Navigate to the dream journal after saving
    navigate('/dashboard/journal');
  };

  const addEmotion = (newEmotion: string = emotion) => {
    if (newEmotion && !emotions.includes(newEmotion)) {
      setEmotions([...emotions, newEmotion]);
      setEmotion('');
      setShowEmotionPresets(false);
    }
  };

  const addTag = (newTag: string = tag) => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setTag('');
      setShowTagPresets(false);
    }
  };

  return (
    <div className="relative">
      {/* Stars background */}
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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="backdrop-blur-lg bg-white/10 p-8 rounded-xl border border-white/20 shadow-xl"
      >
        <div className="flex items-center mb-6">
          <Moon className="h-6 w-6 text-purple-400 mr-2" />
          <h2 className="text-2xl font-semibold text-white">Record Your Dream</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-blue-200 mb-2">
              Dream Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 bg-white/5 border border-white/10 focus:border-purple-500/50 rounded-lg text-white placeholder-blue-200/50 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
              placeholder="Enter a title for your dream"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-blue-200 mb-2">
              Dream Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full px-4 py-2.5 bg-white/5 border border-white/10 focus:border-purple-500/50 rounded-lg text-white placeholder-blue-200/50 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
              placeholder="Describe your dream in detail..."
              required
            />
          </div>

          <div>
            <label htmlFor="dreamType" className="block text-sm font-medium text-blue-200 mb-2">
              Dream Type
            </label>
            <select
              id="dreamType"
              value={dreamType}
              onChange={(e) => setDreamType(e.target.value)}
              className="w-full px-4 py-2.5 bg-white/5 border border-white/10 focus:border-purple-500/50 rounded-lg text-white focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
            >
              <option value="normal">Normal Dream</option>
              <option value="lucid">Lucid Dream</option>
              <option value="nightmare">Nightmare</option>
              <option value="recurring">Recurring Dream</option>
              <option value="prophetic">Prophetic Dream</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="sleepQuality" className="block text-sm font-medium text-blue-200 mb-2">
                Sleep Quality (1-10)
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  id="sleepQuality"
                  min="1"
                  max="10"
                  value={sleepQuality}
                  onChange={(e) => setSleepQuality(parseInt(e.target.value))}
                  className="flex-1 h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
                <span className="text-white font-medium w-8 text-center">{sleepQuality}</span>
              </div>
            </div>

            <div>
              <label htmlFor="lucidityLevel" className="block text-sm font-medium text-blue-200 mb-2">
                Lucidity Level (1-5)
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  id="lucidityLevel"
                  min="1"
                  max="5"
                  value={lucidityLevel}
                  onChange={(e) => setLucidityLevel(parseInt(e.target.value))}
                  className="flex-1 h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
                <span className="text-white font-medium w-8 text-center">{lucidityLevel}</span>
              </div>
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={recurring}
                onChange={(e) => setRecurring(e.target.checked)}
                className="w-5 h-5 bg-white/5 border border-white/10 rounded text-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:ring-offset-0"
              />
              <span className="text-sm text-blue-200 group-hover:text-blue-100 transition-colors">
                This is a recurring dream
              </span>
            </label>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="emotions" className="block text-sm font-medium text-blue-200 mb-2">
                Emotions
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  id="emotions"
                  value={emotion}
                  onChange={(e) => setEmotion(e.target.value)}
                  className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 focus:border-purple-500/50 rounded-lg text-white placeholder-blue-200/50 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
                  placeholder="Type or select emotion"
                />
                <button
                  type="button"
                  onClick={() => addEmotion()}
                  className="px-4 py-2.5 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/50 rounded-lg text-purple-200 transition-colors duration-200"
                >
                  <Plus className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => setShowEmotionPresets(!showEmotionPresets)}
                  className="px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-blue-200 transition-colors duration-200"
                >
                  <Star className="h-5 w-5" />
                </button>
              </div>
              {showEmotionPresets && (
                <div className="mt-2 p-4 bg-white/5 rounded-lg border border-white/10 space-y-4">
                  {Object.entries(presetEmotions).map(([category, emotionList]) => (
                    <div key={category}>
                      <h4 className="text-sm font-medium text-blue-200 mb-2">{category}</h4>
                      <div className="flex flex-wrap gap-2">
                        {emotionList.map((e) => (
                          <button
                            key={e}
                            type="button"
                            onClick={() => addEmotion(e)}
                            className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-blue-200 transition-colors duration-200"
                          >
                            {e}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="flex flex-wrap gap-2 mt-2">
                {emotions.map((e) => (
                  <span
                    key={e}
                    className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium bg-purple-500/20 text-purple-200 border border-purple-500/30"
                  >
                    {e}
                    <button
                      type="button"
                      onClick={() => setEmotions(emotions.filter((emotion) => emotion !== e))}
                      className="ml-2 hover:text-purple-100 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-blue-200 mb-2">
                Tags
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  id="tags"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 focus:border-purple-500/50 rounded-lg text-white placeholder-blue-200/50 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
                  placeholder="Type or select tag"
                />
                <button
                  type="button"
                  onClick={() => addTag()}
                  className="px-4 py-2.5 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/50 rounded-lg text-purple-200 transition-colors duration-200"
                >
                  <Plus className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => setShowTagPresets(!showTagPresets)}
                  className="px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-blue-200 transition-colors duration-200"
                >
                  <Star className="h-5 w-5" />
                </button>
              </div>
              {showTagPresets && (
                <div className="mt-2 p-4 bg-white/5 rounded-lg border border-white/10 space-y-4">
                  {Object.entries(presetTags).map(([category, tagList]) => (
                    <div key={category}>
                      <h4 className="text-sm font-medium text-blue-200 mb-2">{category}</h4>
                      <div className="flex flex-wrap gap-2">
                        {tagList.map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => addTag(t)}
                            className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-blue-200 transition-colors duration-200"
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium bg-blue-500/20 text-blue-200 border border-blue-500/30"
                  >
                    {t}
                    <button
                      type="button"
                      onClick={() => setTags(tags.filter((tag) => tag !== t))}
                      className="ml-2 hover:text-blue-100 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-[#1e293b]"
          >
            Save Dream
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}