import { IsString, IsOptional, IsBoolean } from "class-validator";

export class UpdateSettingsDto {
    @IsOptional()
    @IsString()
    theme?: string;

    @IsOptional()
    @IsBoolean()
    notifications_settings?: boolean;
}