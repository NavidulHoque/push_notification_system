import { Body, Controller, Post } from '@nestjs/common';
import { PushNotificationsService } from './push-notifications.service';
import { PushNotificationDto } from './dto'; 

@Controller('push-notifications')
export class PushNotificationsController {
    constructor(private readonly pushNotificationsService: PushNotificationsService) { }

    @Post('send-now')
    sendNow(@Body() dto: PushNotificationDto) {
        return this.pushNotificationsService.sendNow(dto);
    }

    @Post('schedule')
    schedule(@Body() dto: PushNotificationDto) {
        return this.pushNotificationsService.schedule(dto);
    }
}
