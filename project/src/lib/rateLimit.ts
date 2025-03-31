class RateLimiter {
  private limits: Map<string, { count: number; timestamp: number }> = new Map();
  private readonly windowMs: number;
  private readonly maxRequests: number;

  constructor(windowMs = 60000, maxRequests = 100) {
    this.windowMs = windowMs;
    this.maxRequests = maxRequests;
    
    // Cleanup old entries every minute
    setInterval(() => this.cleanup(), 60000);
  }

  private cleanup() {
    const now = Date.now();
    for (const [key, value] of this.limits.entries()) {
      if (now - value.timestamp > this.windowMs) {
        this.limits.delete(key);
      }
    }
  }

  public check(key: string): boolean {
    const now = Date.now();
    const record = this.limits.get(key);

    if (!record) {
      this.limits.set(key, { count: 1, timestamp: now });
      return true;
    }

    if (now - record.timestamp > this.windowMs) {
      this.limits.set(key, { count: 1, timestamp: now });
      return true;
    }

    if (record.count >= this.maxRequests) {
      return false;
    }

    record.count++;
    return true;
  }
}

export const rateLimiter = new RateLimiter();