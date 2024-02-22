import { IsString, IsNumber } from "class-validator";


export class CreateDepartamentDto {
    @IsString()
    name: string;

    @IsNumber()
    unit_id: number;

}