import { IsNumber, IsString } from "class-validator";


export class CreateSettingsDto {

    @IsNumber()
    user_id: number;

    @IsString()
    theme: string;

    @IsString()
    notifications_settings: string;
    
}