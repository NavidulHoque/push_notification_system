import { IsNotEmpty, IsOptional, IsString, IsISO8601 } from 'class-validator';

export class PushNotificationDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsISO8601()
  @IsOptional()
  scheduleAt?: string;
}