import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketChangesController } from './ticket-changes.controller';
import { TicketChangesService } from './ticket-changes.service';
import { TicketChangeEntity } from './entities/ticketChanges.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { TicketEntity } from 'src/tickets/entities/ticket.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TicketChangeEntity, TicketEntity, UserEntity]),
  ],
  controllers: [TicketChangesController],
  providers: [TicketChangesService],
  exports: [TicketChangesService],
})
export class TicketChangesModule {}