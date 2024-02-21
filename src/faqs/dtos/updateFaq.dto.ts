import { IsNumber, IsString } from "class-validator";


export class UpdateFaqDto {

    @IsNumber()
    id: number;

    @IsString()
    question?: string;

    @IsString()
    answer?: string;
  }