import { CreateChangeDto } from './dtos/createChange.dto';
import { ReturnChangeDto } from './dtos/returnChange.dto';
import { TicketChangeEntity } from './entities/ticketChanges.entity';
import { TicketChangesService } from './ticket-changes.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

@Controller('ticket-changes')
export class TicketChangesController {
  constructor(private readonly ticketChangesService: TicketChangesService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async createChange(@Body() createChangeDto: CreateChangeDto) {
    return this.ticketChangesService.createChange(createChangeDto);
  }

  @Get(':ticketId')
  async getChangesByTicketId(@Param('ticketId') ticketId: string) {
    return this.ticketChangesService.getChangesByTicketId(ticketId);
  }
}
