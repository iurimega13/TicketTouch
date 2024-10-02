import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentsController } from './departments.controller';
import { DepartmentsService } from './departments.service';
import { DepartmentEntity } from './entities/department.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([DepartmentEntity])
    ],
    controllers: [DepartmentsController],
    providers: [DepartmentsService],
    exports: [DepartmentsService, TypeOrmModule],
})
export class DepartmentsModule {}
