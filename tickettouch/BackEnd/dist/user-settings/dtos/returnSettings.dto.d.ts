import { UserEntity } from "src/users/entities/user.entity";
import { SettingsEntity } from "../entities/settings.entity";
export declare class ReturnSettingsDto {
    id: number;
    user_id: UserEntity;
    theme: string;
    notifications_settings: string;
    created_at: Date;
    updated_at: Date;
    constructor(settings: SettingsEntity);
}
