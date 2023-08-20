export interface NotificationOptions {
  email?: string;
  title?: string;
  webhookUrl?: string;
}

export interface NotificationChannel {
  sendNotification(message: string, options?: NotificationOptions): Promise<void>;
}
