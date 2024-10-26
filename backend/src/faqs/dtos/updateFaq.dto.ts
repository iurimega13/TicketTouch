import { IsOptional, IsString } from "class-validator";


export class UpdateFaqDto {
    @IsString()
    @IsOptional()
    question?: string;

    @IsOptional()
    @IsString()
    answer?: string;
  }