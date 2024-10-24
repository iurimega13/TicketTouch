import { UserEntity } from "src/users/entities/user.entity";
import { UnitEntity } from "../../units/entities/unit.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity('departments')
export class DepartmentEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false})
    name: string;

    @ManyToOne(() => UnitEntity, unit => unit.departments, { nullable: false })
    @JoinColumn({ name: 'unit_id'})
    unit: UnitEntity;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;

    @OneToMany(() => UserEntity, user => user.department)
    users: UserEntity[];
}