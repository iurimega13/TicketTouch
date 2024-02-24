import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketChangesController } from './ticket-changes.controller';
import { TicketChangesService } from './ticket-changes.service';
import { TicketChangeEntity } from './entities/ticketChanges.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([TicketChangeEntity]),
    ],
    controllers: [TicketChangesController],
    providers: [TicketChangesService],
    exports: [TicketChangesService],
})
export class TicketChangesModule {}
