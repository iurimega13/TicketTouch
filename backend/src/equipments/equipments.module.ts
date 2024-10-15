import { Module } from '@nestjs/common';
import { EquipmentsService } from './equipments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquipmentsController } from './equipments.controller';
import { EquipmentEntity } from './entities/equipment.entity';
import { DepartmentsModule } from 'src/departments/departments.module';
import { UnitsModule } from 'src/units/units.module';
import { UserModule } from 'src/users/user.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([EquipmentEntity]),
    UnitsModule, 
    DepartmentsModule,
    UserModule,
  ],
  providers: [EquipmentsService],
  controllers: [EquipmentsController],
  exports: [EquipmentsService, TypeOrmModule]
})
export class EquipmentsModule {}
