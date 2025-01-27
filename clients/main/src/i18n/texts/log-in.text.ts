import { createI18nText } from "../i18n-init";

export const logInText = createI18nText({
  he: {
    password: "סיסמה",
    username: "שם משתמש",
    entry: "כניסה",
    questionToRegister: "עוד לא משתמש רשום?",
    registerHere: "הירשם כאן",
    loginSuccessful: "ההתחברות הסתיימה בהצלחה!",
    loginFailed: "ההתחברות נכשלה. שם משתמש או סיסמה שגויים.",
    serverError: "אירעה שגיאה במהלך ההתחברות, אנא נסה שוב. ",
    badPassword:
      "סיסמה חייבת לכלול 8 תווים לפחות, אות אחת גדולה , אות אחת קטנה ומספר.",
  },
  en: {
    password: "password",
    username: "username",
    entry: "entry",
    questionToRegister: "questionToRegister",
    registerHere: "registerHere",
    loginSuccessful: "Login successful!",
    loginFailed: "Login failed, username or password are incorrect",
    serverError: "An error occurred while logging in. Please try again.",
    badPassword:
      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number.",
  },
});
