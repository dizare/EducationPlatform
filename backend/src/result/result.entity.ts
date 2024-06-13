import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Result {
  constructor(code: string, isSuccess: boolean, cpuTimeSpent: string, memorySpent: string) {
    this.code = code;
    this.isSuccess = isSuccess;
    this.cpuTimeSpent = cpuTimeSpent;
    this.memorySpent = memorySpent;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  isSuccess: boolean;

  @Column()
  cpuTimeSpent: string;

  @Column()
  memorySpent: string;
  
}
