import EmailService from '../../services/email.service';
import {
  NotificationChannel,
  NotificationConfig,
} from '../notifications.types';

class EmailNotificationChannel implements NotificationChannel {
  async sendNotification(message: string, config?: NotificationConfig) {
    if (!config?.email || !config.title) {
      console.error(
        'Error while sending email, invalid email address or title'
      );
      return;
    }

    console.log('Sending an Email Notification to ', config.email, message);

    await EmailService.sendEmail(
      config.email, // recipient example
      config.title,
      message
    );
  }
}

export default EmailNotificationChannel;
