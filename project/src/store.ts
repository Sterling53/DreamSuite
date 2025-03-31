import { create } from 'zustand';
import { supabase } from './lib/supabase';
import { api } from './lib/api';
import { logger } from './lib/logger';
import { Dream, DreamStore, DreamPatterns, Subscription } from './types';

export const useDreamStore = create<DreamStore>((set, get) => ({
  dreams: [],
  loading: false,
  error: null,
  user: null,
  subscription: null,

  checkSubscription: async () => {
    try {
      logger.info('Checking subscription status');
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', get().user?.id)
        .single();

      if (error) throw error;

      set({ subscription: data as Subscription });
      logger.info('Subscription status updated', { status: data.status });
    } catch (error) {
      logger.error('Failed to check subscription', { error: error.message });
    }
  },

  subscribe: async () => {
    try {
      set({ loading: true, error: null });
      logger.info('Initiating subscription process');
      
      const response = await api('/functions/v1/create-checkout', {
        method: 'POST',
        body: {
          user_id: get().user?.id,
          email: get().user?.email,
        },
      });

      window.open(response.url, '_blank');
      logger.info('Subscription checkout initiated');
    } catch (error) {
      logger.error('Subscription error', { error: error.message });
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  addDream: async (dream) => {
    try {
      set({ loading: true, error: null });
      logger.info('Adding new dream');

      const { data, error } = await supabase
        .from('dreams')
        .insert([{ ...dream, user_id: get().user?.id }])
        .select()
        .single();

      if (error) throw error;

      set((state) => ({
        dreams: [...state.dreams, data as Dream],
        loading: false,
      }));

      logger.info('Dream added successfully', { dreamId: data.id });
    } catch (error) {
      logger.error('Failed to add dream', { error: error.message });
      set({ error: error.message, loading: false });
    }
  },

  removeDream: async (id) => {
    try {
      set({ loading: true, error: null });
      logger.info('Removing dream', { dreamId: id });
      const { error } = await supabase
        .from('dreams')
        .delete()
        .eq('id', id);

      if (error) throw error;

      set((state) => ({
        dreams: state.dreams.filter((dream) => dream.id !== id),
        loading: false,
      }));
      logger.info('Dream removed successfully', { dreamId: id });
    } catch (error) {
      logger.error('Failed to remove dream', { error: error.message });
      set({ error: error.message, loading: false });
    }
  },

  interpretDream: async (id) => {
    try {
      set({ loading: true, error: null });
      logger.info('Interpreting dream', { dreamId: id });
      const dream = get().dreams.find((d) => d.id === id);
      if (!dream) throw new Error('Dream not found');

      if (dream.subscription_required) {
        const subscription = get().subscription;
        if (!subscription || subscription.status !== 'active') {
          logger.warn('Premium subscription required for interpretation');
          set({ error: 'Premium subscription required', loading: false });
          return;
        }
      }

      const response = await api('/functions/v1/interpret-dream', {
        method: 'POST',
        body: {
          description: dream.description,
          emotions: dream.emotions,
          tags: dream.tags,
          premium: dream.subscription_required,
        },
      });

      const { interpretation } = response;

      const { error } = await supabase
        .from('dreams')
        .update({ interpretation })
        .eq('id', id);

      if (error) throw error;

      set((state) => ({
        dreams: state.dreams.map((d) =>
          d.id === id ? { ...d, interpretation } : d
        ),
        loading: false,
      }));
      logger.info('Dream interpretation completed', { dreamId: id });
    } catch (error) {
      logger.error('Failed to interpret dream', { error: error.message });
      set({ error: error.message, loading: false });
    }
  },

  fetchDreams: async () => {
    try {
      set({ loading: true, error: null });
      logger.info('Fetching dreams');
      const { data, error } = await supabase
        .from('dreams')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;

      set({ dreams: data as Dream[], loading: false });
      logger.info('Dreams fetched successfully', { count: data.length });
    } catch (error) {
      logger.error('Failed to fetch dreams', { error: error.message });
      set({ error: error.message, loading: false });
    }
  },

  getDreamPatterns: () => {
    logger.info('Calculating dream patterns');
    const dreams = get().dreams;
    const patterns: DreamPatterns = {
      emotionFrequency: [],
      dreamTypeDistribution: [],
      recurringThemes: [],
      monthlyDreamCount: [],
    };

    const emotionCount = new Map<string, number>();
    dreams.forEach((dream) => {
      dream.emotions.forEach((emotion) => {
        emotionCount.set(emotion, (emotionCount.get(emotion) || 0) + 1);
      });
    });
    patterns.emotionFrequency = Array.from(emotionCount.entries()).map(([name, count]) => ({
      name,
      count,
    }));

    const typeCount = new Map<string, number>();
    dreams.forEach((dream) => {
      if (dream.dream_type) {
        typeCount.set(dream.dream_type, (typeCount.get(dream.dream_type) || 0) + 1);
      }
    });
    patterns.dreamTypeDistribution = Array.from(typeCount.entries()).map(([name, value]) => ({
      name,
      value,
    }));

    const themeCount = new Map<string, number>();
    dreams.forEach((dream) => {
      dream.tags.forEach((tag) => {
        themeCount.set(tag, (themeCount.get(tag) || 0) + 1);
      });
    });
    patterns.recurringThemes = Array.from(themeCount.entries())
      .map(([theme, count]) => ({ theme, count }))
      .filter((item) => item.count > 1);

    const monthCount = new Map<string, number>();
    dreams.forEach((dream) => {
      const month = new Date(dream.date).toLocaleString('default', { month: 'long' });
      monthCount.set(month, (monthCount.get(month) || 0) + 1);
    });
    patterns.monthlyDreamCount = Array.from(monthCount.entries()).map(([month, count]) => ({
      month,
      count,
    }));

    logger.info('Dream patterns calculated');
    return patterns;
  },

  signIn: async (email: string, password: string) => {
    try {
      set({ loading: true, error: null });
      logger.info('Signing in user', { email });
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      set({
        user: { id: data.user.id, email: data.user.email! },
        loading: false,
      });
      logger.info('User signed in successfully', { userId: data.user.id });
    } catch (error) {
      logger.error('Sign in failed', { error: error.message });
      set({ error: error.message, loading: false });
    }
  },

  signUp: async (email: string, password: string) => {
    try {
      set({ loading: true, error: null });
      logger.info('Signing up new user', { email });
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      set({
        user: { id: data.user!.id, email: data.user!.email! },
        loading: false,
      });
      logger.info('User signed up successfully', { userId: data.user!.id });
    } catch (error) {
      logger.error('Sign up failed', { error: error.message });
      set({ error: error.message, loading: false });
    }
  },

  signOut: async () => {
    try {
      set({ loading: true, error: null });
      logger.info('Signing out user');
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      set({ user: null, dreams: [], loading: false });
      logger.info('User signed out successfully');
    } catch (error) {
      logger.error('Sign out failed', { error: error.message });
      set({ error: error.message, loading: false });
    }
  },
}));