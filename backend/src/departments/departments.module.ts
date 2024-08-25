import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartamentsController } from './departments.controller';
import { DepartmentsService } from './departments.service';
import { DepartmentEntity } from './entities/department.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([DepartmentEntity])
    ],
    controllers: [DepartamentsController],
    providers: [DepartmentsService],
    exports: [DepartmentsService],
})
export class DepartamentsModule {}
