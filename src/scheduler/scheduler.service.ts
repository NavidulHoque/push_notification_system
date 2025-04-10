import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { SendPushDto } from '../push-notifications/dto/send-push.dto';
import { UserService } from '../user/user.service';

@Processor('pushQueue')
export class SchedulerService {
    constructor(private readonly userService: UserService) { }

    @Process('scheduled-push')
    async handleScheduledPush(job: Job<SendPushDto>) {
        const { title, message } = job.data;
        const users = this.userService.getAllUsers();
        users.forEach((user) => {
            console.log(`📅 [Scheduled] Sent to ${user.name} [${user.deviceToken}]: ${title} - ${message}`);
        });
    }
}