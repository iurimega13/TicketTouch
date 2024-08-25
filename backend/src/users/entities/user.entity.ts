import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { UnitEntity } from "../../units/entities/unit.entity";
import { DepartmentEntity } from "../../departments/entities/department.entity";


@Entity({name: 'users'})
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id : string;

    @Column({name: 'username', nullable: false, unique: true})
    username: string;

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

    @Column({ nullable: false })
    unit_id: number;

    @ManyToOne(() => UnitEntity)
    @JoinColumn({name: 'unit_id'})
    unit: UnitEntity;

    @Column({ nullable: false })
    department_id: number;

    @ManyToOne(() => DepartmentEntity)
    @JoinColumn({name: 'department_id'})
    department: DepartmentEntity;

    @CreateDateColumn({name: 'created_at', type: 'timestamp'})
    created_at: Date;
}
