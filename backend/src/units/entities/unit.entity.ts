import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { DepartmentEntity } from "../../departments/entities/department.entity";

@Entity({name: 'units'})
export class UnitEntity {
 
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({name: 'name', nullable: false})
    name: string;

    @Column({name: 'address', nullable: false})
    address: string;

    @CreateDateColumn({name: 'created_at', nullable: false})
    created_at: Date;

    @UpdateDateColumn({name: 'updated_at', nullable: false})
    updated_at: Date;

    @OneToMany(() => DepartmentEntity, department => department.unit)
    departments: DepartmentEntity[];
}