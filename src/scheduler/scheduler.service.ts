import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { SendPushDto } from '../push-notifications/dto/send-push.dto';
import { UserService } from '../user/user.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PushNotificationsService } from '../push-notifications/push-notifications.service';

@Processor('pushQueue')
export class SchedulerService {
  constructor(
    private readonly userService: UserService,
    private readonly pushNotificationsService: PushNotificationsService,
  ) {}

  @Process('scheduled-push')
  async handleScheduledPush(job: Job<SendPushDto>) {
    const { title, message } = job.data;
    const users = this.userService.getAllUsers();
    users.forEach((user) => {
      console.log(`📅 [Scheduled] Sent to ${user.name} [${user.deviceToken}]: ${title} - ${message}`);
    });
  }

  @Cron(CronExpression.EVERY_DAY_AT_9AM)
  handleDailyPush() {
    this.pushNotificationsService.cronSend();
  }
}