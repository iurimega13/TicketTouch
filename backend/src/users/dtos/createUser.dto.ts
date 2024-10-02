import { IsString, IsEmail, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  role: string;

  @IsString()
  phone_number: string;

  @IsString()
  ramal: string;

  @IsUUID()
  @IsNotEmpty()
  unit: string;

  @IsUUID()
  @IsNotEmpty()
  department: string;
}