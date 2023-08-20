export interface NotificationChannel {
  sendNotification(message: string): Promise<void>;
}
