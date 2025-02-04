import { join } from "path";

import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FilesHandlerModule } from "@hilma/fileshandler-server";

import config from "./config";
import { QuestionModule } from "./question/question.module";
import { QuizModule } from "./quiz/quiz.module";
import { AnswerModule } from "./answer/answer.module";
import { ScoreModule } from "./score/score.module";
import { AuthModule } from "./auth/auth.module";
import { FOLDER_PATH } from "./constants/files-handler-folder-path.const";
import { HealthModule } from "./health/health/health.module";

@Module({
  imports: [
    QuizModule,
    AnswerModule,
    QuestionModule,
    ScoreModule,
    HealthModule,
    ConfigModule.forRoot({
      envFilePath: [".env.development"],
      load: [config],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || "3306"),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [
        "dist/**/*.entity.{ts, js}",
        "node_modules/@hilma/auth-nest/dist/**/*.entity.{js,ts}",
      ],
      synchronize: process.env.DB_SYNCHRONIZE === "true",
      logging: process.env.DB_LOGGING === "true",
      autoLoadEntities: process.env.DB_AUTO_LOAD_ENTITIES === "true",
    }),
    AuthModule,
    FilesHandlerModule.register({
      folder: join(__dirname, FOLDER_PATH),
      pathPrefix: "/api",
      autoAllow: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
