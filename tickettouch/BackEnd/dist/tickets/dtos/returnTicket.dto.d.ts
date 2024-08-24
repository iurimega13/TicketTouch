import { TicketEntity } from "../entities/ticket.entity";
import { TicketCategoryEntity } from "../../ticket-categories/entities/ticketCategory.entity";
import { UnitEntity } from "src/units/entities/unit.entity";
import { UserEntity } from "src/users/entities/user.entity";
import { SlaEntity } from "src/slas/entities/sla.entity";
export declare class ReturnTicketDto {
    id: number;
    title: string;
    description: string;
    priority: string;
    status: string;
    category: TicketCategoryEntity;
    user: UserEntity;
    technician: UserEntity;
    unit: UnitEntity;
    sla: SlaEntity;
    due_date: Date;
    created_at: Date;
    updated_at: Date;
    constructor(ticket: TicketEntity);
}
