import { Module } from '@nestjs/common';
import { UnitEntity } from './entities/unit.entity';
import { UnitsController } from './units.controller';
import { UnitsService } from './units.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([UnitEntity])],
    providers: [UnitsService],
    controllers: [UnitsController],
    exports: [TypeOrmModule, UnitsService], // Exporta o TypeOrmModule para que outros módulos possam usar o UnitEntity
  })
  export class UnitsModule {}
