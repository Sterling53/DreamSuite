import { supabase } from './supabase';

type LogLevel = 'info' | 'warn' | 'error';

interface LogEntry {
  level: LogLevel;
  message: string;
  context?: Record<string, unknown>;
  timestamp: string;
  user_id?: string;
}

class Logger {
  private static instance: Logger;
  private readonly TABLE_NAME = 'logs';
  private batchedLogs: LogEntry[] = [];
  private batchTimeout: number | null = null;

  private constructor() {
    // Initialize flush interval
    setInterval(() => this.flush(), 30000); // Flush every 30 seconds
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private async flush() {
    if (this.batchedLogs.length === 0) return;

    const logs = [...this.batchedLogs];
    this.batchedLogs = [];

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      // Filter logs based on authentication status
      const processedLogs = logs.map(log => ({
        ...log,
        user_id: user?.id || null, // Set user_id to null if not authenticated
      }));

      const { error } = await supabase
        .from(this.TABLE_NAME)
        .insert(processedLogs);

      if (error) {
        console.error('Failed to flush logs:', error);
        // Store failed logs in localStorage for retry
        const failedLogs = JSON.parse(localStorage.getItem('failedLogs') || '[]');
        localStorage.setItem('failedLogs', JSON.stringify([...failedLogs, ...logs]));
      }
    } catch (error) {
      console.error('Error flushing logs:', error);
      // Store failed logs in localStorage for retry
      const failedLogs = JSON.parse(localStorage.getItem('failedLogs') || '[]');
      localStorage.setItem('failedLogs', JSON.stringify([...failedLogs, ...logs]));
    }
  }

  private log(level: LogLevel, message: string, context?: Record<string, unknown>) {
    const entry: LogEntry = {
      level,
      message,
      context,
      timestamp: new Date().toISOString(),
    };

    // Always log to console in development
    if (import.meta.env.DEV) {
      console[level](message, context);
    }

    this.batchedLogs.push(entry);

    // Flush immediately if we have enough logs
    if (this.batchedLogs.length >= 10) {
      this.flush();
    }
  }

  public info(message: string, context?: Record<string, unknown>) {
    this.log('info', message, context);
  }

  public warn(message: string, context?: Record<string, unknown>) {
    this.log('warn', message, context);
  }

  public error(message: string, context?: Record<string, unknown>) {
    this.log('error', message, context);
  }

  // Retry failed logs
  public async retryFailedLogs() {
    const failedLogs = JSON.parse(localStorage.getItem('failedLogs') || '[]');
    if (failedLogs.length > 0) {
      localStorage.removeItem('failedLogs');
      this.batchedLogs.push(...failedLogs);
      await this.flush();
    }
  }
}

export const logger = Logger.getInstance();