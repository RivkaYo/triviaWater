import { createTextFunctions } from "@hilma/i18n";

export enum Language {
  He = "he",
  En = "en",
}

export const { createI18n, createI18nText } = createTextFunctions(Language);
