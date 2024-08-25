import { IsString, IsNotEmpty, IsNumber } from "class-validator";


export class UpdateUnitDto {

  @IsString()
  @IsNotEmpty()
  id: string;
  
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}