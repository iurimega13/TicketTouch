import { IsNumber, IsString } from "class-validator";


export class UpdateFaqDto {
    @IsString()
    question?: string;

    @IsString()
    answer?: string;
  }