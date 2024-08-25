import { IsNumber, IsString } from "class-validator";


export class CreateFeedbackDto {

    @IsNumber()
    user_id: string

    @IsNumber()
    ticket_id: string;

    @IsNumber()
    rating: number;

    @IsString()
    comment: string;

}