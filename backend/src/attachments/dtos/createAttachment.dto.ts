import { IsString, IsNumber } from "class-validator";

export class CreateAttachmentDto {
    
    
    @IsNumber()
    ticket_id: string;

}