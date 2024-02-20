import { IsString, IsNumber } from "class-validator";


export class createDepartamentDto {
    @IsString()
    name: string;

    @IsNumber()
    unit_id: number;

}