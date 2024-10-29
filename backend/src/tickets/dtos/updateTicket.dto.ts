import { IsString, IsDate, IsNumber, IsOptional } from "class-validator";

export class UpdateTicketDto {

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    priority?: string;

    @IsString()
    @IsOptional()
    status?: string;

    @IsString()
    @IsOptional()
    category_name?: string;

    @IsNumber()
    @IsOptional()
    user_id?: string;

    @IsNumber()
    @IsOptional()
    technician_id?: string;

    @IsNumber()
    @IsOptional()
    unit_id?: string;

    @IsNumber()
    @IsOptional()
    sla_id?: number;
}