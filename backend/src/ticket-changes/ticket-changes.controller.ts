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
  ParseUUIDPipe,
} from '@nestjs/common';

@Controller('ticket-changes')
export class TicketChangesController {
  constructor(private readonly ticketChangesService: TicketChangesService) {}

  @Post()
  async createChange(@Body() createChangeDto: CreateChangeDto) {
    console.log('Criando nova mudança:', createChangeDto);
    return this.ticketChangesService.createChange(createChangeDto);
  }

  @Get(':ticketId')
  async getChangesByTicketId(
    @Param('ticketId', new ParseUUIDPipe()) ticketId: string,
  ) {
    return this.ticketChangesService.getChangesByTicketId(ticketId);
  }

  @Put(':id')
@UsePipes(ValidationPipe)
async updateChange(
  @Param('id', new ParseUUIDPipe()) id: string,
  @Body() updateChangeDto: UpdateChangeDto,
) {
  console.log('ID recebido na URL:', id);
  console.log('Corpo recebido:', updateChangeDto);
  return this.ticketChangesService.updateChange(id, updateChangeDto);
}

}
