import { UserEntity } from "src/users/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'settings'})
export class SettingsEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => UserEntity)
    @JoinColumn({name: 'user_id'})
    user: UserEntity;

    @Column({name: 'notifications_settings', default: true})
    notifications_settings: boolean;

    @Column({name: 'theme', default: 'light'})
    theme: string;
}