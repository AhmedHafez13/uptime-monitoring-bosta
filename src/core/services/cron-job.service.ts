import cron from 'node-cron';
import { UrlDocument } from '../../api/urls/url.model';
import healthCheckService from './health-check.service';
import NotificationService from './notification.service';
import { StatusEnum } from '../utils/app.enums';

const defaultValues = {
  defaultInterval: 600000,
};

class CronJobService {
  private static instance: CronJobService;
  private scheduledJobs: Record<string, cron.ScheduledTask> = {};

  private constructor() {}

  static getInstance(): CronJobService {
    if (!CronJobService.instance) {
      CronJobService.instance = new CronJobService();
    }
    return CronJobService.instance;
  }

  scheduleUrlChecks(url: UrlDocument, userEmail: string) {
    if (this.scheduledJobs[url._id.toString()]) {
      // If job already exists, cancel it and reschedule
      this.cancelUrlCheck(url._id.toString());
    }

    const intervalInSeconds = url.interval || defaultValues.defaultInterval;

    // Schedule the check function to run at the specified interval
    const job = cron.schedule(`*/${intervalInSeconds} * * * * *`, async () => {
      console.log('================='); // TODO: REMOVE LOGS
      console.log(`Checking ${url.fullUrl}`);

      const result = await healthCheckService.performUrlCheck(url);

      console.log('================='); // TODO: REMOVE LOGS
      console.log(`${result.status} ${url.fullUrl}`);

      if (result.status === StatusEnum.Down && result.urlReport) {
        const history = result.urlReport.history;
        const threshold = url.threshold || 1;

        if (history.length >= threshold) {
          const isAllDown = history
            .slice(-threshold)
            .every((item) => item.status === StatusEnum.Down);

          if (isAllDown) {
            await NotificationService.sendNotification(
              `${result.status} ${url.fullUrl}`,
              {
                email: userEmail,
                title: `[Alert] ${url.name} is Down!`,
                webhookUrl: url.webhook,
              }
            );
          }
        }
      }

      // TODO: handle sockets ...
    });

    // Start the newly created job
    job.start();

    console.log('================='); // TODO: REMOVE LOGS
    console.log(`A new job stared for ${url.fullUrl}`);

    // Store the job in the scheduledJobs object
    this.scheduledJobs[url._id.toString()] = job;
  }

  cancelUrlCheck(urlId: string) {
    if (this.scheduledJobs[urlId]) {
      this.scheduledJobs[urlId].stop();
      delete this.scheduledJobs[urlId];

      console.log('================='); // TODO: REMOVE LOGS
      console.log(`Url check of id ${urlId} is canceled`);
    }
  }

  // Add more cron job ...
}

export default CronJobService.getInstance();
