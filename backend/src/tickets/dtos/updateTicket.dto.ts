import { IsString, IsDate, IsOptional, IsUUID } from 'class-validator';

export class UpdateTicketDto {
  @IsString()
  @IsOptional()
  priority?: string;

  @IsString()
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional()
  category_name?: string;

  @IsUUID()
  @IsOptional()
  technician_id?: string;

  @IsUUID()
  @IsOptional()
  unit_id?: string;

  @IsUUID()
  @IsOptional()
  department_id?: string;

  @IsDate()
  @IsOptional()
  closed_at?: Date;
}