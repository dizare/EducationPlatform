import { Column, Entity, PrimaryGeneratedColumn, OneToMany, JoinTable } from 'typeorm';
import { Chapter } from '../chapters/chapter.entity';

@Entity()
export class Course {
  constructor(
    name: string,
    theme: string,
    description: string,
    totalTasks: number,
    author: string,
  ) {
    this.name = name;
    this.theme = theme;
    this.description = description
    this.totalTasks = totalTasks;
    this.author = author;  
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  theme: string;

  @Column()
  description: string;

  @Column({ default: 0 })
  totalTasks: number;

  @Column()  // Добавляем колонку для автора
  author: string;

  @OneToMany(() => Chapter, chapter => chapter.course)
  chapters: Chapter[];
}
