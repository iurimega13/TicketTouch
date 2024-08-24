import { TicketCategoryEntity } from "../entities/ticketCategory.entity";
export declare class ReturnCategoryDto {
    id: number;
    name: string;
    description: string;
    constructor(ticketCategory: TicketCategoryEntity);
}
