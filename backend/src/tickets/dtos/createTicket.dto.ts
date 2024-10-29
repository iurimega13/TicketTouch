import { IsString, IsNotEmpty, IsUUID } from "class-validator";

export class CreateTicketDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    priority: string;

    @IsString()
    @IsNotEmpty()
    status: string;

    @IsString() 
    category_name: string;

    @IsString()
    @IsNotEmpty()
    @IsUUID()
    user_id: string;

    @IsString()
    @IsNotEmpty()
    @IsUUID()
    unit_id: string;

    @IsString()
    @IsNotEmpty()
    @IsUUID()
    department_id: string;

    @IsString()
    @IsNotEmpty()
    @IsUUID() 
    sla_id: string;
}
