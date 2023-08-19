import cron from 'node-cron';
import { UrlDocument } from '../../api/urls/url.model';
import healthCheckService from './health-check.service';

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

  scheduleUrlChecks(url: UrlDocument) {
    if (this.scheduledJobs[url._id.toString()]) {
      // If job already exists, cancel it and reschedule
      this.cancelUrlCheck(url._id.toString());
    }

    const intervalInSeconds = url.interval || defaultValues.defaultInterval;

    // Schedule the check function to run at the specified interval
    const job = cron.schedule(`*/${intervalInSeconds} * * * * *`, async () => {
      console.log('====================================');
      console.log(`Checking ${url.fullUrl}`); // TODO: REMOVE LOGS
      console.log('====================================');
      const result = await healthCheckService.performUrlCheck(url);

      // TODO: handle notifications and sockets here
      console.log('====================================');
      console.log(`${result.status} ${url.fullUrl}`); // TODO: REMOVE LOGS
      console.log('====================================');
    });

    // Start the newly created job
    job.start();

    console.log('====================================');
    console.log(`A new job stared for ${url.fullUrl}`); // TODO: REMOVE LOGS
    console.log('====================================');

    // Store the job in the scheduledJobs object
    this.scheduledJobs[url._id.toString()] = job;
  }

  cancelUrlCheck(urlId: string) {
    if (this.scheduledJobs[urlId]) {
      this.scheduledJobs[urlId].stop();
      delete this.scheduledJobs[urlId];
      console.log('====================================');
      console.log(`Url of id ${urlId} is canceled`); // TODO: REMOVE LOGS
      console.log('====================================');
    }
  }

  // Add more cron job ...
}

export default CronJobService.getInstance();
