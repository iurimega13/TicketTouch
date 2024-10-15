import { IsNumber, IsString, IsOptional, IsBoolean } from "class-validator";


export class UpdateEquipmentDto {
    @IsString()
    name?: string;

    @IsString()
    description?: string;

    @IsString()
    serial_number?: string;

    @IsString()
    user_id?: string;

    @IsString()
    unit_id?: string;

    @IsString()
    department_id?: string;

    @IsBoolean()
    is_shared?: boolean;
    
}