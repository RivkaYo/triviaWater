import { createI18nText } from "../i18n-init";

export const changePassword = createI18nText({
  he: {
    oldPassword: "סיסמה ישנה",
    newPassword: "סיסמה חדשה",
    verifyNewPassword: "אימות סיסמה חדשה",
    changePassword: "שנה סיסמה",
    conflictError: "סיסמה ישנה שגויה",
    serverError: "משהו השתבש, אנא נסה שוב",
    successMessage: "סיסמה שונתה בהצלחה",
    unmatchingPasswordsError: "אימות הסיסמה חייב להיות זהה לסיסמה החדשה",
    passwordValidationError:
      "הסיסמה חייבת להיות באורך של לפחות 8 תווים ולכלול אות גדולה, אות קטנה, ומספר.",
  },
  en: {
    oldPassword: "old password",
    newPassword: "new password",
    verifyNewPassword: "verify new password",
    changePassword: "change password",
    conflictError: "old password incorrect",
    serverError: "something went wrong, please try again",
    successMessage: "password changed successfully",
    unmatchingPasswordsError: "verify password must match the new password",
    passwordValidationError:
      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number.",
  },
});
