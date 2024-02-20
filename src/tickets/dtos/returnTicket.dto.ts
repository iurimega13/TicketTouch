import { TicketEntity } from "../entities/ticket.entity";
import { CategoryEntity } from "src/ticket-categories/entities/category.entity";
import { UnitEntity } from "src/units/entities/unit.entity";
import { UserEntity } from "src/users/entities/user.entity";
import { SlaEntity } from "src/slas/entities/sla.entity";

export class ReturnTicketDto {
    id: number;
    title: string;
    description: string;
    priority: string;
    status: string;
    category: CategoryEntity;
    user: UserEntity;
    technician: UserEntity;
    unit: UnitEntity;
    sla: SlaEntity;
    due_date: Date;
    created_at: Date;
    updated_at: Date;

    constructor(ticket: TicketEntity) {
        this.id = ticket.id;
        this.title = ticket.title;
        this.description = ticket.description;
        this.priority = ticket.priority;
        this.status = ticket.status;
        this.category = ticket.category;
        this.user = ticket.user;
        this.technician = ticket.technician;
        this.unit = ticket.unit;
        this.sla = ticket.sla;
        this.due_date = ticket.due_date;
        this.created_at = ticket.created_at;
        this.updated_at = ticket.updated_at;
    }
}