import { IsNotEmpty, IsString, Matches } from "class-validator";
import { passwordRegex } from "src/constants/password.regex";
import { usernameRegex } from "src/constants/username.regex";

export class RegisterDTO {
  @IsString()
  @IsNotEmpty()
  @Matches(usernameRegex, {
    message: "username must be at least 6 characters",
  })
  username!: string;

  @IsString()
  @IsNotEmpty()
  @Matches(passwordRegex, {
    message:
      "password must contain at least one uppercase letter, one lowercase letter, one number and be 8 or more characters long",
  })
  password!: string;
}
