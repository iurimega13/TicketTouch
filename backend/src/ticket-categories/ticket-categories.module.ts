import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketCategoryEntity } from './entities/ticketCategory.entity';
import { TicketCategoriesController } from './ticket-categories.controller';
import { TicketCategoriesService } from './ticket-categories.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([TicketCategoryEntity]),
    ],
    controllers: [TicketCategoriesController],
    providers: [TicketCategoriesService],
    exports: [TicketCategoriesService],
})
export class TicketCategoriesModule {}
