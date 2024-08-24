import { UserEntity } from "src/users/entities/user.entity";
export declare class SettingsEntity {
    id: number;
    user: UserEntity;
    notifications_settings: string;
    theme: string;
    created_at: Date;
    updated_at: Date;
}
