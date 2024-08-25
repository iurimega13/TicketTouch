import { UnitEntity } from "../../units/entities/unit.entity";
import { PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, Entity } from "typeorm";

@Entity({name: 'departments'})
export class DepartmentEntity{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({name: 'name', nullable: false})
    name: string;

    @ManyToOne(() => UnitEntity)
    @JoinColumn({name: 'unit_name'})
    unit: UnitEntity;

    @CreateDateColumn({name: 'created_at', nullable: false})
    created_at: Date;

    @UpdateDateColumn({name: 'updated_at', nullable: false})
    updated_at: Date;
} 