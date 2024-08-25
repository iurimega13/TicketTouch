import { TicketChangeEntity } from "../entities/ticketChanges.entity";


export class ReturnChangeDto {
    id: string;
    user_id: string;
    ticket_id: string;
    change_type: string;
    old_value: string;
    new_value: string;
    created_at: Date;

    constructor(change: TicketChangeEntity){
        this.id = change.id;
        this.user_id = change.user.id;
        this.ticket_id = change.ticket.id;
        this.change_type = change.change_type;
        this.old_value = change.old_value;
        this.new_value = change.new_value;
        this.created_at = change.created_at;
    }
}
