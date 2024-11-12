import { TicketEntity } from '../entities/ticket.entity';
import { UnitEntity } from 'src/units/entities/unit.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { SlaEntity } from 'src/slas/entities/sla.entity';
import { DepartmentEntity } from 'src/departments/entities/department.entity';

export class ReturnTicketDto {
  id: string;
  title: string;
  description: string;
  priority: string;
  status: string;
  category_name: string;
  user: UserEntity;
  technician: UserEntity;
  unit: UnitEntity;
  department: DepartmentEntity;
  sla: SlaEntity;
  created_at: Date;
  closed_at: Date;

  constructor(ticket: TicketEntity) {
    this.id = ticket.id;
    this.title = ticket.title;
    this.description = ticket.description;
    this.priority = ticket.priority;
    this.status = ticket.status;
    this.category_name = ticket.category_name;
    this.user = ticket.user;
    this.technician = ticket.technician;
    this.unit = ticket.unit;
    this.department = ticket.department;
    this.sla = ticket.sla;
    this.created_at = ticket.created_at;
    this.closed_at = ticket.closed_at;
  }
}
