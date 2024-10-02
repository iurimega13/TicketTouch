import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SettingsEntity } from './entities/settings.entity';
import { CreateSettingsDto } from './dtos/createSettings.dto';
import { UpdateSettingsDto } from './dtos/updateSettings.dto';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class UserSettingsService {
  constructor(
    @InjectRepository(SettingsEntity)
    private readonly userSettingsRepository: Repository<SettingsEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findSettingsByUserId(userId: string): Promise<SettingsEntity> {
    const settings = await this.userSettingsRepository.findOne({ where: { user: { id: userId } } });
    if (!settings) {
      throw new NotFoundException('Configurações não encontradas para o usuário');
    }
    return settings;
  }

  async updateSettings(userId: string, updateSettingsDto: UpdateSettingsDto): Promise<SettingsEntity> {
    const settings = await this.findSettingsByUserId(userId);
    Object.assign(settings, updateSettingsDto);
    return this.userSettingsRepository.save(settings);
  }

  async createSettings(userId: string, createSettingsDto: CreateSettingsDto): Promise<SettingsEntity> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const settings = this.userSettingsRepository.create({
      ...createSettingsDto,
      user,
    });
    return this.userSettingsRepository.save(settings);
  }
}