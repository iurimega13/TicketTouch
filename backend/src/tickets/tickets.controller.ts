import {
  Controller,
  Get,
  Post,
  Put,
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
import { TicketEntity } from './entities/ticket.entity';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async createTicket(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketsService.createTicket(createTicketDto);
  }

  @Get('all')
  async getAllTicketsSupport(@Query('filter') filter: string, @Query('type') type?: string) {
    console.log('getAllTicketsSupport - Filtro:', filter, 'Tipo:', type);
    const tickets = await this.ticketsService.getAllTicketsSupport(filter, type);
    return tickets.map((ticket) => new ReturnTicketDto(ticket));
  }

  @Get()
  async getAllTickets(@Query('filter') filter: string) {
    console.log('getAllTickets - Filtro:', filter);
    const tickets = await this.ticketsService.getAllTickets(filter);
    return tickets.map((ticket) => new ReturnTicketDto(ticket));
  }

  @Get('technician/:technicianId')
  async getTicketsByTechnician(
    @Param('technicianId') technicianId: string,
    @Query('filter') filter: string,
    @Query('type') type?: string
  ) {
    const tickets = await this.ticketsService.getTicketsByTechnician(technicianId, filter);
    return tickets.map((ticket) => new ReturnTicketDto(ticket));
  }

  @Get(':id')
  async getTicketById(@Param('id') id: string): Promise<ReturnTicketDto> {
    console.log('getTicketById - ID:', id);
    const ticket = await this.ticketsService.getTicketById(id);
    return new ReturnTicketDto(ticket);
  }

  @Get('type/last')
  async getLastTicketByType(@Query('type') type: 'incident' | 'serviceRequest') {
    console.log('getLastTicketByType - Tipo:', type);
    const ticket = await this.ticketsService.getLastTicketByType(type);
    return ticket ? new ReturnTicketDto(ticket) : null;
  }

  @Put(':id')
  async updateTicket(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateTicketDto: UpdateTicketDto,
  ): Promise<TicketEntity> {
    return this.ticketsService.updateTicket(id, updateTicketDto);
  }

  @Patch(':id/cancel')
  async cancelTicket(@Param('id', new ParseUUIDPipe()) id: string) {
    console.log('cancelTicket - ID:', id);
    return this.ticketsService.cancelTicket(id);
  }
}
