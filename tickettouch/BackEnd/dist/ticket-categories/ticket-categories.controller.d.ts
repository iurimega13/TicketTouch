import { CreateTicketCategoryDto } from './dtos/createTicketCategory.dto';
import { UpdateTicketCategoryDto } from './dtos/updateTicketCategory.dto';
import { TicketCategoryEntity } from './entities/ticketCategory.entity';
import { TicketCategoriesService } from './ticket-categories.service';
export declare class TicketCategoriesController {
    private readonly ticketCategoriesService;
    constructor(ticketCategoriesService: TicketCategoriesService);
    createTicketCategory(createTicketCategoryDto: CreateTicketCategoryDto): Promise<TicketCategoryEntity>;
    updateTicketCategory(updateTicketCategoryDto: UpdateTicketCategoryDto): Promise<TicketCategoryEntity>;
    deleteTicketCategory(id: number): Promise<void>;
    getAllTicketCategories(): Promise<TicketCategoryEntity[]>;
}
