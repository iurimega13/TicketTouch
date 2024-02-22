import { Module } from '@nestjs/common';
import { UnitEntity } from './entities/unit.entity';
import { UnitsController } from './units.controller';
import { UnitsService } from './units.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forFeature([UnitEntity])   ],
    controllers: [UnitsController],
    providers: [UnitsService],
    exports: [UnitsService]
})
export class UnitsModule {}
