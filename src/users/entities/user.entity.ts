import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { UnitEntity } from "src/units/entities/unit.entity";
import { DepartamentEntity } from "src/departaments/entities/departament.entity";


@Entity({name: 'users'})
export class UserEntity {
    @PrimaryGeneratedColumn()
    id : number;

    @Column({name: 'registration', nullable: false, unique: true})
    registration: number;

    @Column({name: 'name', nullable: false})
    name: string;

    @Column({name: 'email', nullable: false, unique: true})
    email: string;

    @Column({name: 'password', nullable: false})
    password: string;

    @Column({name: 'role', nullable: false})
    role: string;

    @Column({name: 'phone_number'})
    phone_number: string;

    @ManyToOne(() => UnitEntity)
    @JoinColumn({name: 'unit_id'})
    unit: UnitEntity;

    @ManyToOne(() => DepartamentEntity)
    @JoinColumn({name: 'department_id'})
    department: DepartamentEntity;

    @CreateDateColumn({name: 'created_at', type: 'timestamp'})
    created_at: Date;
}
