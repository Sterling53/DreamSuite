import { rateLimiter } from './rateLimit';
import { monitoring } from './monitoring';
import { logger } from './logger';
import { supabase } from './supabase';

interface ApiOptions {
  method?: string;
  body?: unknown;
  headers?: Record<string, string>;
}

export async function api(endpoint: string, options: ApiOptions = {}) {
  const startTime = performance.now();
  
  try {
    // Check rate limit
    const key = `${endpoint}-${options.method || 'GET'}`;
    if (!rateLimiter.check(key)) {
      throw new Error('Rate limit exceeded');
    }

    // Get the current session
    const { data: { session } } = await supabase.auth.getSession();

    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}${endpoint}`, {
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session?.access_token}`,
        ...options.headers,
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
    });

    monitoring.trackRequest(endpoint, startTime, response.status);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`API request failed: ${errorData.error || response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    logger.error(`API Error: ${endpoint}`, {
      error: error.message,
      method: options.method,
      endpoint,
    });
    throw error;
  }
}