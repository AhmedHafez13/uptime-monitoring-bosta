import EmailNotificationChannel from "../notifications/channels/email.channel";
import WebhookNotificationChannel from "../notifications/channels/webhook.channel";
import NotificationService from "../services/notification.service";

class NotificationsConfig {
  constructor() {
    this.initializeNotificationChannels();
  }

  private initializeNotificationChannels() {
    NotificationService.registerChannels([
      new EmailNotificationChannel(),
      new WebhookNotificationChannel(),
      // Register more here ...
    ]);
  }
}

export default NotificationsConfig;
