import { Controller, Get, Put, Post, Body, Param, Request } from '@nestjs/common';
import { UserSettingsService } from './user-settings.service';
import { UpdateSettingsDto } from './dtos/updateSettings.dto';
import { CreateSettingsDto } from './dtos/createSettings.dto';

@Controller('user-settings')
export class UserSettingsController {
  constructor(private readonly userSettingsService: UserSettingsService) {}

  @Get(':userId')
  async getSettings(@Param('userId') userId: string) {
    return this.userSettingsService.findSettingsByUserId(userId);
  }

  @Put(':userId')
  async updateSettings(@Param('userId') userId: string, @Body() updateSettingsDto: UpdateSettingsDto) {
    return this.userSettingsService.updateSettings(userId, updateSettingsDto);
  }

  @Post(':userId')
  async createSettings(@Param('userId') userId: string, @Body() createSettingsDto: CreateSettingsDto) {
    return this.userSettingsService.createSettings(userId, createSettingsDto);
  }
}