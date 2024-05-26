import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Course {
    constructor(name: string, theme: string, num_of_task: number, author: string){
        this.name = name;
        this.theme = theme;
        this.num_of_task = num_of_task;
        this.author = author;
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    theme: string;

    @Column()
    num_of_task: number;

    @Column()
    author: string;
}
