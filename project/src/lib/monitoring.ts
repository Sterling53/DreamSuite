import { logger } from './logger';

interface PerformanceMetrics {
  responseTime: number;
  endpoint: string;
  status: number;
  timestamp: string;
}

class Monitoring {
  private static instance: Monitoring;
  private metrics: PerformanceMetrics[] = [];
  private readonly FLUSH_INTERVAL = 60000; // 1 minute

  private constructor() {
    setInterval(() => this.flushMetrics(), this.FLUSH_INTERVAL);
  }

  public static getInstance(): Monitoring {
    if (!Monitoring.instance) {
      Monitoring.instance = new Monitoring();
    }
    return Monitoring.instance;
  }

  private async flushMetrics() {
    if (this.metrics.length === 0) return;

    try {
      const averageResponseTime = this.metrics.reduce((acc, curr) => acc + curr.responseTime, 0) / this.metrics.length;
      const errorRate = this.metrics.filter(m => m.status >= 400).length / this.metrics.length;

      logger.info('Performance metrics', {
        averageResponseTime,
        errorRate,
        totalRequests: this.metrics.length,
        timestamp: new Date().toISOString()
      });

      this.metrics = [];
    } catch (error) {
      logger.error('Failed to flush metrics', { error });
    }
  }

  public trackRequest(endpoint: string, startTime: number, status: number) {
    const endTime = performance.now();
    const responseTime = endTime - startTime;

    this.metrics.push({
      responseTime,
      endpoint,
      status,
      timestamp: new Date().toISOString()
    });
  }
}

export const monitoring = Monitoring.getInstance();