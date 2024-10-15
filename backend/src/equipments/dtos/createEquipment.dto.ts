import { IsString, IsBoolean, IsNotEmpty, IsOptional, IsUUID } from "class-validator";

export class CreateEquipmentDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    serial_number: string;

    @IsUUID()
    @IsOptional()
    user_id?: string;

    @IsUUID()
    @IsNotEmpty()
    unit_id: string;

    @IsUUID()
    @IsNotEmpty()
    department_id: string;

    @IsBoolean()
    @IsNotEmpty()
    is_shared: boolean;
}