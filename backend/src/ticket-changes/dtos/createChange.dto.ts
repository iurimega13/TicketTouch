import { IsNotEmpty, IsNumber, IsString, IsSurrogatePair } from "class-validator";
import { CreateDateColumn } from "typeorm";


export class CreateChangeDto {

    @IsString()
    @IsNotEmpty()
    userId: string;

    @IsNotEmpty()
    @IsString()
    ticketId: string;

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