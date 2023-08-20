import { NotificationChannel } from '../notifications.types';

class EmailNotificationChannel implements NotificationChannel {
  async sendNotification(message: string) {
    // Implement email sending
    console.log('Sending an Email Notification...', message);
  }
}

export default EmailNotificationChannel;
