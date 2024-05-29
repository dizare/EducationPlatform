import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Task } from '../tasks/task.entity';
import { Course } from 'src/courses/course.entity';

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

  @ManyToOne(() => Course, course => course.chapters)
  course: Course;
}
