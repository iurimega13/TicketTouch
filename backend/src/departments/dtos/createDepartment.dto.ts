import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDepartmentDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    unit_id: string;  // Adiciona o ID da unidade
}