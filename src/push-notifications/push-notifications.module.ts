import { Module, forwardRef } from '@nestjs/common';
import { PushNotificationsController } from './push-notifications.controller';
import { PushNotificationsService } from './push-notifications.service';
import { UserModule } from 'src/user/user.module';
import { BullModule } from '@nestjs/bull';
import { SchedulerModule } from 'src/scheduler/scheduler.module';

@Module({
  imports: [UserModule, BullModule.registerQueue({ name: 'pushQueue' }), forwardRef(() => SchedulerModule)],
  controllers: [PushNotificationsController],
  providers: [PushNotificationsService],
  exports: [PushNotificationsService]
})
export class PushNotificationsModule { }
