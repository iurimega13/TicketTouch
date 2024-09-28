import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SettingsEntity } from './entities/settings.entity';
import { CreateSettingsDto } from './dtos/createSettings.dto';
import { UpdateSettingsDto } from './dtos/updateSettings.dto';

@Injectable()
export class UserSettingsService {
  constructor(
    @InjectRepository(SettingsEntity)
    private readonly userSettingsRepository: Repository<SettingsEntity>,
  ) {}

  async findSettingsByUserId(user_id: string): Promise<SettingsEntity> {
    const settings = await this.userSettingsRepository.findOne({ where: { user: { id: user_id } } });
    if (!settings) {
      throw new NotFoundException(`Settings for user with ID ${user_id} not found`);
    }
    return settings;
  }

  async createSettings(createSettingsDto: CreateSettingsDto): Promise<SettingsEntity> {
    const settings = this.userSettingsRepository.create(createSettingsDto);
    return this.userSettingsRepository.save(settings);
  }

  async updateSettings(user_id: string, updateSettingsDto: UpdateSettingsDto): Promise<SettingsEntity> {
    const settings = await this.userSettingsRepository.findOne({ where: { user: { id: user_id } } });
    if (!settings) {
      throw new NotFoundException(`Settings for user with ID ${user_id} not found`);
    }
    Object.assign(settings, updateSettingsDto);
    return this.userSettingsRepository.save(settings);
  }

  async deleteSettings(user_id: string): Promise<boolean> {
    const result = await this.userSettingsRepository.delete({ user: { id: user_id } });
    return result.affected > 0;
  }
}