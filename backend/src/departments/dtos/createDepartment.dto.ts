import { IsString, IsNumber } from "class-validator";


export class CreateDepartmentDto {
    @IsString()
    name: string;

    @IsNumber()
    unit_id: number;

}