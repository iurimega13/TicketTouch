import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';
import { TicketEntity } from './entities/ticket.entity';
import { DepartmentEntity } from 'src/departments/entities/department.entity';
import { UnitEntity } from 'src/units/entities/unit.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { SlaEntity } from 'src/slas/entities/sla.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TicketEntity,
      DepartmentEntity,
      UnitEntity,
      UserEntity,
      SlaEntity,
    ]),
  ],
  controllers: [TicketsController],
  providers: [TicketsService],
})
export class TicketsModule {}