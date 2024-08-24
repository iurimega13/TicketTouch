import { CreateChangeDto } from './dtos/createChange.dto';
import { ReturnChangeDto } from './dtos/returnChange.dto';
import { TicketChangeEntity } from './entities/ticketChanges.entity';
import { TicketChangesService } from './ticket-changes.service';
export declare class TicketChangesController {
    private readonly ticketChangesService;
    constructor(ticketChangesService: TicketChangesService);
    createChange(createChange: CreateChangeDto): Promise<TicketChangeEntity>;
    getChangesByTicketId(ticket_id: number): Promise<ReturnChangeDto[]>;
}
