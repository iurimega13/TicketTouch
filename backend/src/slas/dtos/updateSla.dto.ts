import { IsString, IsNumber, IsOptional } from "class-validator";


export class UpdateSlaDto {
 

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsNumber()
    response_time?: number;

    @IsOptional()
    @IsNumber()
    resolution_time?: number;
}