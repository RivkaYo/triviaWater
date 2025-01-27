import { Module } from "@nestjs/common";
import { Role, RoleModule, UserModule } from "@hilma/auth-nest";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AuthController } from "./auth.controller";

@Module({
  controllers: [AuthController],
  imports: [UserModule, RoleModule, TypeOrmModule.forFeature([Role])],
})
export class AuthModule {}
