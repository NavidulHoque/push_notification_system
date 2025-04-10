import { forwardRef, Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { SchedulerService } from './scheduler.service';
import { UserModule } from '../user/user.module';
import { PushNotificationsModule } from 'src/push-notifications/push-notifications.module';

@Module({
  imports: [
    BullModule.registerQueue({ name: 'pushQueue' }),
    UserModule,
    forwardRef(() => PushNotificationsModule)
  ],
  providers: [SchedulerService],
})
export class SchedulerModule { }