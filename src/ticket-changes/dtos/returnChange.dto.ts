import { ChangeEntity } from "../entities/changes.entity";


export class ReturnChangeDto {
    id: number;
    userId: number;
    ticketId: number;
    change_type: string;
    old_value: string;
    new_value: string;
    created_at: Date;

    constructor(change: ChangeEntity){
        this.id = change.id;
        this.userId = change.user.id;
        this.ticketId = change.ticket.id;
        this.change_type = change.change_type;
        this.old_value = change.old_value;
        this.new_value = change.new_value;
        this.created_at = change.created_at;
    }
}
