import { Question } from "src/entities/question.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";

@Entity()
export class Answer {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: "answer_index" })
  index!: number;

  @Column({ name: "answer_text" })
  answerText!: string;

  @Column({ name: "is_correct" })
  isCorrect!: boolean;

  @Column({ nullable: true, name: "image_path" })
  imagePath?: string;

  @ManyToOne(() => Question, (question) => question.answers, {
    nullable: false,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "question_id" })
  question!: Question;

  @Column({ name: "question_id" })
  questionId!: Question["id"];
}
