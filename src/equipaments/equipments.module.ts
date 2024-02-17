import { Module } from '@nestjs/common';
import { EquipmentsService } from './equipments.service';

@Module({
  providers: [EquipmentsService]
})
export class EquipmentsModule {}
