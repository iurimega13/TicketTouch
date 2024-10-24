import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { DepartmentEntity } from "../../departments/entities/department.entity";
import { UserEntity } from "src/users/entities/user.entity";

@Entity({name: 'units'})
export class UnitEntity {
 
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({name: 'name', nullable: false, unique: true})
    name: string;

    @Column({name: 'description', nullable: false})
    description: string;

    @CreateDateColumn({name: 'created_at', nullable: false})
    created_at: Date;

    @UpdateDateColumn({name: 'updated_at', nullable: false})
    updated_at: Date;

    @OneToMany(() => DepartmentEntity, department => department.unit)
    departments: DepartmentEntity[];

    @OneToMany(() => UserEntity, user => user.unit)
    users: UserEntity[];
}