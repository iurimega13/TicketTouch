import { IsNumber, IsNotEmpty, IsString, IsOptional } from "class-validator";


export class UpdateTicketCategoryDto {
    
    @IsNumber()
    @IsNotEmpty()
    id: number;

    @IsString()
    @IsOptional()
    name: string;

    @IsString()
    @IsOptional()
    description: string;
}