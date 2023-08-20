export interface NotificationConfig {
  email?: string;
  title?: string;
}

export interface NotificationChannel {
  sendNotification(message: string, config?: NotificationConfig): Promise<void>;
}
