import { IsNotEmpty, IsString, Matches } from "class-validator";
import { invalidPasswordMessage } from "src/constants/invalid-password-error";
import { passwordRegex } from "src/constants/password.regex";

export class ChangePasswordDTO {
  @IsString()
  @IsNotEmpty()
  @Matches(passwordRegex, {
    message: `oldPassword ${invalidPasswordMessage}`,
  })
  oldPassword!: string;

  @IsString()
  @IsNotEmpty()
  @Matches(passwordRegex, {
    message: `newPassword ${invalidPasswordMessage}`,
  })
  newPassword!: string;
}
