import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, OneToOne, JoinColumn } from 'typeorm';
import { User } from 'src/users/user.entity';
import { Task } from 'src/tasks/task.entity';
import { Result } from 'src/result/result.entity';

@Entity()
export class UserResult {
  @PrimaryGeneratedColumn()
  userResultId: number;

  @ManyToOne(() => User, user => user.id)
  user: User;

  @OneToOne(() => Task, task => task.id)
  @JoinColumn()
  task: Task;

  @OneToOne(() => Result, result => result.id)
  @JoinColumn()
  result: Result;
}
