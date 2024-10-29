import { Controller, Get, Post, Put, Delete, Param, Body, Query, UsePipes, ValidationPipe, ParseUUIDPipe } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dtos/createTicket.dto';
import { UpdateTicketDto } from './dtos/updateTicket.dto';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async createTicket(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketsService.createTicket(createTicketDto);
  }

  @Get()
  async getAllTickets() {
    return this.ticketsService.getAllTickets();
  }

  @Get(':id')
  async getTicketById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.ticketsService.getTicketById(id);
  }

  @Get('type/last')
  async getLastTicketByType(@Query('type') type: 'incident' | 'serviceRequest') {
    return this.ticketsService.getLastTicketByType(type);
  }

  @Put(':id')
  async updateTicket(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateTicketDto: UpdateTicketDto,
  ) {
    return this.ticketsService.updateTicket(id, updateTicketDto);
  }

  @Delete(':id')
  async deleteTicket(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.ticketsService.deleteTicket(id);
  }
}