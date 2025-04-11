import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PushNotificationsModule } from './push-notifications/push-notifications.module';
import { ScheduleModule } from '@nestjs/schedule';
import { BullModule } from '@nestjs/bull';
import { SchedulerModule } from './scheduler/scheduler.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
      },
    }),
    UserModule,
    PushNotificationsModule,
    SchedulerModule,
  ],
})
export class AppModule { }