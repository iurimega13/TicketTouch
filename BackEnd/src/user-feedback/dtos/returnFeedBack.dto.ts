import { TicketEntity } from "src/tickets/entities/ticket.entity";
import { UserEntity } from "src/users/entities/user.entity";
import { FeedbackEntity } from "../entities/feedback.entity";


export class ReturnFeedbackDto {
    id: number;
    user: UserEntity;
    ticket: TicketEntity;
    rating: number;
    comment: string;
    created_at: Date;

    constructor(feedback: FeedbackEntity) {
        this.id = feedback.id;
        this.user = feedback.user;
        this.ticket = feedback.ticket;
        this.rating = feedback.rating;
        this.comment = feedback.comment;
        this.created_at = feedback.created_at;
    }
}