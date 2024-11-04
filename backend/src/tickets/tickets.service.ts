import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { TicketEntity } from './entities/ticket.entity';
import { CreateTicketDto } from './dtos/createTicket.dto';
import { UpdateTicketDto } from './dtos/updateTicket.dto';
import { DepartmentEntity } from 'src/departments/entities/department.entity';
import { UnitEntity } from 'src/units/entities/unit.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { SlaEntity } from 'src/slas/entities/sla.entity';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(TicketEntity)
    private readonly ticketRepository: Repository<TicketEntity>,
    @InjectRepository(DepartmentEntity)
    private readonly departmentRepository: Repository<DepartmentEntity>,
    @InjectRepository(UnitEntity)
    private readonly unitRepository: Repository<UnitEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(SlaEntity)
    private readonly slaRepository: Repository<SlaEntity>,
  ) {}

  async createTicket(createTicketDto: CreateTicketDto): Promise<TicketEntity> {
    // Busca entidades relacionadas para `user`, `unit` e `department`
    const user = await this.userRepository.findOneBy({ id: createTicketDto.user_id });
    if (!user) throw new NotFoundException('User not found');

    const unit = await this.unitRepository.findOneBy({ id: createTicketDto.unit_id });
    if (!unit) throw new NotFoundException('Unit not found');

    const department = await this.departmentRepository.findOneBy({ id: createTicketDto.department_id });
    if (!department) throw new NotFoundException('Department not found');

    const sla = await this.slaRepository.findOneBy({ id: createTicketDto.sla_id });
    if (!sla) throw new NotFoundException('SLA not found');

    // Cria o novo ticket com entidades relacionadas e título gerado
    const ticket = this.ticketRepository.create({
      ...createTicketDto,
      user,
      unit,
      department,
      sla,
    });

    return await this.ticketRepository.save(ticket);
  }

  async getAllTickets(filter: string): Promise<TicketEntity[]> {
    const whereCondition = filter === 'closed' ? { status: 'Fechado' } : { status: 'Aberto' };
    return await this.ticketRepository.find({ where: whereCondition });
  }

  async getLastTicketByType(type: 'incident' | 'serviceRequest'): Promise<TicketEntity | null> {
    const prefix = type === 'incident' ? 'INC' : 'SOL';

    const lastTicket = await this.ticketRepository.findOne({
        where: { 
            title: Like(`${prefix}-%`) 
        },
        order: { created_at: 'DESC' },
    });

    return lastTicket || null;
}

  async updateTicket(id: string, updateTicketDto: UpdateTicketDto) {
    const ticket = await this.ticketRepository.findOneBy({ id });
    if (!ticket) throw new NotFoundException('Ticket not found');
    Object.assign(ticket, updateTicketDto);
    return await this.ticketRepository.save(ticket);
  }

  async getTicketById(id: string): Promise<TicketEntity> {
    return await this.ticketRepository.findOne({
      where: { id },
      relations: ['user', 'technician', 'unit', 'department', 'sla'],
    });
  }

  async cancelTicket(id: string) {
    const ticket = await this.ticketRepository.findOneBy({ id });
    if (!ticket) throw new NotFoundException('Ticket not found');
    ticket.status = 'Fechado';
    await this.ticketRepository.save(ticket);
  }
  
}