import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { SchedulerService } from './scheduler.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    BullModule.registerQueue({ name: 'pushQueue' }),
    UserModule,
  ],
  providers: [SchedulerService],
})
export class SchedulerModule {}