import { CreateChangeDto } from './dtos/createChange.dto';
import { ReturnChangeDto } from './dtos/returnChange.dto';
import { TicketChangeEntity } from './entities/ticketChanges.entity';
import { TicketChangesService } from './ticket-changes.service';
import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';

@Controller('ticket-changes')
export class TicketChangesController {

    constructor(private readonly ticketChangesService: TicketChangesService) {}

    @UsePipes(ValidationPipe)
    @Post()
    async createChange(@Body() createChange: CreateChangeDto): Promise<TicketChangeEntity> {
        return this.ticketChangesService.createChange(createChange);
    }

    @Get(':ticket_id')
    async getChangesByTicketId(@Param('ticket_id') ticket_id: number): Promise<ReturnChangeDto[]> {
        return this.ticketChangesService.getChangesByTicketId(ticket_id);
    }
}
