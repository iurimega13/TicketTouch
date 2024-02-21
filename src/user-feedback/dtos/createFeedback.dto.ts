import { IsNumber, IsString } from "class-validator";


export class CreateFeedbackDto {

    @IsNumber()
    user_id: number;

    @IsNumber()
    ticket_id: number;

    @IsNumber()
    rating: number;

    @IsString()
    comment: string;

}