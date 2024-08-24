import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartamentsController } from './departaments.controller';
import { DepartamentsService } from './departaments.service';
import { DepartamentEntity } from './entities/departament.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([DepartamentEntity])
    ],
    controllers: [DepartamentsController],
    providers: [DepartamentsService],
    exports: [DepartamentsService],
})
export class DepartamentsModule {}
