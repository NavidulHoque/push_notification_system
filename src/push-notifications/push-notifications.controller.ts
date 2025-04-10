import { Body, Controller, Post } from '@nestjs/common';
import { PushNotificationsService } from './push-notifications.service';
import { SendPushDto } from './dto/send-push.dto';

@Controller('push-notifications')
export class PushNotificationsController {
    constructor(private readonly pushNotificationsService: PushNotificationsService) { }

    @Post('send-now')
    sendNow(@Body() dto: SendPushDto) {
        return this.pushNotificationsService.sendNow(dto);
    }

    @Post('schedule')
    schedule(@Body() dto: SendPushDto) {
        return this.pushNotificationsService.schedule(dto);
    }
}
