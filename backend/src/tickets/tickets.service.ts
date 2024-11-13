import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Like, Repository } from 'typeorm';
import { TicketEntity } from './entities/ticket.entity';
import { CreateTicketDto } from './dtos/createTicket.dto';
import { UpdateTicketDto } from './dtos/updateTicket.dto';
import { DepartmentEntity } from 'src/departments/entities/department.entity';
import { UnitEntity } from 'src/units/entities/unit.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { SlaEntity } from 'src/slas/entities/sla.entity';
import { FeedbackEntity } from 'src/user-feedback/entities/feedback.entity';

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
    @InjectRepository(FeedbackEntity)
    private readonly feedbackRepository: Repository<FeedbackEntity>,
  ) {}

  async createTicket(createTicketDto: CreateTicketDto): Promise<TicketEntity> {
    const user = await this.userRepository.findOneBy({
      id: createTicketDto.user_id,
    });
    if (!user) throw new NotFoundException('User not found');

    const unit = await this.unitRepository.findOneBy({
      id: createTicketDto.unit_id,
    });
    if (!unit) throw new NotFoundException('Unit not found');

    const department = await this.departmentRepository.findOneBy({
      id: createTicketDto.department_id,
    });
    if (!department) throw new NotFoundException('Department not found');

    const sla = await this.slaRepository.findOneBy({
      id: createTicketDto.sla_id,
    });
    if (!sla) throw new NotFoundException('SLA not found');

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
    const whereCondition: any = {};

    if (filter === 'closed') {
      whereCondition.status = 'Fechado';
    } else if (filter === 'open') {
      whereCondition.status = In(['Aberto', 'Em Andamento']);
    }

    console.log('getAllTickets - Condição de busca:', whereCondition);
    return await this.ticketRepository.find({ where: whereCondition });
  }

  async getAllTicketsSupport(
    filter: string,
    type?: string,
  ): Promise<TicketEntity[]> {
    const whereCondition: any = {};

    // Define a condição para incluir 'Em Andamento' junto com 'Aberto' quando o filtro é 'open'
    if (filter === 'closed') {
      whereCondition.status = 'Fechado';
    } else if (filter === 'open') {
      whereCondition.status = In(['Aberto', 'Em Andamento']);
    }

    // Adiciona o tipo de ticket baseado no parâmetro fornecido
    if (type) {
      whereCondition.title =
        type === 'incident' ? Like('INC-%') : Like('SOL-%');
    }

    console.log('getAllTicketsSupport - Condição de busca:', whereCondition);
    const tickets = await this.ticketRepository.find({
      where: whereCondition,
      relations: ['user', 'technician', 'unit', 'department', 'sla'],
    });
    console.log('getAllTicketsSupport - Tickets encontrados:', tickets);

    return tickets;
  }

  async getTicketsByTechnician(
    technicianId: string,
    filter: string,
  ): Promise<TicketEntity[]> {
    const whereCondition: any = {
      technician: { id: technicianId },
    };

    if (filter === 'closed') {
      whereCondition.status = 'Fechado';
    } else if (filter === 'open') {
      whereCondition.status = In(['Aberto', 'Em Andamento']);
    }

    return this.ticketRepository.find({
      where: whereCondition,
      relations: ['user', 'technician', 'unit', 'department', 'sla'],
    });
  }

  async getTicketById(id: string): Promise<TicketEntity> {
    const ticket = await this.ticketRepository.findOne({
      where: { id },
      relations: ['user', 'technician', 'unit', 'department', 'sla'],
    });

    if (!ticket) throw new NotFoundException('Ticket not found');
    console.log('getTicketById - Ticket encontrado:', ticket);
    return ticket;
  }

  async getLastTicketByType(
    type: 'incident' | 'serviceRequest',
  ): Promise<TicketEntity | null> {
    const prefix = type === 'incident' ? 'INC' : 'SOL';

    const lastTicket = await this.ticketRepository.findOne({
      where: { title: Like(`${prefix}-%`) },
      order: { created_at: 'DESC' },
    });

    console.log('getLastTicketByType - Último ticket encontrado:', lastTicket);
    return lastTicket || null;
  }

  async updateTicket(
    id: string,
    updateTicketDto: UpdateTicketDto,
  ): Promise<TicketEntity> {
    const ticket = await this.ticketRepository.findOne({
      where: { id },
      relations: ['user', 'technician', 'unit', 'department', 'sla', 'user_feedback'],
    });
    if (!ticket) throw new NotFoundException('Ticket not found');
  
    if (updateTicketDto.technician_id !== undefined) {
      ticket.technician = updateTicketDto.technician_id
        ? await this.userRepository.findOneBy({ id: updateTicketDto.technician_id })
        : null;
    }
  
    if (updateTicketDto.unit_id !== undefined) {
      ticket.unit = updateTicketDto.unit_id
        ? await this.unitRepository.findOneBy({ id: updateTicketDto.unit_id })
        : null;
    }
  
    if (updateTicketDto.department_id !== undefined) {
      ticket.department = updateTicketDto.department_id
        ? await this.departmentRepository.findOneBy({ id: updateTicketDto.department_id })
        : null;
    }

  
    Object.assign(ticket, updateTicketDto);
    const updatedTicket = await this.ticketRepository.save(ticket);
    console.log('updateTicket - Ticket atualizado:', updatedTicket);
  
    return updatedTicket;
  }
  

  async cancelTicket(id: string) {
    const ticket = await this.ticketRepository.findOneBy({ id });
    if (!ticket) throw new NotFoundException('Ticket not found');

    ticket.status = 'Fechado';
    ticket.closed_at = new Date();
    const canceledTicket = await this.ticketRepository.save(ticket);
    console.log('cancelTicket - Ticket cancelado:', canceledTicket);
  }
}
