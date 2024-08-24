import { TicketEntity } from "src/tickets/entities/ticket.entity";
import { UserEntity } from "src/users/entities/user.entity";
import { FeedbackEntity } from "../entities/feedback.entity";
export declare class ReturnFeedbackDto {
    id: number;
    user: UserEntity;
    ticket: TicketEntity;
    rating: number;
    comment: string;
    created_at: Date;
    constructor(feedback: FeedbackEntity);
}
