import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Score } from "./score.entity";
import { Question } from "./question.entity";
import { Creator } from "./creator.entity";

@Entity()
export class Quiz {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Creator, (creator) => creator.quizzes)
  @JoinColumn({ name: "creator_id" })
  creator!: Creator;

  @Column({ name: "creator_id" })
  creatorId!: Creator["id"];

  @Column({ length: 50 })
  title!: string;

  @Column("text")
  description!: string;

  @Column({ length: 50, nullable: true, name: "image_path" })
  imagePath?: string;

  @Column({ name: "is_public", default: true })
  isPublic!: boolean;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @OneToMany(() => Score, (score) => score.quiz, { onDelete: "CASCADE" })
  scores!: Score[];

  @OneToMany(() => Question, (question) => question.quiz, {
    onDelete: "CASCADE",
  })
  questions!: Question[];
}
