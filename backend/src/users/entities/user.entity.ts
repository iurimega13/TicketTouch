import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UnitEntity } from '../../units/entities/unit.entity';
import { DepartmentEntity } from '../../departments/entities/department.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  role: string;

  @Column({ nullable: true })
  phone_number: string;

  @Column({ nullable: true })
  ramal: string;

  @ManyToOne(() => UnitEntity, unit => unit.users)
  unit: UnitEntity;

  @ManyToOne(() => DepartmentEntity, department => department.users)
  department: DepartmentEntity;

  @Column()
  created_at: Date;
}