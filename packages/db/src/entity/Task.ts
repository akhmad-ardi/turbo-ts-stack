import { Entity, PrimaryColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Task {
  @PrimaryColumn({
    type: "char",
    length: 8,
    generated: "uuid",
    nullable: false,
  })
  id: string;

  @Column()
  task: string;

  @Column({ default: false })
  finished: boolean;

  @ManyToOne(() => User, (user) => user.tasks)
  userId: User;
}
