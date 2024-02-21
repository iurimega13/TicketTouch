import { IsNumber, IsString } from "class-validator";


export class CreateChangeDto {

    @IsNumber()
    userId: number;

    @IsNumber()
    ticketId: number;

    @IsString()
    change_type: Date;

    @IsString()
    old_value: string;

    @IsString()
    new_value: string;
}