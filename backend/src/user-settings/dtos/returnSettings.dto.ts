import { UserEntity } from "src/users/entities/user.entity";
import { SettingsEntity } from "../entities/settings.entity";

export class ReturnSettingsDto {
    id: string;
    user_id: UserEntity;
    theme: string;
    notifications_settings: boolean;

    constructor(settings: SettingsEntity) {
        this.id = settings.id;
        this.user_id = settings.user;
        this.theme = settings.theme;
        this.notifications_settings = settings.notifications_settings;
    }
}