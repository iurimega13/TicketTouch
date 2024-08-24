import { TicketChangeEntity } from "../entities/ticketChanges.entity";
export declare class ReturnChangeDto {
    id: number;
    user_id: string;
    ticket_id: number;
    change_type: string;
    old_value: string;
    new_value: string;
    created_at: Date;
    constructor(change: TicketChangeEntity);
}
