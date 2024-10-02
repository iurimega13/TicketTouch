import { IsOptional, IsString } from 'class-validator';

export class UpdateDepartmentDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    unit_id?: string;  // Adiciona o ID da unidade
}