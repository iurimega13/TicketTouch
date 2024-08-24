import { IsString, IsNotEmpty, IsNumber } from "class-validator";


export class UpdateUnitDto {

  @IsNumber()
  @IsNotEmpty()
  id: number;
  
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}