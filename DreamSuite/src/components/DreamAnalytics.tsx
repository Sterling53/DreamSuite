import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import { motion } from 'framer-motion';
import { Moon, Star, Sparkles, LineChart as ChartIcon } from 'lucide-react';
import { useDreamStore } from '../store';

const COLORS = ['#8B5CF6', '#6366F1', '#EC4899', '#F43F5E', '#10B981'];

export function DreamAnalytics() {
  const getDreamPatterns = useDreamStore((state) => state.getDreamPatterns);
  const patterns = getDreamPatterns();

  return (
    <div className="space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 mb-6"
      >
        <ChartIcon className="h-8 w-8 text-purple-400" />
        <h2 className="text-2xl font-semibold text-white">Dream Insights</h2>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="backdrop-blur-lg bg-white/10 p-6 rounded-xl border border-white/20 shadow-xl hover:shadow-2xl transition-shadow duration-300"
        >
          <div className="flex items-center gap-2 mb-4">
            <Moon className="h-5 w-5 text-purple-400" />
            <h3 className="text-lg font-semibold text-white">Emotion Patterns</h3>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={patterns.emotionFrequency}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="name" 
                  stroke="rgba(255,255,255,0.6)"
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  interval={0}
                  tick={{ fontSize: 12, fill: 'rgba(255,255,255,0.8)' }}
                />
                <YAxis 
                  stroke="rgba(255,255,255,0.6)"
                  tick={{ fontSize: 12, fill: 'rgba(255,255,255,0.8)' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(30, 41, 59, 0.95)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    color: '#fff'
                  }}
                />
                <Bar 
                  dataKey="count" 
                  fill="#8B5CF6"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="backdrop-blur-lg bg-white/10 p-6 rounded-xl border border-white/20 shadow-xl hover:shadow-2xl transition-shadow duration-300"
        >
          <div className="flex items-center gap-2 mb-4">
            <Star className="h-5 w-5 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">Dream Types</h3>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={patterns.dreamTypeDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {patterns.dreamTypeDistribution.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[index % COLORS.length]}
                      stroke="rgba(255,255,255,0.1)"
                    />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(30, 41, 59, 0.95)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    color: '#fff'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="backdrop-blur-lg bg-white/10 p-6 rounded-xl border border-white/20 shadow-xl hover:shadow-2xl transition-shadow duration-300"
        >
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-5 w-5 text-pink-400" />
            <h3 className="text-lg font-semibold text-white">Dream Frequency</h3>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={patterns.monthlyDreamCount}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="month" 
                  stroke="rgba(255,255,255,0.6)"
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  interval={0}
                  tick={{ fontSize: 12, fill: 'rgba(255,255,255,0.8)' }}
                />
                <YAxis 
                  stroke="rgba(255,255,255,0.6)"
                  tick={{ fontSize: 12, fill: 'rgba(255,255,255,0.8)' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(30, 41, 59, 0.95)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    color: '#fff'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="count" 
                  stroke="#8B5CF6" 
                  strokeWidth={3}
                  dot={{ 
                    fill: '#8B5CF6', 
                    stroke: '#fff', 
                    strokeWidth: 2,
                    r: 6
                  }}
                  activeDot={{
                    r: 8,
                    stroke: '#fff',
                    strokeWidth: 2
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="backdrop-blur-lg bg-white/10 p-6 rounded-xl border border-white/20 shadow-xl hover:shadow-2xl transition-shadow duration-300"
        >
          <div className="flex items-center gap-2 mb-4">
            <Moon className="h-5 w-5 text-purple-400" />
            <h3 className="text-lg font-semibold text-white">Recurring Themes</h3>
          </div>
          <div className="h-[300px] overflow-y-auto space-y-3 pr-2 custom-scrollbar">
            {patterns.recurringThemes.map((theme, index) => (
              <motion.div
                key={theme.theme}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex justify-between items-center p-4 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-colors duration-200"
              >
                <span className="text-blue-200">{theme.theme}</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-purple-500 rounded-full"
                      style={{ 
                        width: `${(theme.count / Math.max(...patterns.recurringThemes.map(t => t.count))) * 100}%` 
                      }}
                    />
                  </div>
                  <span className="text-purple-300 font-semibold min-w-[3rem] text-right">
                    {theme.count}×
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}