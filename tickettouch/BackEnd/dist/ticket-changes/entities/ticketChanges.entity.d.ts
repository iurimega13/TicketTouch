import { TicketEntity } from '../../tickets/entities/ticket.entity';
import { UserEntity } from '../../users/entities/user.entity';
export declare class TicketChangeEntity {
    id: number;
    ticket: TicketEntity;
    user: UserEntity;
    change_type: string;
    old_value: string;
    new_value: string;
    created_at: Date;
}
