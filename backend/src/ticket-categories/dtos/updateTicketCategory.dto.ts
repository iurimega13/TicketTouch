import { IsNotEmpty, IsString, IsOptional } from "class-validator";


export class UpdateTicketCategoryDto {
    
    @IsString()
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    description: string;
}