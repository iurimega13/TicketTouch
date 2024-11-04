import { ReturnChangeDto } from './dtos/returnChange.dto';
import { CreateChangeDto } from './dtos/createChange.dto';
import { UpdateChangeDto } from './dtos/updateChange.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TicketChangeEntity } from './entities/ticketChanges.entity';
import { TicketEntity } from '../tickets/entities/ticket.entity';
import { UserEntity } from '../users/entities/user.entity';

@Injectable()
export class TicketChangesService {
  constructor(
    @InjectRepository(TicketChangeEntity)
    private readonly ticketChangeRepository: Repository<TicketChangeEntity>,
    @InjectRepository(TicketEntity)
    private readonly ticketRepository: Repository<TicketEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createChange(createChangeDto: CreateChangeDto): Promise<TicketChangeEntity> {
    const { userId, ticketId, changes } = createChangeDto;
    const user = await this.userRepository.findOneBy({ id: userId });
    const ticket = await this.ticketRepository.findOneBy({ id: ticketId });

    const change = this.ticketChangeRepository.create({
      user,
      ticket,
      changes,
    });

    return await this.ticketChangeRepository.save(change);
  }

  async getChangesByTicketId(ticket_id: string): Promise<ReturnChangeDto[]> {
    const changes = await this.ticketChangeRepository.find({
      where: { ticket: { id: ticket_id } },
      relations: ['ticket', 'user'],
      order: { created_at: 'ASC' },
    });
    return changes.map((change) => new ReturnChangeDto(change));
  }

  async updateChange(updateChangeDto: UpdateChangeDto): Promise<TicketChangeEntity> {
    const { id, changes } = updateChangeDto;
    const change = await this.ticketChangeRepository.findOneBy({ id });
  
    if (!change) {
      throw new NotFoundException(`Change with ID ${id} not found`);
    }
  
    change.changes = [...change.changes, ...changes];
  
    return await this.ticketChangeRepository.save(change);
  }
}