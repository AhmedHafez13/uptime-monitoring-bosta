import {
  NotificationChannel,
  NotificationOptions,
} from '../notifications/notifications.types';

class NotificationService {
  private static instance: NotificationService;
  private channels: NotificationChannel[] = [];

  private constructor() {}

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  registerChannel(channel: NotificationChannel) {
    this.channels.push(channel);
  }

  registerChannels(channels: NotificationChannel[]) {
    for (const channel of channels) {
      this.channels.push(channel);
    }
  }

  async sendNotification(message: string, options?: NotificationOptions) {
    for (const channel of this.channels) {
      await channel.sendNotification(message, options);
    }
  }
}

export default NotificationService.getInstance();
