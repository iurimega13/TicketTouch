import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSettingsController } from './user-settings.controller';
import { UserSettingsService } from './user-settings.service';
import { SettingsEntity } from './entities/settings.entity';
import { UserModule } from '../users/user.module'; // Importe o UserModule

@Module({
  imports: [
    TypeOrmModule.forFeature([SettingsEntity]),
    forwardRef(() => UserModule), // Use forwardRef aqui
  ],
  controllers: [UserSettingsController],
  providers: [UserSettingsService],
  exports: [UserSettingsService],
})
export class UserSettingsModule {}
