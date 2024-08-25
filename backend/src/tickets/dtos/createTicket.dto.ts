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
    category_id: string;

    @IsNumber()
    user_id: string;

    @IsNumber()
    technician_id: string;

    @IsNumber()
    unit_id: string;

    @IsDate()
    due_date: Date;

    @IsNumber()
    sla_id: number;
}