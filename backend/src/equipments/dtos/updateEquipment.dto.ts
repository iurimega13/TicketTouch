import { IsNumber, IsString, IsOptional, IsBoolean } from "class-validator";


export class UpdateEquipmentDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsString()
    serial_number?: string;

    @IsOptional()
    @IsString()
    user_id?: string;

    @IsOptional()
    @IsString()
    unit_id?: string;

    @IsOptional()
    @IsString()
    department_id?: string;

    @IsOptional()
    @IsBoolean()
    is_shared?: boolean;
    
}