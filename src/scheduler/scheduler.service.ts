import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { PushNotificationDto } from 'src/push-notifications/dto';
import { UserService } from '../user/user.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PushNotificationsService } from '../push-notifications/push-notifications.service';

@Processor('pushQueue')
export class SchedulerService {
  constructor(
    private readonly userService: UserService,
    private readonly pushNotificationsService: PushNotificationsService,
  ) { }

  @Process('scheduled-push')
  async handleScheduledPush(job: Job<PushNotificationDto>) {
    try {
      const { title, message, scheduleAt } = job.data;
      if (!title || !message || !scheduleAt || isNaN(new Date(scheduleAt).getTime())) {
        throw new Error('❌ Corrupted notification data, skipping...');
      }

      const users = this.userService.getAllUsers();
      users.forEach((user) => {
        console.log(`📅 [Scheduled] Sent to ${user.name} [${user.deviceToken}]: ${title} - ${message}`);
      });
    }

    catch (err) {
      console.error(`❌ Error sending notification job id:[${job.id}]:`, err.message);
      throw err; // will trigger Bull's retry or move to failed queue
    }
  }

  @Cron(CronExpression.EVERY_MINUTE)
  handleDailyPush() {
    this.pushNotificationsService.cronSend();
  }
}