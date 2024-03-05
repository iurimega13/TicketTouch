import { SlaEntity } from "../../slas/entities/sla.entity";
import { TicketCategoryEntity } from "../../ticket-categories/entities/ticketCategory.entity";
import { UnitEntity } from "../../units/entities/unit.entity";
import { UserEntity } from "../../users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity({name: 'tickets'}) // Define o nome da tabela no banco de dados
export class TicketEntity {
    @PrimaryGeneratedColumn() // Define a coluna como chave primária e auto incrementável
    id: number; // Define o tipo da coluna como número

    @Column({name: 'title', nullable: false})
    title: string; // Define o tipo da coluna como string

    @Column({name: 'description', nullable: false})
    description: string; // Define o tipo da coluna como string
    
    @Column({name: 'priority', nullable: false})
    priority: string; // Define o tipo da coluna como string

    @Column({name: 'status', nullable: false})
    status: string; // Define o tipo da coluna como string

    @ManyToOne(() => TicketCategoryEntity)
    @JoinColumn({name: 'category_id'})
    category: TicketCategoryEntity;
    
    @ManyToOne(() => UserEntity)
    @JoinColumn({name: 'user_id'})
    user: UserEntity;
    
    @ManyToOne(() => UserEntity)
    @JoinColumn({name: 'technician_id'})
    technician: UserEntity;
    
    @ManyToOne(() => UnitEntity)
    @JoinColumn({name: 'unit_id'})
    unit: UnitEntity;
    
    @ManyToOne(() => SlaEntity)
    @JoinColumn({name: 'sla_id'})
    sla: SlaEntity;

    @Column({name: 'due_date', nullable: false})
    due_date: Date; // Define o tipo da coluna como data

    @CreateDateColumn({name: 'created_at', nullable: false})
    created_at: Date; // Define o tipo da coluna como data

    @UpdateDateColumn({name: 'updated_at', nullable: false})
    updated_at: Date; // Define o tipo da coluna como data
}