export interface SpeedTestResult {
  downloadSpeed: number;
  uploadSpeed: number;
  ping: number;
  timestamp: Date;
}

export type Theme = 'dark' | 'light';