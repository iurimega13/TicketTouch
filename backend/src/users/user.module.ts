import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UnitsModule } from '../units/units.module';
import { DepartmentsModule } from '../departments/departments.module';
import { UserSettingsModule } from '../user-settings/user-settings.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    UnitsModule,
    DepartmentsModule,
    forwardRef(() => UserSettingsModule), // Use forwardRef aqui
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService, TypeOrmModule],
})
export class UserModule {}
