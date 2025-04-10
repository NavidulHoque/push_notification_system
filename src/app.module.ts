import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PushNotificationsModule } from './push-notifications/push-notifications.module';
import { ScheduleModule } from '@nestjs/schedule';
import { BullModule } from '@nestjs/bull';
import { SchedulerModule } from './scheduler/scheduler.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    UserModule,
    PushNotificationsModule,
    SchedulerModule,
  ],
})
export class AppModule { }