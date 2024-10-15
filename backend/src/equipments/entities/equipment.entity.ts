import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UnitEntity } from '../../units/entities/unit.entity';
import { DepartmentEntity } from '../../departments/entities/department.entity';
import { UserEntity } from '../../users/entities/user.entity';

@Entity('equipments')
export class EquipmentEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'name', nullable: false, unique: true })
    name: string;

    @Column({ name: 'description', nullable: false })
    description: string;

    @Column({ name: 'serial_number', nullable: false, unique: true })
    serial_number: string;

    @ManyToOne(() => UnitEntity)
    @JoinColumn({ name: 'unit_id' })
    unit: UnitEntity;

    @ManyToOne(() => DepartmentEntity)
    @JoinColumn({ name: 'department_id' })
    department: DepartmentEntity;

    @ManyToOne(() => UserEntity, { nullable: true })
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;

    @Column({ name: 'is_shared', nullable: false })
    is_shared: boolean;

    @CreateDateColumn({ name: 'created_at', nullable: false })
    created_at: Date;

    @UpdateDateColumn({ name: 'updated_at', nullable: false })
    updated_at: Date;
}