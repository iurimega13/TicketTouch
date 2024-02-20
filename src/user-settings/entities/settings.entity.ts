import { UserEntity } from "src/users/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'settings'})
export class SettingsEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => UserEntity)
    @JoinColumn({name: 'user_id'})
    user: UserEntity;

    @Column({name: 'notifications_settings', nullable: false})
    notifications_settings: string;

    @Column({name: 'theme', nullable: false})
    theme: string;

    @Column({name: 'language', nullable: false})
    language: string;

    @CreateDateColumn({name: 'created_at', nullable: false})
    created_at: Date;

    @UpdateDateColumn({name: 'updated_at', nullable: false})
    updated_at: Date;
}