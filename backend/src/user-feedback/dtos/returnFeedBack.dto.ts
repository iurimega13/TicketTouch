import { TicketEntity } from "src/tickets/entities/ticket.entity";
import { UserEntity } from "src/users/entities/user.entity";
import { FeedbackEntity } from "../entities/feedback.entity";


export class ReturnFeedbackDto {
    id: string;
    user: UserEntity;
    ticket: TicketEntity;
    rating: number;
    comment: string;
    created_at: Date;

    constructor(feedback: FeedbackEntity) {
        this.id = feedback.id;
        this.user = feedback.user;
        this.rating = feedback.rating;
        this.comment = feedback.comment;
    }
}