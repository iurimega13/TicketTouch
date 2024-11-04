import { CreateChangeDto } from './dtos/createChange.dto';
import { UpdateChangeDto } from './dtos/updateChange.dto';
import { TicketChangesService } from './ticket-changes.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
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

  @UsePipes(ValidationPipe)
  @Put(':id')
  async updateChange(
    @Param('id') id: string,
    @Body() updateChangeDto: UpdateChangeDto,
  ) {
    console.log('Request received in updateChange with id:', id);
    console.log('Request body:', updateChangeDto);
    updateChangeDto.id = id;
    return this.ticketChangesService.updateChange(updateChangeDto);
  }
}