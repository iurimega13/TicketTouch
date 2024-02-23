import { Module } from '@nestjs/common';
import { EquipmentsService } from './equipments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquipmentsController } from './equipments.controller';
import { EquipmentEntity } from './entities/equipment.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([EquipmentEntity])
  ],
  providers: [EquipmentsService],
  controllers: [EquipmentsController],
  exports: [EquipmentsService]
})
export class EquipmentsModule {}
