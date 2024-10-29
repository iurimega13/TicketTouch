import { ReturnChangeDto } from './dtos/returnChange.dto';
import { CreateChangeDto } from './dtos/createChange.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {  Repository } from 'typeorm';
import { TicketChangeEntity } from './entities/ticketChanges.entity';

@Injectable()
export class TicketChangesService {
  constructor(
    @InjectRepository(TicketChangeEntity)
    private readonly ticketChangeRepository: Repository<TicketChangeEntity>,
  ) {}

  async createChange(
    createChangeDto: CreateChangeDto,
  ): Promise<TicketChangeEntity> {
    const change = this.ticketChangeRepository.create(createChangeDto);
    return await this.ticketChangeRepository.save(change);
  }

  async getChangesByTicketId(ticket_id: string): Promise<ReturnChangeDto[]> {
    const changes = await this.ticketChangeRepository.find({
      where: { ticket: { id: ticket_id } },
      order: { created_at: 'ASC' },
    });
    return changes.map((change) => new ReturnChangeDto(change));
  }
}
