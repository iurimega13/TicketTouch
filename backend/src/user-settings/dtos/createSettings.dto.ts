import {  IsBoolean, IsString } from "class-validator";


export class CreateSettingsDto {
    [x: string]: any;

    @IsString()
    user_id: string;

    @IsString()
    theme: string;

    @IsBoolean()
    notifications_settings: boolean;
    
}