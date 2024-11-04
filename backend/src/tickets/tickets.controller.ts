import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  UsePipes,
  ValidationPipe,
  ParseUUIDPipe,
  Patch,
} from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dtos/createTicket.dto';
import { UpdateTicketDto } from './dtos/updateTicket.dto';
import { ReturnTicketDto } from './dtos/returnTicket.dto';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async createTicket(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketsService.createTicket(createTicketDto);
  }

  @Get()
  async getAllTickets(@Query('filter') filter: string) {
    return this.ticketsService.getAllTickets(filter);
  }

  @Get(':id')
  async getTicketById(@Param('id') id: string): Promise<ReturnTicketDto> {
    const ticket = await this.ticketsService.getTicketById(id);
    return new ReturnTicketDto(ticket);
  }

    @Get('type/last')
  async getLastTicketByType(
    @Query('type') type: 'incident' | 'serviceRequest',
  ) {
    return this.ticketsService.getLastTicketByType(type);
  }

  @Put(':id')
  async updateTicket(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateTicketDto: UpdateTicketDto,
  ) {
    return this.ticketsService.updateTicket(id, updateTicketDto);
  }

  @Patch(':id/cancel')
  async cancelTicket(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.ticketsService.cancelTicket(id);
  }
}
