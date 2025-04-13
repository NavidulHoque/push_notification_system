import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { PushNotificationsService } from './push-notifications.service';
import { PushNotificationDto } from './dto';

@Controller('push')
export class PushNotificationsController {
    constructor(private readonly pushNotificationsService: PushNotificationsService) { }

    @Post('send-now')
    @HttpCode(200)
    sendNow(@Body() dto: PushNotificationDto) {
        return this.pushNotificationsService.sendNow(dto);
    }

    @Post('schedule')
    @HttpCode(200)
    schedule(@Body() dto: PushNotificationDto) {
        return this.pushNotificationsService.schedule(dto);
    }
}
