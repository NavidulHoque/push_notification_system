import { Module } from '@nestjs/common';
import { PushNotificationsController } from './push-notifications.controller';
import { PushNotificationsService } from './push-notifications.service';
import { UserModule } from 'src/user/user.module';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [UserModule, BullModule.registerQueue({ name: 'pushQueue' })],
  controllers: [PushNotificationsController],
  providers: [PushNotificationsService]
})
export class PushNotificationsModule {}
