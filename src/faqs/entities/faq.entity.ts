import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: 'faqs' })
export class FaqEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  question: string;

  @Column()
  answer: string;
}