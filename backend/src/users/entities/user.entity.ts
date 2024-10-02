import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UnitEntity } from '../../units/entities/unit.entity';
import { DepartmentEntity } from '../../departments/entities/department.entity';

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({unique: true})
    username: string;

    @Column()
    name: string;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;

    @Column()
    role: string;

    @Column({unique: true, nullable: true})
    phone_number: string;

    @Column({nullable: true})
    ramal: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @ManyToOne(() => UnitEntity)
    @JoinColumn({name: 'unit_id'})
    unit: UnitEntity;

    @ManyToOne(() => DepartmentEntity)
    @JoinColumn({name: 'department_id'})
    department: DepartmentEntity;
}