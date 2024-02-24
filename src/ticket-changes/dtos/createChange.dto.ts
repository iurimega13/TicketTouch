import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { CreateDateColumn } from "typeorm";


export class CreateChangeDto {

    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @IsNotEmpty()
    @IsNumber()
    ticketId: number;

    @IsNotEmpty()
    @IsString()
    change_type: string;

    @IsNotEmpty()
    @IsString()
    old_value: string;

    @IsNotEmpty()
    @IsString()
    new_value: string;

    @IsNotEmpty()
    @CreateDateColumn()
    created_at: Date;
}