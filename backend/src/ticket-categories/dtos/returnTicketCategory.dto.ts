import { TicketCategoryEntity } from "../entities/ticketCategory.entity";


export class ReturnCategoryDto {
    id: string;
    name: string;
    description: string;

    constructor(ticketCategory: TicketCategoryEntity) {
        this.id = ticketCategory.id;
        this.name = ticketCategory.name;
        this.description = ticketCategory.description;
    }
}