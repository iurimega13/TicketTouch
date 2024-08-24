import { ReturnChangeDto } from './dtos/returnChange.dto';
import { CreateChangeDto } from './dtos/createChange.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';
import { TicketChangeEntity } from './entities/ticketChanges.entity';

@Injectable()
export class TicketChangesService {

    constructor(
        @InjectRepository(TicketChangeEntity)
        private readonly ticketChangeRepository: Repository<TicketChangeEntity>
    ) {}

    async createChange(createChangeDto: CreateChangeDto): Promise<TicketChangeEntity> {
        try {
            const change = {
                ...createChangeDto,
            };
            return await this.ticketChangeRepository.save(change);
        } catch (error) {
            throw new Error(error);
        }
    }

    async getChangesByTicketId(ticket_id: number): Promise<ReturnChangeDto[]> {
        try {
            const changes = await this.ticketChangeRepository.find({
                where: {
                    ticketId: ticket_id,
                },
            } as FindManyOptions<TicketChangeEntity>);
            return changes.map(change => new ReturnChangeDto(change));
        } catch (error) {
            throw new Error(error);
        }
    }
    
}
