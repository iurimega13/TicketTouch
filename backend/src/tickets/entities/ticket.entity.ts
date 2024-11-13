import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { DepartmentEntity } from "src/departments/entities/department.entity";
import { SlaEntity } from "../../slas/entities/sla.entity";
import { UnitEntity } from "../../units/entities/unit.entity";
import { UserEntity } from "../../users/entities/user.entity";

@Entity({name: 'tickets'}) 
export class TicketEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string; 

    @Column({name: 'title', nullable: false})
    title: string; 

    @Column({name: 'description', nullable: false})
    description: string; 
    
    @Column({name: 'priority', nullable: false})
    priority: string; 

    @Column({name: 'status', nullable: false})
    status: string; 

    @Column({name: 'category_name', nullable: true})
    category_name: string; 
    
    @ManyToOne(() => UserEntity)
    @JoinColumn({name: 'user_id'})
    user: UserEntity;
    
    @ManyToOne(() => UserEntity, { nullable: true })
    @JoinColumn({name: 'technician_id'})
    technician: UserEntity;
    
    @ManyToOne(() => UnitEntity)
    @JoinColumn({name: 'unit_id'})
    unit: UnitEntity;

    @ManyToOne(() => DepartmentEntity)
    @JoinColumn({name: 'department_id'})
    department: DepartmentEntity;
    
    @OneToOne(() => SlaEntity)
    @JoinColumn({name: 'sla_id'})
    sla: SlaEntity;

    @CreateDateColumn({name: 'created_at', nullable: false})
    created_at: Date; 

    @Column({name: 'closed_at', nullable: true})
    closed_at: Date;  
}