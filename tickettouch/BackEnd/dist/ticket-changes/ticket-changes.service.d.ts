import { ReturnChangeDto } from './dtos/returnChange.dto';
import { CreateChangeDto } from './dtos/createChange.dto';
import { Repository } from 'typeorm';
import { TicketChangeEntity } from './entities/ticketChanges.entity';
export declare class TicketChangesService {
    private readonly ticketChangeRepository;
    constructor(ticketChangeRepository: Repository<TicketChangeEntity>);
    createChange(createChangeDto: CreateChangeDto): Promise<TicketChangeEntity>;
    getChangesByTicketId(ticket_id: number): Promise<ReturnChangeDto[]>;
}
