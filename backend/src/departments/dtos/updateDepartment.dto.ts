import { IsNumber, IsNotEmpty, IsString } from "class-validator";


export class UpdateDepartmentDto {

    @IsString()
    @IsNotEmpty()
    id: string;
    
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;
}