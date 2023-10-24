import { Entity, PrimaryColumn, Column, OneToMany } from "typeorm";
import { Task } from "./Task";

@Entity()
export class User {
  @PrimaryColumn({
    type: "char",
    length: 8,
    generated: "uuid",
    nullable: false,
  })
  id: string;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Task, (task) => task.userId)
  tasks: Task[];
}

