import { TicketEntity } from "src/tickets/entities/ticket.entity";
import { UserEntity } from "src/users/entities/user.entity";
export declare class FeedbackEntity {
    id: number;
    user: UserEntity;
    ticket: TicketEntity;
    rating: number;
    comment: string;
    created_at: Date;
}
