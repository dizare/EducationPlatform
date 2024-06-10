import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Chapter } from '../chapters/chapter.entity';

@Entity()
export class Task {
  constructor(name: string, description: string, input?: string, output?: string) {
    this.name = name;
    this.description = description;
    this.input = input;
    this.output = output;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  input?: string;

  @Column({ nullable: true })
  output?: string;

  @ManyToOne(() => Chapter, chapter => chapter.tasks)
  chapter: Chapter;
}
