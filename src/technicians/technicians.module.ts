import { Module } from '@nestjs/common';
import { TechniciansController } from './technicians.controller';
import { TechniciansService } from './technicians.service';

@Module({
  controllers: [TechniciansController],
  providers: [TechniciansService]
})
export class TechniciansModule {}
