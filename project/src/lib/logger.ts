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
  private flushPromise: Promise<void> | null = null;
  private readonly MAX_RETRIES = 3;
  private readonly RETRY_DELAY = 1000; // 1 second
  private readonly MAX_BATCH_SIZE = 50;
  private readonly FLUSH_INTERVAL = 30000; // 30 seconds

  private constructor() {
    // Initialize flush interval
    setInterval(() => this.flush(), this.FLUSH_INTERVAL);

    // Load any failed logs from local storage
    this.loadFailedLogs();

    // Attempt to flush logs when the page is being unloaded
    window.addEventListener('beforeunload', () => {
      if (this.batchedLogs.length > 0) {
        this.storeLogsLocally(this.batchedLogs);
      }
    });
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private async loadFailedLogs(): Promise<void> {
    try {
      const failedLogs = JSON.parse(localStorage.getItem('failedLogs') || '[]');
      if (failedLogs.length > 0) {
        this.batchedLogs.push(...failedLogs);
        localStorage.removeItem('failedLogs');
      }
    } catch (error) {
      console.error('Failed to load failed logs:', error);
    }
  }

  private async retryWithBackoff(
    operation: () => Promise<void>,
    retries: number = this.MAX_RETRIES
  ): Promise<void> {
    for (let i = 0; i < retries; i++) {
      try {
        await operation();
        return;
      } catch (error) {
        if (i === retries - 1) throw error;
        await new Promise(resolve => setTimeout(resolve, this.RETRY_DELAY * Math.pow(2, i)));
      }
    }
  }

  private async flush(): Promise<void> {
    if (this.batchedLogs.length === 0 || this.flushPromise) {
      return;
    }

    const logsToFlush = this.batchedLogs.slice(0, this.MAX_BATCH_SIZE);
    this.batchedLogs = this.batchedLogs.slice(this.MAX_BATCH_SIZE);

    this.flushPromise = (async () => {
      try {
        // Get the current session
        const { data: { session } } = await supabase.auth.getSession();
        
        // Process logs in smaller chunks to avoid request size limits
        const chunkSize = 10;
        for (let i = 0; i < logsToFlush.length; i += chunkSize) {
          const chunk = logsToFlush.slice(i, i + chunkSize).map(log => ({
            ...log,
            user_id: session?.user?.id || null,
          }));

          await this.retryWithBackoff(async () => {
            const { error } = await supabase
              .from(this.TABLE_NAME)
              .insert(chunk);

            if (error) throw error;
          });
        }
      } catch (error) {
        // If insertion fails, store logs locally
        this.storeLogsLocally(logsToFlush);
        console.error('Failed to flush logs:', error);
      } finally {
        this.flushPromise = null;
      }
    })();

    return this.flushPromise;
  }

  private storeLogsLocally(logs: LogEntry[]): void {
    try {
      const storedLogs = JSON.parse(localStorage.getItem('failedLogs') || '[]');
      const updatedLogs = [...storedLogs, ...logs];
      
      // Limit the number of stored logs to prevent localStorage from getting too full
      const maxStoredLogs = 1000;
      const logsToStore = updatedLogs.slice(-maxStoredLogs);
      
      localStorage.setItem('failedLogs', JSON.stringify(logsToStore));
    } catch (error) {
      console.error('Failed to store logs locally:', error);
    }
  }

  private log(level: LogLevel, message: string, context?: Record<string, unknown>): void {
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

    // Flush if we have enough logs
    if (this.batchedLogs.length >= this.MAX_BATCH_SIZE) {
      this.flush().catch(error => {
        console.error('Failed to flush logs:', error);
      });
    }
  }

  public info(message: string, context?: Record<string, unknown>): void {
    this.log('info', message, context);
  }

  public warn(message: string, context?: Record<string, unknown>): void {
    this.log('warn', message, context);
  }

  public error(message: string, context?: Record<string, unknown>): void {
    this.log('error', message, context);
  }

  public async retryFailedLogs(): Promise<void> {
    try {
      const failedLogs = JSON.parse(localStorage.getItem('failedLogs') || '[]');
      if (failedLogs.length > 0) {
        localStorage.removeItem('failedLogs');
        this.batchedLogs.push(...failedLogs);
        await this.flush();
      }
    } catch (error) {
      console.error('Failed to retry failed logs:', error);
    }
  }
}

export const logger = Logger.getInstance();