import { SlaEntity } from "../../slas/entities/sla.entity";
import { TicketCategoryEntity } from "../../ticket-categories/entities/ticketCategory.entity";
import { UnitEntity } from "../../units/entities/unit.entity";
import { UserEntity } from "../../users/entities/user.entity";
export declare class TicketEntity {
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
}
