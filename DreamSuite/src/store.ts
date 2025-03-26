import { create } from 'zustand';
import { supabase } from './lib/supabase';
import { Dream, DreamStore, DreamPatterns, Subscription } from './types';

export const useDreamStore = create<DreamStore>((set, get) => ({
  dreams: [],
  loading: false,
  error: null,
  user: null,
  subscription: null,

  checkSubscription: async () => {
    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', get().user?.id)
        .single();

      if (error) throw error;

      set({ subscription: data as Subscription });
    } catch (error) {
      console.error('Error checking subscription:', error);
    }
  },

  subscribe: async () => {
    try {
      set({ loading: true, error: null });
      
      // Create Stripe Checkout session
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-checkout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: get().user?.id,
          email: get().user?.email,
        }),
      });

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  addDream: async (dream) => {
    try {
      set({ loading: true, error: null });
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
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  removeDream: async (id) => {
    try {
      set({ loading: true, error: null });
      const { error } = await supabase
        .from('dreams')
        .delete()
        .eq('id', id);

      if (error) throw error;

      set((state) => ({
        dreams: state.dreams.filter((dream) => dream.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  interpretDream: async (id) => {
    try {
      set({ loading: true, error: null });
      const dream = get().dreams.find((d) => d.id === id);
      if (!dream) throw new Error('Dream not found');

      // Check subscription status for premium interpretations
      if (dream.subscription_required) {
        const subscription = get().subscription;
        if (!subscription || subscription.status !== 'active') {
          set({ error: 'Premium subscription required', loading: false });
          return;
        }
      }

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/interpret-dream`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description: dream.description,
          emotions: dream.emotions,
          tags: dream.tags,
          premium: dream.subscription_required,
        }),
      });

      const { interpretation } = await response.json();

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
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  fetchDreams: async () => {
    try {
      set({ loading: true, error: null });
      const { data, error } = await supabase
        .from('dreams')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;

      set({ dreams: data as Dream[], loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  getDreamPatterns: () => {
    const dreams = get().dreams;
    const patterns: DreamPatterns = {
      emotionFrequency: [],
      dreamTypeDistribution: [],
      recurringThemes: [],
      monthlyDreamCount: [],
    };

    // Calculate emotion frequency
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

    // Calculate dream type distribution
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

    // Calculate recurring themes
    const themeCount = new Map<string, number>();
    dreams.forEach((dream) => {
      dream.tags.forEach((tag) => {
        themeCount.set(tag, (themeCount.get(tag) || 0) + 1);
      });
    });
    patterns.recurringThemes = Array.from(themeCount.entries())
      .map(([theme, count]) => ({ theme, count }))
      .filter((item) => item.count > 1);

    // Calculate monthly dream count
    const monthCount = new Map<string, number>();
    dreams.forEach((dream) => {
      const month = new Date(dream.date).toLocaleString('default', { month: 'long' });
      monthCount.set(month, (monthCount.get(month) || 0) + 1);
    });
    patterns.monthlyDreamCount = Array.from(monthCount.entries()).map(([month, count]) => ({
      month,
      count,
    }));

    return patterns;
  },

  signIn: async (email: string, password: string) => {
    try {
      set({ loading: true, error: null });
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      set({
        user: { id: data.user.id, email: data.user.email! },
        loading: false,
      });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  signUp: async (email: string, password: string) => {
    try {
      set({ loading: true, error: null });
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      set({
        user: { id: data.user!.id, email: data.user!.email! },
        loading: false,
      });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  signOut: async () => {
    try {
      set({ loading: true, error: null });
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      set({ user: null, dreams: [], loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));