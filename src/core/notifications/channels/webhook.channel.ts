import axios from 'axios';
import {
  NotificationChannel,
  NotificationOptions,
} from '../notifications.types';

class WebhookNotificationChannel implements NotificationChannel {
  async sendNotification(message: string, options?: NotificationOptions) {
    if (!options?.webhookUrl) {
      console.error('Error while sending email, invalid webhookUrl');
      return;
    }

    console.log('Sending a Webhook Notification...', message);

    try {
      const webhookUrl = options?.webhookUrl;
      await axios.post(webhookUrl, { message });
    } catch (error) {
      console.error('Error sending webhook notification:', error);
    }
  }
}

export default WebhookNotificationChannel;
