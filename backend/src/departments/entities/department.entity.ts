import { UnitEntity } from "../../units/entities/unit.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('departments')
export class DepartmentEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({unique: true, nullable: false})
    name: string;

    @ManyToOne(() => UnitEntity, unit => unit.departments)
    @JoinColumn({ name: 'unit_id'})
    unit: UnitEntity;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;
}