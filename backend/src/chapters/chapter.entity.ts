import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Task } from '../tasks/task.entity';

@Entity()
export class Chapter {
    constructor(name: string, description: string) {
        this.name = name;
        this.description = description;
    }
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => Task, task => task.chapter)
  tasks: Task[];
}
