import { IsNumber, IsString } from "class-validator";


export class CreateFeedbackDto {

    @IsString()
    user: string

    @IsString()
    ticket: string

    @IsNumber()
    rating: number;

    @IsString()
    comment: string;

}