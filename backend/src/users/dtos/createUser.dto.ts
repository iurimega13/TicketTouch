import {IsString } from "class-validator";

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

    @IsString()
    username: string;

    @IsString()
    unit_name: string;

    @IsString()
    department_name: string;
}