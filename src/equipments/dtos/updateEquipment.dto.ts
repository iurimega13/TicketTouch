import { IsNumber, IsNotEmpty, IsString, IsOptional, IsBoolean } from "class-validator";


export class UpdateEquipmentDto {

    @IsNumber()
    @IsNotEmpty()
    id: number;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    name: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    description: string;
    
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    serial_number: number;

    @IsBoolean()
    @IsNotEmpty()
    @IsOptional()
    is_shared: boolean;

    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    user_id: number;

    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    unit_id: number;

    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    departament_id: number;
}