export interface Dream {
  id: string;
  user_id: string;
  title: string;
  description: string;
  date: string;
  emotions: string[];
  tags: string[];
  interpretation?: string;
  sleep_quality?: number;
  lucidity_level?: number;
  dream_type?: 'normal' | 'lucid' | 'nightmare' | 'recurring' | 'prophetic';
  recurring: boolean;
  created_at: string;
  updated_at: string;
  subscription_required: boolean;
}

export interface Subscription {
  id: string;
  user_id: string;
  status: 'active' | 'canceled' | 'expired';
  stripe_subscription_id: string;
  current_period_end: string;
  created_at: string;
  updated_at: string;
}

export interface DreamStore {
  dreams: Dream[];
  loading: boolean;
  error: string | null;
  user: User | null;
  subscription: Subscription | null;
  addDream: (dream: Omit<Dream, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => Promise<void>;
  removeDream: (id: string) => Promise<void>;
  interpretDream: (id: string) => Promise<void>;
  fetchDreams: () => Promise<void>;
  getDreamPatterns: () => DreamPatterns;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  checkSubscription: () => Promise<void>;
  subscribe: () => Promise<void>;
}

export interface User {
  id: string;
  email: string;
}

export interface DreamPatterns {
  emotionFrequency: { name: string; count: number }[];
  dreamTypeDistribution: { name: string; value: number }[];
  recurringThemes: { theme: string; count: number }[];
  monthlyDreamCount: { month: string; count: number }[];
}