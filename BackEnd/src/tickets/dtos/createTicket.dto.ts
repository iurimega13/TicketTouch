import { IsString, IsDate, IsNumber } from "class-validator";

export class CreateTicketDto {

    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsString()
    priority: string;

    @IsString()
    status: string;

    @IsNumber()
    category_id: number;

    @IsNumber()
    user_id: number;

    @IsNumber()
    technician_id: number;

    @IsNumber()
    unit_id: number;

    @IsDate()
    due_date: Date;

    @IsNumber()
    sla_id: number;
}