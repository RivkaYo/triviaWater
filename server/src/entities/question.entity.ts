import { Answer } from "src/entities/answer.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Quiz } from "./quiz.entity";

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Quiz, (quiz) => quiz.questions, { onDelete: "CASCADE" })
  @JoinColumn({ name: "quiz_id" })
  quiz!: Quiz;

  @Column({ name: "quiz_id" })
  quizId!: Quiz["id"];

  @OneToMany(() => Answer, (answer) => answer.question, { onDelete: "CASCADE" })
  answers!: Answer[];

  @Column()
  title!: string;

  @Column({ nullable: true, name: "image_path" })
  imagePath?: string;

  @Column({ name: "question_index" })
  index!: number;
}
