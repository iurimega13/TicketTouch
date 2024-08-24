import { Repository } from 'typeorm';
import { UpdateTicketCategoryDto } from './dtos/updateTicketCategory.dto';
import { TicketCategoryEntity } from './entities/ticketCategory.entity';
import { CreateTicketCategoryDto } from './dtos/createTicketCategory.dto';
export declare class TicketCategoriesService {
    private readonly ticketCategoryRepository;
    constructor(ticketCategoryRepository: Repository<TicketCategoryEntity>);
    createTicketCategory(createTicketCategoryDto: CreateTicketCategoryDto): Promise<TicketCategoryEntity>;
    updateTicketCategory(updateTicketCategoryDto: UpdateTicketCategoryDto): Promise<TicketCategoryEntity>;
    getAllTicketCategories(): Promise<TicketCategoryEntity[]>;
    getTicketCategoryById(id: number): Promise<TicketCategoryEntity>;
    deleteTicketCategory(id: number): Promise<void>;
}
