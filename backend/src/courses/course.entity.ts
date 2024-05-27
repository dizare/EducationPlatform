import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Chapter } from '../chapters/chapter.entity';

@Entity()
export class Course {
  constructor(
    name: string,
    theme: string,
    totalTasks: number,
    author: string,
  ) {
    this.name = name;
    this.theme = theme;
    this.totalTasks = totalTasks;
    this.author = author;  
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  theme: string;

  @Column({ default: 0 })
  totalTasks: number;

  @Column()  // Добавляем колонку для автора
  author: string;

  @ManyToMany(() => Chapter)
  @JoinTable()
  chapters: Chapter[];
}
