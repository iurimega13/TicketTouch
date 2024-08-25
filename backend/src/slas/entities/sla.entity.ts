import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('slas')
export class SlaEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({name: 'name', nullable: false})
    name: string;

    @Column({name: 'description', nullable: false})
    description: string;

    @Column({name: 'time', nullable: false})
    time: string;

    @Column({name: 'response_time', nullable: false})
    response_time: number;

    @Column({name: 'resolution_time', nullable: false})
    resolution_time: number;
}