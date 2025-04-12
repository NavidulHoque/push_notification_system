import { BadRequestException, Injectable } from '@nestjs/common';
import { PushNotificationDto } from './dto';
import { InjectQueue } from '@nestjs/bull';
import { UserService } from 'src/user/user.service';
import { Queue } from 'bull';

@Injectable()
export class PushNotificationsService {
    constructor(
        private readonly userService: UserService,
        @InjectQueue('pushQueue') private readonly pushQueue: Queue,
    ) { }

    sendNow(dto: PushNotificationDto) {
        const users = this.userService.getAllUsers();

        users.forEach((user) => {
            console.log(`Sent to ${user.name} (${user.deviceToken}): ${dto.title} - ${dto.message}`)
        });

        return { message: 'Notifications sent immediately.' };
    }

    async schedule(dto: PushNotificationDto) {

        try {
            const delay = new Date(dto?.scheduleAt as string).getTime() - new Date().getTime();

            if (isNaN(delay) || delay < 0) {
                throw new BadRequestException('Invalid schedule time');
            }

            await this.pushQueue.add('scheduled-push', dto, { delay });
            return { message: 'Notification scheduled successfully.' };
        }

        catch (error) {
            throw error;
        }
    }

    cronSend() {
        const users = this.userService.getAllUsers();
        users.forEach((user) => {
            console.log(`[CRON] Sent to ${user.name} [${user.deviceToken}]: Every Minute Cron Notification`);
        });
    }
}
