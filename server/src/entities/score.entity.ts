import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import { Quiz } from "./quiz.entity";

@Entity()
export class Score {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  score!: number;

  @Column({ name: "player_name" })
  playerName!: string;

  @CreateDateColumn({ name: "played_at" })
  playedAt!: Date;

  @Column({ name: "quiz_id" })
  quizId!: Quiz["id"];

  @ManyToOne(() => Quiz, (quiz) => quiz.scores, {
    nullable: false,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "quiz_id" })
  quiz!: Quiz;
}
