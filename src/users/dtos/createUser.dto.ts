import { IsNumber, IsString } from "class-validator";

export class CreateUserDto {
    
    @IsString()
    name: string;

    @IsString()
    email: string;

    @IsString()
    password: string;

    @IsString()
    role: string;

    @IsString()
    phone_number: string;

    @IsNumber()
    registration: number;

    @IsNumber()
    unit_id: number;

    @IsNumber()
    department_id: number;
}