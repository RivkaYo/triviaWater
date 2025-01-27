import { User } from "@hilma/auth-nest";
import { ChildEntity, OneToMany } from "typeorm";

import { Quiz } from "./quiz.entity";

@ChildEntity()
export class Creator extends User {
  @OneToMany(() => Quiz, (quiz) => quiz.creator, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  quizzes!: Quiz[];
}
