import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SlasController } from './slas.controller';
import { SlasService } from './slas.service';
import { SlaEntity } from './entities/sla.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SlaEntity])],
  controllers: [SlasController],
  providers: [SlasService],
  exports: [SlasService, TypeOrmModule],
})
export class SlasModule {}