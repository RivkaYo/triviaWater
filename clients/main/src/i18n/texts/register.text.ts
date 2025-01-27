import { createI18nText } from "../i18n-init";

export const registerText = createI18nText({
  he: {
    verifyPassword: "אימות סיסמה",
    register: "הרשמה",
    passwordValidationError:
      "הסיסמה חייבת להיות באורך של לפחות 8 תווים ולכלול אות גדולה, אות קטנה, ומספר.",
    verifyPasswordMatchError: "אימות הסיסמה חייב להיות זהה לסיסמה שהוזנה.",
    usernameLengthError: "שם משתמש חייב לכלול לפחות 6 תווים",
    nameIsAlreadyExist: "שם משתמש תפוס",
    somethingWentWrong: "משהו השתבש, אנא נסה שנית",
  },
  en: {
    verifyPassword: "verifyPassword:",
    register: "register",
    passwordValidationError: "",
    verifyPasswordMatchError: "",
    usernameLengthError: "",
    nameIsAlreadyExist: "",
    somethingWentWrong: "",
  },
});
