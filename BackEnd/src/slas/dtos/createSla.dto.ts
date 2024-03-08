import { IsString, IsNumber } from "class-validator";


export class CreateSlaDto {

    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsNumber()
    response_time: number;

    @IsNumber()
    resolution_time: number;
}