import EmailService from '../../services/email.service';
import {
  NotificationChannel,
  NotificationOptions,
} from '../notifications.types';

class EmailNotificationChannel implements NotificationChannel {
  async sendNotification(message: string, options?: NotificationOptions) {
    if (!options?.email || !options.title) {
      console.error(
        'Error while sending email, invalid email address or title'
      );
      return;
    }

    console.log('Sending an Email Notification to ', options.email, message);

    await EmailService.sendEmail(
      options.email, // recipient example
      options.title,
      message
    );
  }
}

export default EmailNotificationChannel;
