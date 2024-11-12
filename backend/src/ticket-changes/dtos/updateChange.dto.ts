import { IsString, IsArray, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

class Change {
  @IsString()
  field: string;

  @IsString()
  value: string;

  @IsString()
  @IsOptional()
  date?: string;
}

export class UpdateChangeDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Change)
  changes: Change[];
}
