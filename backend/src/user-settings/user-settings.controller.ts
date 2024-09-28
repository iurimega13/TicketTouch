import { Controller, Get, Put, Body, Param, Request } from '@nestjs/common';
import { UserSettingsService } from './user-settings.service';
import { UpdateSettingsDto } from './dtos/updateSettings.dto';

@Controller('user-settings')
export class UserSettingsController {
  constructor(private readonly userSettingsService: UserSettingsService) {}

  @Get(':userId')
  async getSettings(@Param('userId') userId: string) {
    return this.userSettingsService.findSettingsByUserId(userId);
  }

  @Put(':userId') // Aceitando o ID do usuário como parâmetro
  async updateSettings(@Param('userId') userId: string, @Body() updateSettingsDto: UpdateSettingsDto) {
    return this.userSettingsService.updateSettings(userId, updateSettingsDto);
  }
}
