import { Injectable } from '@nestjs/common';
import { SendPushDto } from './dto/send-push.dto';
import { InjectQueue } from '@nestjs/bull';
import { UserService } from 'src/user/user.service';
import { Queue } from 'bull';

@Injectable()
export class PushNotificationsService {
    constructor(
        private readonly userService: UserService,
        @InjectQueue('pushQueue') private readonly pushQueue: Queue,
    ) { }

    sendNow(dto: SendPushDto) {
        const users = this.userService.getAllUsers();
        users.forEach((user) => {
            console.log(`✅ Sent to ${user.name} [${user.deviceToken}]: ${dto.title} - ${dto.message}`);
        });
        return { message: 'Notifications sent immediately.' };
    }

    async schedule(dto: SendPushDto) {
        const delay = new Date(dto?.scheduleAt as string).getTime() - Date.now();
        await this.pushQueue.add('scheduled-push', dto, { delay });
        return { message: 'Notification scheduled successfully.' };
    }

    cronSend() {
        const users = this.userService.getAllUsers();
        users.forEach((user) => {
            console.log(`⏰ [CRON] Sent to ${user.name} [${user.deviceToken}]: Daily Cron Notification`);
        });
    }
}
