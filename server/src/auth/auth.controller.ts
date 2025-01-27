import {
  RequestUser,
  RequestUserType,
  Role,
  UseCredentialsAuth,
  UseJwtAuth,
  UserService,
} from "@hilma/auth-nest";
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RegisterDTO } from "src/dto/register.dto";
import { ROLES, CREATOR } from "src/roles";
import { Repository } from "typeorm";
import { Request, Response } from "express";
import { ACCESS_TOKEN_COOKIE_NAME } from "src/constants/access-token-cookie.const";
import { ChangePasswordDTO } from "src/dto/change-password.dto";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly userService: UserService,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  @Get("token")
  getToken(@Req() req: Request) {
    const token = req.cookies[ACCESS_TOKEN_COOKIE_NAME];
    if (!token) return null;
    return { token };
  }

  @Post("register")
  async postRegister(@Body() credentials: RegisterDTO, @Res() res: Response) {
    const newUser = await this.userService.createUser({
      ...credentials,
      roles: [CREATOR],
    });

    const requestUser: RequestUserType = {
      ...newUser,
      type: "User",
      roles: newUser.roles.map((role) => role.name),
      roleKeys: newUser.roles.map((role) => role.roleKey),
    };

    const body = this.userService.login(requestUser, res, undefined, {
      httpOnly: true,

      secure: process.env.NODE_ENV !== "development",
      sameSite: "lax",
    });

    res.send(body);
  }

  @Get("authenticate")
  @UseJwtAuth()
  getAuthenticate(@RequestUser() user: RequestUserType) {
    return user;
  }

  @Post("change-password")
  @UseJwtAuth({ roles: ["CREATOR"] })
  async postChangePassword(
    @Body() changePasswordsData: ChangePasswordDTO,
    @RequestUser() requestUser: RequestUserType,
  ) {
    if (changePasswordsData.newPassword === changePasswordsData.oldPassword)
      throw new BadRequestException(
        "old password and new password must be different",
      );
    await this.userService.changePassword(
      requestUser.id,
      changePasswordsData.oldPassword,
      changePasswordsData.newPassword,
    );
    return "password changed successfully";
  }
  async onModuleInit() {
    if (process.env.NODE_ENV !== "development") return;

    const exists = await this.roleRepository.exists();
    if (!exists) await this.roleRepository.save(ROLES);
  }

  @Post("login")
  @UseCredentialsAuth({ roles: ["CREATOR"] })
  postLogin(@RequestUser() requestUser: RequestUserType, @Res() res: Response) {
    const body = this.userService.login(requestUser, res, undefined, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "lax",
    });
    res.send(body);
  }

  @Post("logout")
  postLogout(@Res() res: Response): void {
    res.clearCookie(ACCESS_TOKEN_COOKIE_NAME);

    res.status(204).send();
  }
}
