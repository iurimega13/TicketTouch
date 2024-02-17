import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({name: 'users'})
export class UserEntity {
    @PrimaryGeneratedColumn('rowid')
    id : number;

    @Column({name: 'registration', nullable: false})
    registration: string;

    @Column({name: 'name', nullable: false})
    name: string;

    @Column({name: 'email', nullable: false})
    email: string;

    @Column({name: 'password', nullable: false})
    password: string;

    @Column({name: 'role', nullable: false})
    role: string;

    @Column({name: 'phone_number'})
    phone_number: string;

}