import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentsController } from './departments.controller';
import { DepartmentsService } from './departments.service';
import { DepartmentEntity } from './entities/department.entity';
import { UnitsModule } from 'src/units/units.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([DepartmentEntity]),
    UnitsModule,
  ],
  controllers: [DepartmentsController],
  providers: [DepartmentsService],
  exports: [DepartmentsService, TypeOrmModule],
})
export class DepartmentsModule {}