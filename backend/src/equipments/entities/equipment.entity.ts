import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UnitEntity } from '../../units/entities/unit.entity';
import { DepartmentEntity } from '../../departments/entities/department.entity';
import { UserEntity } from '../../users/entities/user.entity';
import { TicketEntity } from '../../tickets/entities/ticket.entity';



@Entity('equipments')
export class EquipmentEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'name', nullable: false})
    name: string;

    @Column({name: 'description', nullable: false})
    description: string;

    @Column({name: 'serial_number', nullable: false})
    serial_number: number;

    @ManyToOne(() => UnitEntity)
    @JoinColumn({name: 'unit_id'})
    unit: UnitEntity;

    @ManyToOne(() => DepartmentEntity)
    @JoinColumn({name: 'departament_id'})
    departament: DepartmentEntity;

    @ManyToOne(() => UserEntity)
    @JoinColumn({name: 'user_name'})
    user: UserEntity;

    @ManyToOne(() => TicketEntity)
    @JoinColumn({name: 'ticket_id'})
    ticket: TicketEntity;

    @Column({name: 'is_shared', nullable: false})
    is_shared: boolean; 

    @CreateDateColumn({name: 'created_at', nullable: false})
    created_at: Date;

    @UpdateDateColumn({name: 'updated_at', nullable: false})
    updated_at: Date;

}