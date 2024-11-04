import { IsNotEmpty, IsString } from 'class-validator';

export class CreateChangeDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  @IsString()
  ticketId: string;

  @IsNotEmpty()
  changes: any[];
}