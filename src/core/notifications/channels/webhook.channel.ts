import { NotificationChannel } from '../notifications.types';

class WebhookNotificationChannel implements NotificationChannel {
  async sendNotification(message: string) {
    // Implement webhook
    console.log('Sending a Webhook Notification...', message);
  }
}

export default WebhookNotificationChannel;
