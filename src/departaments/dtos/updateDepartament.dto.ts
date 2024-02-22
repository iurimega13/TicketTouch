import { IsNumber, IsNotEmpty, IsString } from "class-validator";


export class UpdateDepartamentDto {

    @IsNumber()
    @IsNotEmpty()
    id: number;
    
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;
}