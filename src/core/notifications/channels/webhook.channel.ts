import {
  NotificationChannel,
  NotificationConfig,
} from '../notifications.types';

class WebhookNotificationChannel implements NotificationChannel {
  async sendNotification(message: string, config?: NotificationConfig) {
    // Implement webhook
    console.log('Sending a Webhook Notification...', message);
  }
}

export default WebhookNotificationChannel;
